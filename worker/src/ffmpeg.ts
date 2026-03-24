import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { config } from './config';

function run(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit' });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} failed with exit code ${code}`));
    });
  });
}

export async function transcodeToHls(inputPath: string, outputMasterPath: string, with720: boolean) {
  await mkdir(dirname(outputMasterPath), { recursive: true });

  const baseArgs = [
    '-i',
    inputPath,
    '-map',
    '0:v:0',
    '-map',
    '0:a:0?',
    '-c:v',
    'libx264',
    '-preset',
    'veryfast',
    '-g',
    '48',
    '-keyint_min',
    '48',
    '-sc_threshold',
    '0',
    '-c:a',
    'aac',
    '-b:a',
    '64k',
    '-ac',
    '2',
    '-movflags',
    '+faststart',
    '-f',
    'hls',
    '-hls_time',
    '4',
    '-hls_playlist_type',
    'vod',
    '-hls_flags',
    'independent_segments',
  ];

  const ladderArgs = with720
    ? [
        '-filter_complex',
        '[0:v]split=3[v240][v480][v720];[v240]scale=426:240[v240o];[v480]scale=854:480[v480o];[v720]scale=1280:720[v720o]',
        '-map',
        '[v240o]',
        '-b:v:0',
        config.output240Bitrate,
        '-maxrate:v:0',
        '400k',
        '-bufsize:v:0',
        '700k',
        '-crf:v:0',
        '28',
        '-map',
        '[v480o]',
        '-b:v:1',
        config.output480Bitrate,
        '-maxrate:v:1',
        '800k',
        '-bufsize:v:1',
        '1400k',
        '-crf:v:1',
        '27',
        '-map',
        '[v720o]',
        '-b:v:2',
        config.output720Bitrate,
        '-maxrate:v:2',
        '1200k',
        '-bufsize:v:2',
        '2200k',
        '-crf:v:2',
        '26',
        '-var_stream_map',
        'v:0,a:0 v:1,a:0 v:2,a:0',
      ]
    : [
        '-filter_complex',
        '[0:v]split=2[v240][v480];[v240]scale=426:240[v240o];[v480]scale=854:480[v480o]',
        '-map',
        '[v240o]',
        '-b:v:0',
        config.output240Bitrate,
        '-maxrate:v:0',
        '400k',
        '-bufsize:v:0',
        '700k',
        '-crf:v:0',
        '28',
        '-map',
        '[v480o]',
        '-b:v:1',
        config.output480Bitrate,
        '-maxrate:v:1',
        '800k',
        '-bufsize:v:1',
        '1400k',
        '-crf:v:1',
        '27',
        '-var_stream_map',
        'v:0,a:0 v:1,a:0',
      ];

  const finalArgs = [
    ...baseArgs,
    ...ladderArgs,
    '-master_pl_name',
    'master.m3u8',
    '-hls_segment_filename',
    `${dirname(outputMasterPath)}/v%v/segment_%03d.ts`,
    `${dirname(outputMasterPath)}/v%v/index.m3u8`,
  ];

  await run(config.ffmpegPath, finalArgs);
}

export async function generateThumbnail(inputPath: string, outputJpgPath: string) {
  await mkdir(dirname(outputJpgPath), { recursive: true });
  await run(config.ffmpegPath, ['-i', inputPath, '-ss', '00:00:01', '-vframes', '1', outputJpgPath]);
}

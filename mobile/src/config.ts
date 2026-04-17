import { Platform } from 'react-native';

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

const fallbackApiBaseUrl =
  Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api';

export const appConfig = {
  apiBaseUrl: env.EXPO_PUBLIC_API_BASE_URL ?? fallbackApiBaseUrl,
  appUserId: env.APP_USER_ID ?? '507f1f77bcf86cd799439011',
};

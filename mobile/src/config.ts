const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

export const appConfig = {
  apiBaseUrl: env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api',
  appUserId: env.APP_USER_ID ?? '507f1f77bcf86cd799439011',
};

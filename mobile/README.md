# Mobile App (React Native)

## UX Highlights
- Dark, premium card-based UI.
- Horizontal content rails.
- Skeleton loading placeholders.
- Bottom tabs: Home, Search, Profile.
- Fullscreen HLS playback via `react-native-video`.
- Skip Intro + Auto-next episode behavior.

## Environment
- `EXPO_PUBLIC_API_BASE_URL` (optional override)
  - default on Android emulator: `http://10.0.2.2:3000/api`
  - default on iOS simulator: `http://localhost:3000/api`
- `APP_USER_ID` (default demo ObjectId)

## Performance Notes
- Lazy-loaded lists and sections.
- No autoplay previews.
- HLS adaptive delivery via CDN only.

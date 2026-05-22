# feelness - Mood Wellness Platform

**Dress the mood. Move the feeling.**

A React Native mobile application for mood-based wellness, featuring curated wellness videos and gymwear inspiration.

## Features

- 🎯 **Mood Selection**: Choose from Calm, Energized, Focused, or Grounded moods
- 🎥 **Mood Videos**: Free and premium wellness video content
- 👕 **Gymwear Shops**: Curated activewear recommendations
- 👤 **Three User Tiers**:
  - Free: Limited video access
  - Pro: Unlock all premium content
  - Admin: Manage videos and shops

## Tech Stack

- React Native
- Expo
- TypeScript

## Prerequisites

Before deploying to Google Play Store:

1. **Node.js** (v16+)
2. **Expo CLI**:
   ```bash
   npm install -g eas-cli
   ```
3. **Google Play Developer Account** ($25 one-time fee)
4. **Google Play Service Account Key**

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/yassinova267-hub/feelness.git
cd feelness
npm install
```

### 2. Link to Expo

```bash
eas build --platform android --profile production
```

### 3. Google Play Setup

#### Create Service Account Key:

1. Go to [Google Play Console](https://play.google.com/console)
2. Create a new app (feelness)
3. Navigate to **Settings > API access**
4. Create a new Service Account in Google Cloud Console
5. Download the JSON key file
6. Save as `google-play-key.json` in project root

#### App Store Listing:

1. Fill app details (title, description, screenshots)
2. Add privacy policy (required)
3. Set content rating
4. Configure pricing (set as free)

### 4. Build for Android

```bash
npm run build:android
```

This generates an Android App Bundle (.aab) file optimized for Play Store.

### 5. Submit to Play Store

```bash
npm run submit:android
```

Or manually:
- Go to [Play Console](https://play.google.com/console)
- Select **feelness** app
- Go to **Release > Production**
- Upload the .aab file
- Fill app store listing details
- Submit for review

## Development

### Local Testing

```bash
# Start Expo development server
npm start

# Build for Android (local device)
npm run android
```

### Environment Variables

Create `.env` file (not committed):

```
EXPO_PUBLIC_API_URL=your_api_endpoint
EXPO_PUBLIC_ADMIN_SECRET=your_secret
```

## Deployment Status

| Platform | Status | Notes |
|----------|--------|-------|
| Google Play | 🟡 Ready | Awaiting review (~1-3 hours) |
| iOS App Store | ⏳ Pending | Requires macOS + Apple developer account |

## Play Store Review Guidelines

✅ **Compliant**:
- Free app with optional in-app content
- Clear privacy policy
- Proper content rating

⚠️ **To Address**:
- Remove hardcoded passwords from client code (move to backend)
- Implement secure authentication backend
- Add GDPR compliance for EU users

## Security Notes

🔒 **Current Issues** (must fix before production):

1. **Hardcoded credentials** in code - Move to backend API
2. **No encryption** for stored user data - Implement secure storage
3. **Client-side authentication** - Implement JWT/OAuth

See SECURITY.md for remediation steps.

## Commands Reference

```bash
# Development
npm start                 # Start Expo dev server
npm run android          # Run on Android device/emulator

# Production Build
npm run build:android    # Create AAB for Play Store
npm run submit:android   # Submit to Play Store

# Build Configuration
npm run build            # Interactive build menu
```

## File Structure

```
feeelness/
├── App.tsx              # Main app component
├── index.js             # Expo entry point
├── app.json             # App configuration
├── eas.json             # EAS build configuration
├── package.json         # Dependencies
├── assets/              # Icons and splash screens
└── README.md            # This file
```

## Support

For issues or questions:
- Create an issue on GitHub
- Check Expo documentation: https://docs.expo.dev

## License

Proprietary - feelness © 2026

---

**Next Steps**:
1. ✅ Set up Google Play Developer Account
2. ✅ Generate and secure API credentials
3. ✅ Configure app store listing
4. ⏳ Submit for review
5. ⏳ Monitor review status

# Security Recommendations

## Critical Issues - Must Fix Before Production

### 1. Remove Hardcoded Credentials

**Current State:**
```javascript
const ADMIN_SECRET = 'feelness123';  // ❌ Exposed in client code
```

**Solution - Implement Backend API:**
```javascript
// Call secure backend endpoint instead
const loginAdmin = async (password: string) => {
  const response = await fetch('https://api.feelness.com/auth/admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });
  
  if (response.ok) {
    const { token } = await response.json();
    // Store securely
    await SecureStore.setItemAsync('admin_token', token);
    setAdminLoggedIn(true);
  }
};
```

### 2. Implement Secure Storage

**Install:**
```bash
npm install expo-secure-store
```

**Usage:**
```javascript
import * as SecureStore from 'expo-secure-store';

// Store sensitive data
await SecureStore.setItemAsync('user_password', password);

// Retrieve
const password = await SecureStore.getItemAsync('user_password');

// Clear on logout
await SecureStore.deleteItemAsync('user_password');
```

### 3. Add Encryption for Data at Rest

**Install:**
```bash
npm install crypto-js expo-crypto
```

**Usage:**
```javascript
import CryptoJS from 'crypto-js';

const encryptData = (data: string, secret: string) => {
  return CryptoJS.AES.encrypt(data, secret).toString();
};

const decryptData = (encrypted: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};
```

### 4. Implement JWT Authentication

**Backend Example (Node.js/Express):**
```javascript
const jwt = require('jsonwebtoken');

app.post('/auth/login', (req, res) => {
  // Validate credentials against database
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  res.json({ token });
});
```

**Client Usage:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginPro = async (email: string, password: string) => {
  const response = await fetch('https://api.feelness.com/auth/pro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const { token } = await response.json();
  await AsyncStorage.setItem('auth_token', token);
  setProLoggedIn(true);
};
```

### 5. Add Privacy Policy

**Required for Play Store:**

Create `PRIVACY_POLICY.md`:
```markdown
# Privacy Policy for feelness

## Data Collection

We collect:
- User account information (email, username)
- Mood preferences
- Video viewing history (optional)

## Data Storage
- Data stored securely on encrypted servers
- Never sold to third parties
- Users can request deletion

## Contact
privacy@feelness.com
```

### 6. Environment Variables

**Create `.env` (DO NOT COMMIT):**
```
EXPO_PUBLIC_API_URL=https://api.feelness.com
EXPO_PUBLIC_JWT_SECRET=your_jwt_secret_key
```

**Access in Code:**
```javascript
const API_URL = process.env.EXPO_PUBLIC_API_URL;
```

### 7. HTTPS Only

**Ensure all API calls use HTTPS:**
```javascript
// ✅ Good
const API_URL = 'https://api.feelness.com';

// ❌ Bad
const API_URL = 'http://api.feelness.com';
```

### 8. Rate Limiting

**Implement on backend:**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 login attempts per window
});

app.post('/auth/login', limiter, (req, res) => {
  // Handle login
});
```

## Implementation Timeline

| Priority | Task | Effort | Status |
|----------|------|--------|--------|
| 🔴 High | Remove hardcoded secrets | 2 days | ❌ Not started |
| 🔴 High | Implement JWT auth | 3 days | ❌ Not started |
| 🔴 High | Add secure storage | 1 day | ❌ Not started |
| 🟡 Medium | Backend API setup | 5 days | ❌ Not started |
| 🟡 Medium | Add privacy policy | 1 day | ❌ Not started |
| 🟢 Low | Encryption at rest | 2 days | ❌ Not started |

## Recommended Backend Stack

### Option 1: Firebase (Easiest)
- Authentication via Firebase Auth
- Firestore for database
- Cloud Functions for logic
- Cost: Free tier available

### Option 2: Node.js + PostgreSQL
- Express for API
- JWT for auth
- PostgreSQL for database
- Cost: $5-15/month

### Option 3: AWS Lambda + DynamoDB
- Serverless functions
- Scales automatically
- Cost: Pay per use

## Testing Security

```bash
# OWASP Mobile Security Testing Guide
# Check for hardcoded secrets
npm install snyk -g
snyk test

# Dependency vulnerabilities
npm audit
npm audit fix

# Code scanning
npm install eslint-plugin-security --save-dev
```

## Compliance Checklist

- [ ] Remove all hardcoded passwords
- [ ] Implement backend authentication
- [ ] Add privacy policy
- [ ] Enable HTTPS only
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Enable app signing
- [ ] Setup error logging (Sentry)
- [ ] Add user data deletion endpoint
- [ ] Document data retention policy

---

**Status**: ❌ Not security-ready for production
**Target Date**: [Set completion date]
**Owner**: [Your name]

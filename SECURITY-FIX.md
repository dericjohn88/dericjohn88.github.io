# Security Fix: Credential Management

## What Changed

### 1. Firebase API Key Protection
- **Before**: Hardcoded in `site-config.js` (public)
- **After**: Loaded from `.env.local` (not committed to git)

### 2. Email Address Protection  
- **Before**: Hardcoded email list in `site-config.js` (public)
- **After**: Loaded from `.env.local` (not committed to git)

## Setup Instructions

### Local Development (GitHub Desktop / Command Line)

1. **Copy the example template**:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` with your actual credentials**:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_ALLOWED_OWNER_EMAILS=your@email.com,other@email.com
   ```

3. **Verify `.env.local` is in `.gitignore`** ✅ Already configured

### Production (GitHub Pages)

Since GitHub Pages serves static files without build steps, **environment variables won't work in production**. Here are your options:

#### Option A: Rotate Key + Use Firebase Security Rules (Recommended)
1. **Rotate the Firebase API key** in Firebase Console
   - Old key (now public): Delete or disable
   - New key: Use only locally in `.env.local`

2. **Use Firebase Security Rules** to restrict access:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth.uid != null 
           && request.auth.email in ['deric.john88@gmail.com', 'sljohn902@gmail.com'];
       }
     }
   }
   ```

3. **Use Firebase Authentication** on the frontend:
   - Check `firebase.auth().currentUser.email` 
   - Only show private content if email is in allowed list

#### Option B: Backend Verification
- Build a small backend service (Node.js, Python, etc.)
- Handle email/role validation server-side
- Frontend calls backend to check access

#### Option C: GitHub Secrets + Build Deploy
- Use GitHub Actions to inject secrets during deploy
- Build and deploy static files with environment variables baked in
- Requires build step (can use Vite, Webpack, etc.)

## Immediate Actions Required

1. ✅ **Files updated** (site-config.js, .gitignore, .env.example created)
2. ⏳ **Rotate Firebase API Key** (in Firebase Console)
3. ⏳ **Create `.env.local`** with your actual credentials
4. ⏳ **Update Firebase Security Rules** to validate authorized users
5. ⏳ **Test locally** before committing

## Security Best Practices Going Forward

- Never commit `.env.local` or any environment file to git
- Use `.env.example` as a template for other developers
- Rotate credentials periodically
- Monitor Firebase logs for unauthorized access
- Use Firebase App Check to restrict API access to known apps

# Deployment Checklist & Setup Guide

## Issues Found & Fixed

### 🔴 Critical Issues (Fixed)

1. **Missing `NEXT_PUBLIC_CONVEX_URL` environment variable**
   - **Issue**: Convex client initialization will fail without this URL
   - **Fix**: Added placeholder to `.env` and documented in `.env.example`
   - **Action needed**: Replace with your actual Convex deployment URL

2. **Missing Convex Authentication Configuration**
   - **Issue**: No `convex/auth.config.ts` file for Clerk integration
   - **Fix**: Created placeholder config files (`auth.config.ts` and `http.ts`)
   - **Action needed**: Install `@convex-dev/auth` and configure properly

3. **Tailwind CSS Arbitrary Value Warnings**
   - **Issue**: Multiple hardcoded pixel values and custom CSS variables causing build warnings
   - **Fixed**: Replaced with standard Tailwind classes
   - Examples: `h-[400px]` → `h-96`, `text-[9px]` → `text-xs`, `gap-[1px]` → `gap-px`

### 🟡 Environment Variables Required for Deployment

```bash
# Clerk Authentication (from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
CLERK_JWT_ISSUER_DOMAIN=https://your-clerk-domain

# Convex Backend (from https://dashboard.convex.dev)
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-url.convex.cloud
```

## Deployment Steps

### 1. Install Dependencies
```bash
npm install
```
This will install `@convex-dev/auth` which is needed for Clerk-Convex integration.

### 2. Configure Environment Variables
```bash
# Copy template
cp .env.example .env.local

# Fill in your actual values:
# - Get Clerk keys from https://dashboard.clerk.com/api-keys
# - Get Convex URL from https://dashboard.convex.dev/deployments
```

### 3. After Installing Dependencies, Update Convex Auth
Once `npm install` completes:
1. Update `convex/auth.config.ts` with the @convex-dev/auth imports
2. Update `convex/http.ts` with proper auth handling
3. Run `npx convex dev` to push the configuration

### 4. Deploy to Vercel (or your platform)
```bash
# Build
npm run build

# Verify build succeeds
# Deploy with your platform's CLI or UI
```

## Security Checklist

- [ ] All `.env*` files are in `.gitignore` (verified)
- [ ] Never commit `CLERK_SECRET_KEY` to git
- [ ] Use environment variables for all sensitive config
- [ ] Verify CORS settings in Convex deployment for allowed origins
- [ ] Set appropriate Clerk redirect URIs for production domain

## Common Issues & Solutions

### Error: "Cannot find module '@convex-dev/auth/server'"
**Solution**: Run `npm install` first to install the package

### Error: "NEXT_PUBLIC_CONVEX_URL is required"
**Solution**: Ensure `.env.local` has `NEXT_PUBLIC_CONVEX_URL` set to your Convex deployment URL

### Error: "Clerk authentication failed"
**Solution**: 
- Verify `CLERK_JWT_ISSUER_DOMAIN` is set correctly
- Check Clerk app is configured in dashboard
- Ensure Convex is properly linked to Clerk

### Build fails with Tailwind warnings
**Solution**: All major Tailwind warnings have been fixed. If new ones appear, replace arbitrary values with Tailwind classes.

## Testing Before Deployment

1. **Local Development**
   ```bash
   npm run dev
   # Test auth flow (sign up, sign in, sign out)
   # Test product queries work
   # Test cart functionality
   ```

2. **Build Test**
   ```bash
   npm run build
   # Should complete without errors
   npm run start
   # Test production build locally
   ```

3. **Convex Backend**
   - Run `npx convex dev` 
   - Verify schema is deployed
   - Test queries/mutations from console

## Post-Deployment Verification

1. Verify environment variables are set in deployment platform
2. Test authentication flow on production URL
3. Check Convex queries work with production deployment
4. Monitor application logs for any runtime errors
5. Test admin features (if applicable)

## Additional Resources

- [Convex Documentation](https://docs.convex.dev)
- [Clerk Documentation](https://clerk.com/docs)
- [Convex + Clerk Integration](https://docs.convex.dev/auth/clerk)
- [@convex-dev/auth Package](https://www.convex.dev/components/auth)

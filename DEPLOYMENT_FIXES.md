# Deployment Fixes - Localhost vs Production Differences

## Issues Fixed

### 1. ✅ Domain Mismatch
**Problem:** `api/submit.js` was using `crmgo.webscale.com` instead of `crmgo.webscale.dz`

**Fixed:** Updated to use the correct domain `crmgo.webscale.dz` consistently across all files.

### 2. ✅ Environment Variables
**Problem:** Some components used `import.meta.env.VITE_SCRIPT_URL` which could be undefined in production.

**Fixed:** Added fallback URLs in:
- `src/components/RegisterForm.jsx`
- `src/components/RegistrationModal.jsx`

Now these components will work even if environment variables aren't set.

### 3. ⚠️ Vite Proxy (Development Only)
**Note:** The proxy configuration in `vite.config.js` only works during `npm run dev`. In production:
- Vite builds static files
- The dev server proxy is not available
- All API calls must use full URLs (which they already do)

**Status:** ✅ No action needed - all components use full URLs directly.

## Deployment Checklist

### Environment Variables (Optional)
If you want to use different API endpoints per environment, set these in your deployment platform:

```bash
VITE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_REGISTRATION_SCRIPT_URL=https://script.google.com/macros/s/YOUR_OTHER_SCRIPT_ID/exec
```

**Note:** The code now has fallbacks, so these are optional.

### Vercel Configuration
Your `vercel.json` is correctly configured for SPA routing:
- All routes redirect to `/` for client-side routing
- This is correct for React Router

### API Endpoints
All components use full URLs:
- ✅ `https://crmgo.webscale.dz/api/v1/public/forms/...`
- ✅ These work in both development and production

## Common Issues & Solutions

### Issue: Forms not submitting in production
**Solution:** 
1. Check browser console for CORS errors
2. Verify API endpoint URLs are correct
3. Check that environment variables are set (if using them)

### Issue: 404 errors on page refresh
**Solution:** 
- Your `vercel.json` already handles this with the rewrite rule
- This should work correctly

### Issue: API calls failing
**Solution:**
1. Verify the API domain is correct (`crmgo.webscale.dz`)
2. Check CORS settings on the API server
3. Ensure the API endpoints are publicly accessible

## Testing

### Local Testing
```bash
npm run dev
# Test at http://localhost:5174
```

### Production Testing
1. Deploy to Vercel
2. Test all forms:
   - Registration form
   - Sponsorship form
   - Formation form
   - Workshop form
3. Check browser console for errors
4. Verify form submissions are received

## Files Modified

1. `api/submit.js` - Fixed domain typo
2. `src/components/RegisterForm.jsx` - Added fallback URL
3. `src/components/RegistrationModal.jsx` - Added fallback URL

## Next Steps

1. ✅ Deploy to production
2. ✅ Test all forms
3. ✅ Monitor for any CORS or API errors
4. ✅ Set environment variables in deployment platform if needed


# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub repository with your E-Commerce project
- Vercel account (free tier available)
- Node.js 18+ locally for testing

## 🔧 Deployment Steps

### 1. **Prepare Your Repository**
Ensure all the following files are committed to your repository:
- `vercel.json` - Vercel configuration
- `api/` directory with serverless functions
- Updated `package.json` with `vercel-build` script
- Updated `vite.config.js` with production settings

### 2. **Deploy to Vercel**

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: e-commerce-platform
# - Directory: ./
# - Override settings? N
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### 3. **Environment Variables**
In Vercel Dashboard → Project → Settings → Environment Variables, add:

```
NODE_ENV=production
VITE_API_URL=https://your-domain.vercel.app/api
```

### 4. **Update CORS Origins**
After deployment, update the CORS configuration in `api/index.js`:
```javascript
const corsOptions = {
  origin: [
    'https://your-actual-domain.vercel.app',
    'https://e-commerence.vercel.app'
  ],
  credentials: true
};
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in `package.json`
   - Check build logs in Vercel dashboard

2. **API Not Working**
   - Ensure API files are in `/api` directory
   - Check function logs in Vercel dashboard
   - Verify CORS configuration

3. **Static Files Not Loading**
   - Check `public/` directory structure
   - Verify image paths in code
   - Ensure `dist/` is properly generated

### Debug Commands:
```bash
# Test build locally
npm run build
npm run preview

# Check API endpoints locally
npm run dev
```

## 📱 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] Images and static assets load
- [ ] Navigation works properly
- [ ] Mobile responsiveness
- [ ] CORS configured for production domain

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to your main branch. To trigger manual deployment:

```bash
vercel --prod
```

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Review build logs
3. Test API endpoints individually
4. Verify environment variables

Your E-Commerce platform should now be live at: `https://your-project.vercel.app`

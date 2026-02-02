# Montserrat-Arabic Font Setup

This project has been configured to use **Montserrat-Arabic Regular** font.

## Font Files Required

To complete the font setup, you need to download the Montserrat-Arabic Regular font files and place them in the `/public/fonts/` directory.

### Download the Font

You can download the Montserrat-Arabic font from:
- **GitHub Repository**: https://github.com/typeagm/Montserrat-Arabic
- **Direct Download**: The font files are available in the `/fonts/WEB/` directory of the repository

### Required Font Files

Place the following font files in `/public/fonts/`:
- `Montserrat-Arabic-Regular.woff2` (preferred format)
- `Montserrat-Arabic-Regular.woff` (fallback)
- `Montserrat-Arabic-Regular.ttf` (fallback)

### Directory Structure

```
public/
  fonts/
    Montserrat-Arabic-Regular.woff2
    Montserrat-Arabic-Regular.woff
    Montserrat-Arabic-Regular.ttf
```

### Quick Setup Steps

1. Create the fonts directory:
   ```bash
   mkdir -p public/fonts
   ```

2. Download the font files from the GitHub repository and place them in `public/fonts/`

3. The font will automatically be loaded when you run the project

## Font License

Montserrat-Arabic is licensed under the **OFL-1.1** (Open Font License), which allows free use in both personal and commercial projects.

## Files Updated

The following files have been updated to use Montserrat-Arabic:
- `src/index.css` - Main CSS file with @font-face declaration
- `tailwind.config.js` - Tailwind configuration
- `template.html` - Email template
- `formation/styles.css` - Formation page styles
- `public/badge-cta-campaign.html` - Badge campaign page
- `badge-cta-campaign.html` - Badge campaign page (root)

All font-family references have been changed from Poppins/Cairo/Tajawal to Montserrat-Arabic.


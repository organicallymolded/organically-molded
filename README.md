# Organically Molded

Minimalist portfolio site for organicallymolded.co.

## Files

- `index.html` — website structure/content
- `style.css` — layout, typography, responsive design
- `script.js` — small interactions
- `assets/` — put your photographs/videos here

## Add your own photographs

The current image areas are intentionally placeholders.

The easiest replacement is:

1. Put your photos in `assets/`.
2. In `style.css`, replace a placeholder such as `.image-01` with:

```css
.image-01 {
  background-image: url("assets/your-photo.jpg");
  background-size: cover;
  background-position: center;
}
```

You can also change the text in `index.html` to your real project names, dates, location, bio, and email.

## Instagram

Replace the `https://instagram.com/` link in `index.html` with your actual Instagram profile URL.

## GitHub Pages

Upload these files to your GitHub repository with `index.html` at the repository root.

Then enable GitHub Pages from:

Repository → Settings → Pages

Choose the branch containing these files as the publishing source.

For `organicallymolded.co`, add the custom domain in GitHub Pages first, then configure your GoDaddy DNS records. GitHub's official documentation explains the current A/AAAA/CNAME records and notes that DNS changes can take up to 24 hours.

Official documentation:
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

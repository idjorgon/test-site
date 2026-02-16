# Test Site

A secure, responsive static test website template for showcasing products and services.

## Features

- ✅ **Security-First Design**
  - Strict Content Security Policy (CSP)
  - Security headers (X-Frame-Options, HSTS, etc.)
  - Input validation and sanitization
  - Anti-bot protection (honeypot field)
  - Contact info obfuscation (Base64 encoding)

- 🎨 **Modern UI/UX**
  - Responsive design (mobile-friendly)
  - Smooth scrolling navigation
  - Clean, professional styling
  - Form validation with real-time feedback

- 📦 **Sections**
  - Hero section with CTA
  - About section
  - Products/services showcase
  - Image gallery
  - Contact form with validation
  - Sticky navigation

## File Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # External stylesheet
├── script.js       # JavaScript with form validation
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### Deployment

This is a static site and can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

**Important:** For full security features to work:
- Deploy over HTTPS
- Ensure security headers are supported by your hosting

## Customization

### Update Content

1. **Site Name:** Replace "Test Site" in `index.html`
2. **Products:** Edit the product items in the `#products` section
3. **Contact Info:** Update address, phone, email in the `#contact` section
4. **About Text:** Modify the content in the `#about` section
5. **Styling:** Adjust CSS variables in `styles.css` (colors, fonts, etc.)

### Form Integration

The contact form currently shows a success message on submit. To connect it to a backend:

1. Edit the `validateForm()` function in `script.js`
2. Add server-side endpoint
3. Implement CSRF token protection
4. Add server-side validation

## Security Notes

- All inline scripts/styles are externalized for strict CSP compliance
- Contact information is Base64-encoded to prevent bot scraping
- Form includes honeypot field for bot detection
- Input validation checks for XSS patterns
- HTTPS enforcement via `upgrade-insecure-requests`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Free to use for personal projects.

## Credits

Built with security and performance in mind.

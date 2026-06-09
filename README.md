# WebForge 🛠️

A high-performance, AI-powered static site generator that transforms Markdown content into beautiful, production-ready websites with cutting-edge features and seamless developer experience.

## Features

### Core Platform
- **Static Site Generation** - Blazing-fast generation of static HTML sites from Markdown content
- **Markdown Support** - Full Markdown syntax support with GitHub Flavored Markdown (GFM)
- **Customizable Themes** - Built-in theme engine with support for multiple themes
- **Extensible Architecture** - Plugin system for adding custom functionality
- **File-Based Routing** - Automatic routing based on file structure

### AI Features
- **AI Content Generation** - Generate new pages, sections, and content using AI
- **AI Optimization** - Optimize existing content for SEO, readability, and engagement
- **AI Image Generation** - Automatically create relevant images for your pages
- **AI Table of Contents** - Generate TOC automatically for long pages
- **AI Navigation** - Intelligent menu and sidebar generation

### Developer Experience
- **Hot Module Replacement** - Real-time preview of changes without page reload
- **Live Reload** - Automatic browser refresh on file changes
- **Developer Tools** - Built-in debugging and performance analysis
- **Code Formatting** - Automatic code formatting with Prettier integration
- **Linting** - Code quality checks with ESLint integration

### Performance & SEO
- **Automatic Code Splitting** - Lazy load components for faster initial load
- **Image Optimization** - Automatic image compression and optimization
- **SEO Metadata** - Automatic generation of meta tags and SEO attributes
- **Sitemap Generation** - Automatic sitemap.xml creation
- **Robots.txt** - Smart robots.txt generation
- **Performance Metrics** - Real-time performance monitoring

### Security
- **Content Security Policy (CSP)** - Built-in CSP implementation
- **XSS Protection** - Automatic cross-site scripting protection
- **Dependency Scanning** - Security vulnerability detection
- **Secure Defaults** - Secure configuration out of the box

### Deployment
- **Netlify Ready** - One-click deployment to Netlify
- **Vercel Ready** - Seamless integration with Vercel
- **GitHub Pages** - Built-in support for GitHub Pages
- **Cloudflare Pages** - Optimized for Cloudflare deployment
- **Docker Support** - Dockerfile and deployment configurations
- **CI/CD Integration** - GitHub Actions and GitLab CI configurations

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/webforge.git
   cd webforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

### Usage

#### Development
Start the development server with live reload:
```bash
npm run dev
# or
yarn dev
```

#### Production
Build the site for production:
```bash
npm run build
# or
yarn build
```

#### Preview
Generate and preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

#### AI Features
Use AI to generate or optimize content:
```bash
# Generate a new page
npm run ai:generate -- --title "New Page" --content "Page content here"

# Optimize an existing page
npm run ai:optimize -- --path "pages/about.md"
```

## Project Structure

```
webforge/
├── docs/                    # Documentation
├── pages/                   # Content pages (Markdown)
├── themes/                  # Theme templates
├── plugins/                 # Plugin directory
├── public/                  # Static assets
├── src/
│   ├── core/                # Core engine
│   ├── plugins/             # Plugin system
│   ├── components/          # Reusable UI components
│   └── utils/               # Utility functions
├── .webforge/               # Configuration
├── gatsby-config.js        # Gatsby configuration
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## Configuration

Create a `.webforge/` directory with configuration files:

```json
// .webforge/config.json
{
  "siteTitle": "My Website",
  "theme": "default",
  "navigation": {
    "header": [
      {
        "label": "Home",
        "url": "/"
      },
      {
        "label": "About",
        "url": "/about/"
      }
    ]
  }
}
```

## AI Configuration

Set up AI features by creating `.webforge/ai.config.json`:

```json
// .webforge/ai.config.json
{
  "enabled": true,
  "providers": {
    "openai": {
      "apiKey": "your-openai-key",
      "model": "gpt-4o"
    }
  }
}
```

## Themes

WebForge comes with several built-in themes:

- **Default** - Clean and modern default theme
- **Material** - Google's Material Design principles
- **Minimal** - Ultra-minimalist design
- **Dark** - Professional dark mode theme
- **Business** - Corporate and professional look

To create a custom theme, create a new directory in `themes/`:

```
themes/
├── custom-theme/
│   ├── layout.jsx
│   ├── components/
│   └── assets/
```

## Plugins

Extend functionality with plugins in the `plugins/` directory:

```javascript
// plugins/custom-plugin.js
module.exports = {
  name: 'custom-plugin',
  
  // Called during build process
  build(context) {
    console.log('Building with custom plugin');
    
    // Add custom functionality
    context.pages.push({
      path: '/custom/',
      content: '# Custom Page',
      title: 'Custom Page'
    });
  },
  
  // Called for each page
  transform(page) {
    page.content = '<!-- Plugin Added -->\n' + page.content;
    return page;
  }
};
```

## Deployment

### Netlify

1. Push your code to GitHub
2. Go to Netlify → "New site from Git"
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `public`
5. Click "Deploy site"

### Vercel

```bash
vercel --prod
```

### GitHub Pages

```bash
npm run deploy:github
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For issues, feature requests, or questions:
- Check the [Documentation](docs/)
- Browse [Issues](https://github.com/yourusername/webforge/issues)
- Create a new [Issue](https://github.com/yourusername/webforge/issues/new)

## Acknowledgments

- Built with **React** and **Gatsby.js**
- AI features powered by **OpenAI**
- Styling with **Tailwind CSS** and **Styled Components**
- Testing with **Jest** and **React Testing Library**
- Deployment integrations with **Netlify**, **Vercel**, and **Cloudflare**

## Contact

For questions or collaboration opportunities:
- Email: [EMAIL_ADDRESS]
- GitHub: [https://github.com/yourusername](https://github.com/yourusername)

---
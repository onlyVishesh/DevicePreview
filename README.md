<div align="center">

<img src="./public/logo.png" alt="DevicePreview - Multi-Device Responsive Design Testing Tool" width="200" height="200">

# DevicePreview

**The Ultimate Responsive Design Testing Tool for Modern Web Development**

[![Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-blue.svg?style=for-the-badge)](https://devicepreview.dev)
[![GitHub](https://img.shields.io/badge/⭐-Star%20on%20GitHub-yellow.svg?style=for-the-badge)](https://github.com/onlyVishesh/DevicePreview)

</div>

## 🎯 What is DevicePreview?

DevicePreview is a comprehensive web application designed to revolutionize how developers and designers test responsive websites. Instead of manually resizing browser windows or switching between multiple devices, DevicePreview enables you to preview your website across dozens of device screens simultaneously in real-time.

**Perfect for:**

- 🎨 **Web Designers** testing responsive layouts
- 💻 **Frontend Developers** debugging mobile-first designs
- 🏢 **Agencies** presenting client work across devices
- 📱 **Mobile App Developers** testing web views
- 🎓 **Students** learning responsive web design
- 🔍 **QA Engineers** performing cross-device testing

Built with modern web technologies including React 18, Redux Toolkit, and Vite, DevicePreview delivers lightning-fast performance while maintaining an intuitive, professional interface.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

## 📊 Key Benefits & Use Cases

### 🚀 **Accelerate Development Workflow**

- **Time Savings**: Test multiple screen sizes simultaneously instead of manually resizing browsers
- **Instant Feedback**: See responsive breakpoints and layout changes in real-time
- **Comprehensive Coverage**: Preview on 50+ popular device configurations
- **Custom Testing**: Add specific client device requirements with custom screen dimensions

### 🎯 **Professional Presentation**

- **Client Demos**: Showcase responsive designs across all target devices during presentations
- **Quality Assurance**: Catch responsive design issues before deployment
- **Cross-Device Consistency**: Ensure uniform user experience across device types
- **Modern Workflow**: Streamline responsive design testing with contemporary tools

### 🔧 **Developer Experience**

- **Zero Configuration**: Start testing immediately without complex setup
- **Local Storage**: Automatically save custom screen configurations
- **Performance Optimized**: Smooth rendering even with multiple simultaneous previews
- **Open Source**: Contribute features and improvements to the community

## 🌟 Feature Overview

### ✅ **Available Now**

- 📱 **Multi-Device Preview** - Test on 50+ predefined device sizes including iPhone, Android, iPad, and desktop
- ➕ **Custom Screen Sizes** - Add your own device dimensions for specific testing requirements
- ⚡ **Lightning Fast** - Optimized rendering with smooth performance across multiple viewports
- 🔄 **Real-Time Updates** - Watch your responsive designs update instantly as you make changes
- ✅ **No Sign-Up Required** - Start testing immediately without creating accounts
- 💾 **Local Storage** - Your custom screens and preferences are saved locally
- 🎨 **Modern UI** - Beautiful, responsive interface built with Ant Design and Tailwind CSS
- 🌈 **Smooth Animations** - Enhanced UX with GSAP animations and transitions

### 🚧 **Coming Soon**

- 🔄 **Scroll Synchronization** - Synchronized scrolling across all device previews
- 🖱️ **Click Synchronization** - Synchronized interactions across all viewports
- 🧩 **Browser Extension** - One-click testing from any webpage

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   https://github.com/onlyVishesh/DevicePreview
   cd device-preview
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:8081
   ```

### Production Build

```bash
npm run build
npm run preview
```

## 💻 Usage

### Web Application

1. Open the application in your browser
2. Enter your website URL in the input field
3. Select device presets from the sidebar or add custom dimensions
4. Watch your website render across multiple devices simultaneously

### Browser Extension (Coming Soon)

1. Install the extension from the Chrome Web Store
2. Navigate to any webpage
3. Click the extension icon to instantly preview the current page

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header/         # Navigation header
│   ├── Screens/        # Device preview screens
│   ├── Sidebar/        # Device selection sidebar
│   └── svg/           # SVG icon components
├── pages/             # Route-based page components
│   ├── Home/          # Main preview application
│   ├── Landing/       # Landing page
│   └── NotFound/      # 404 error page
├── store/             # Redux store configuration
│   ├── actions/       # Redux actions
│   ├── reducers/      # Redux reducers
│   └── selectors/     # Memoized selectors
├── data/              # Static data and configurations
├── utils/             # Utility functions
├── App.jsx            # Root application component
├── index.jsx          # Application entry point
└── index.css          # Global styles
```

## 🛠️ Technical Architecture & Built With

### Core Technologies & Rationale

**Frontend Framework**

- **[React 18](https://reactjs.org/)** - Modern UI library with concurrent features and improved performance
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - Efficient state management with minimal boilerplate
- **[React Router v6](https://reactrouter.com/)** - Declarative client-side routing with data loading

**Build Tools & Performance**

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool with native ESM support
- **[ESLint](https://eslint.org/)** - Code quality and consistency enforcement
- **[PostCSS](https://postcss.org/)** - CSS processing with autoprefixing

**UI Framework & Styling**

- **[Ant Design](https://ant.design/)** - Professional React component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[GSAP](https://greensock.com/gsap/)** - High-performance animation library

### Architecture Patterns

**Component Design**

- Functional components with React Hooks
- Prop validation with PropTypes
- Separation of concerns (presentation vs. container components)
- Reusable component library structure

**State Management**

- Redux Toolkit for global state
- Local state for component-specific data
- Selector patterns for derived state
- Normalized state structure for scalability

**Performance Optimizations**

- Code splitting with React.lazy
- Memoization with useMemo and useCallback
- Virtual scrolling for large device lists
- Optimized re-rendering with React.memo

## 🤝 Contributing

We love contributions! Here's how you can help make DevicePreview better:

### 🐛 Bug Reports

Found a bug? Please create an issue with:

- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

### 💡 Feature Requests

Have an idea? Create an issue with:

- Clear description of the feature
- Use case and benefits
- Possible implementation approach (optional)

### 🔧 Code Contributions

#### Getting Started

1. **Fork the repository**

   ```bash
   https://github.com/onlyVishesh/DevicePreview
   cd device-preview
   ```

2. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-new-feature
   # or
   git checkout -b bugfix/fix-specific-issue
   ```

3. **Set up development environment**
   ```bash
   npm install
   npm run dev
   ```

#### Development Guidelines

**Code Style**

- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

**Component Structure**

```jsx
// components/MyComponent/MyComponent.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const MyComponent = ({ prop1, prop2 }) => {
  // Component logic here

  return <div className="my-component">{/* Component JSX */}</div>;
};

MyComponent.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number,
};

export default MyComponent;
```

**State Management**

- Use Redux for global state
- Use local state for component-specific data
- Follow Redux Toolkit patterns
- Write clear action names and reducers

**Styling Guidelines**

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use Ant Design components when possible

#### Testing Your Changes

```bash
# Run linting
npm run lint

# Build for production
npm run build

# Test the production build
npm run preview
```

#### Submitting Pull Requests

1. **Ensure your code follows the guidelines above**
2. **Write clear commit messages**

   ```bash
   git commit -m "feat: add custom screen size validation"
   git commit -m "fix: resolve scroll sync issue on mobile devices"
   git commit -m "docs: update contributing guidelines"
   ```

3. **Push to your fork**

   ```bash
   git push origin feature/amazing-new-feature
   ```

4. **Create a Pull Request**
   - Use a clear, descriptive title
   - Explain what changes you made and why
   - Reference any related issues
   - Include screenshots for UI changes

#### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### 📋 Good First Issues

New to the project? Look for issues labeled:

- `good-first-issue` - Perfect for newcomers
- `help-wanted` - Need community help
- `documentation` - Improve docs and guides

## 🔧 Troubleshooting & FAQ

### Common Issues

**Q: The application won't start / shows dependency errors**

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Q: Website preview shows security/CORS errors**

- Some websites block iframe embedding for security reasons
- Try with `http://` instead of `https://` for local development sites
- Use developer tools to check for specific error messages

**Q: Custom screen sizes aren't saving**

- Ensure your browser allows localStorage
- Check browser's private/incognito mode settings
- Clear browser data and try again

**Q: Performance issues with multiple device previews**

- Reduce number of active device previews
- Close unnecessary browser tabs
- Ensure adequate system memory (4GB+ recommended)

### Browser Compatibility

| Browser | Minimum Version | Recommended |
| ------- | --------------- | ----------- |
| Chrome  | 90+             | Latest      |
| Firefox | 88+             | Latest      |
| Safari  | 14+             | Latest      |
| Edge    | 90+             | Latest      |

### System Performance Tips

- **RAM**: 4GB+ recommended for smooth multi-device previews
- **CPU**: Modern multi-core processor for optimal performance
- **Display**: 1920x1080+ resolution for best layout visibility
- **Network**: Stable internet connection for external website testing

## 🤝 Community & Support

### Getting Help

- 📖 **Documentation**: Check this README for comprehensive guides
- 🐛 **Bug Reports**: [Create an issue](https://github.com/onlyVishesh/DevicePreview/issues) with detailed information
- 💡 **Feature Requests**: [Submit suggestions](https://github.com/onlyVishesh/DevicePreview/issues) for new functionality
- 💬 **Discussions**: Join community discussions in GitHub Discussions

### Stay Updated

- ⭐ **Star the Repository** to get notified of major updates
- 👀 **Watch Releases** for new version notifications
- 🐦 **Follow [@onlyVishesh](https://github.com/onlyVishesh)** for development updates

## 🗺️ Roadmap

### Version 2.0 Planned Features

- 🔄 **Scroll & Click Synchronization** - Unified interaction across all previews
- 🧩 **Browser Extension** - One-click testing from any webpage
- 📊 **Performance Metrics** - Lighthouse scores for each device
- 🎨 **Screenshot Tools** - Capture all device previews simultaneously
- 🌐 **Multi-URL Testing** - Compare designs across different pages
- 📱 **Device Rotation** - Portrait/landscape orientation switching
- 🔌 **Plugin System** - Extensible architecture for custom tools

### Long-term Vision

- 🧪 **A/B Testing Integration** - Compare design variants across devices
- 🔍 **Accessibility Testing** - WCAG compliance checking per device
- 📈 **Usage Analytics** - Optional anonymous usage statistics
- 🤝 **Team Collaboration** - Shared screen configurations and comments

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by [onlyVishesh](https://github.com/onlyVishesh)
- Inspired by the need for better responsive design testing tools
- Thanks to all contributors who help make this project better
- Special thanks to the open-source community

## ⭐ Show Your Support

If DevicePreview helps you in your development workflow, please consider:

- Giving the project a ⭐ on GitHub
- Sharing it with your developer friends
- Contributing to make it even better
- Following [@onlyVishesh](https://github.com/onlyVishesh) for updates

---

## Contributing

Feel free to submit issues and feature requests!

<div align="center">

**Made with ❤️ by developers, for developers**

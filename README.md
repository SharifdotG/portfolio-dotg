# portfolio-dotg (≧∇≦)ﾉ

> A modern, Catppuccin Mocha themed portfolio website built with Next.js 16, featuring real-time Codeforces and LeetCode stats, and an AI-powered chatbot assistant.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

## Features

- **Modern Design**: Tailwind CSS v4 with Catppuccin color scheme (Dark/Light themes)
- **High Performance**: Next.js 16 App Router with Turbopack
- **Smooth Animations**: Framer Motion for delightful interactions
- **Live Stats**: Real-time Codeforces and LeetCode competitive programming statistics
- **AI Chatbot**: Vercel AI SDK powered chatbot with OpenRouter (DeepSeek Chat)
- **Theme Switcher**: Seamless dark/light mode with localStorage persistence
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Accessible**: WCAG 2.1 compliant with semantic HTML and ARIA labels

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router, React Server Components) |
| **Frontend** | React 19, TypeScript 5.7+ |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **Animations** | Framer Motion, GSAP |
| **Charts** | Chart.js 4.4.x, react-chartjs-2 |
| **AI** | Vercel AI SDK, OpenRouter API |
| **Icons** | Lucide React |
| **Fonts** | Google Fonts (Bricolage Grotesque, DM Sans, Cascadia Code) |

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- OpenRouter API key ([Get one free](https://openrouter.ai/keys))

### Installation

```bash
# Clone the repository
git clone https://github.com/SharifdotG/portfolio-dotg.git
cd portfolio-dotg

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local` and add your API keys:

```env
# Required - AI Chatbot
OPENROUTER_API_KEY=sk-or-v1-your_key_here

# Optional - Improves API rate limits (5000/hour vs 60/hour)
GITHUB_TOKEN=ghp_your_token_here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Animated terminal with typewriter effect |
| **About** | Personal story, education, and fun facts |
| **Experience** | Timeline of education and teaching roles |
| **Skills** | Interactive grid with proficiency levels |
| **Projects** | Filterable showcase with GitHub links |
| **Achievements** | ICPC, contests, scholarships, certifications |
| **Contact** | Social links and contact form |
| **CP Dashboard** | Live Codeforces & LeetCode stats |
| **Chatbot** | Floating AI assistant (Claude 3.5 Sonnet) |

## Customization

### Update Personal Information

Edit [`lib/constants.ts`](lib/constants.ts):

```typescript
export const PERSONAL_INFO = {
  name: "Your Name",
  username: "YourHandle",
  title: "Your Title",
  email: "your@email.com",
  // ... more fields
};

export const SKILLS = {
  languages: [/* ... */],
  frameworks: [/* ... */],
  // ...
};

export const PROJECTS = [/* ... */];
export const ACHIEVEMENTS = [/* ... */];
```

### Customize Theme Colors

Edit [`app/globals.css`](app/globals.css) to modify Catppuccin colors:

```css
@theme {
  --color-ctp-blue: #89b4fa;  /* Change to your brand color */
  --color-ctp-mauve: #cba6f7;
  /* ... more colors */
}
```

### Modify AI Chatbot Prompt

Edit [`app/api/chat/route.ts`](app/api/chat/route.ts):

```typescript
const systemPrompt = `You are an AI assistant representing...`;
```

## Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **GitHub**: [@SharifdotG](https://github.com/SharifdotG)
- **LinkedIn**: [@sharifdotg](https://linkedin.com/in/sharifdotg)
- **Email**: <sharifmdyousuf007@gmail.com>
- **Codeforces**: [@SharifdotG](https://codeforces.com/profile/SharifdotG)
- **LeetCode**: [@SharifdotG](https://leetcode.com/SharifdotG)

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Catppuccin](https://github.com/catppuccin/catppuccin) - Soothing pastel theme
- [OpenRouter](https://openrouter.ai/) - Unified LLM API

---

<div align="center">

**Built with 💝 by [Sharif Md. Yousuf](https://github.com/SharifdotG)**

Star this repo if you found it helpful!

</div>

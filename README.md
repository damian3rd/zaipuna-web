# Zaipuna Web - Professional Next.js Stack

A modern, production-ready web application built with Next.js 14, TypeScript, Tailwind CSS, and Shadcn/ui.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn/ui
- **Linting**: ESLint
- **Package Manager**: npm

## ✨ Features

- ⚡ **Next.js 14**: Latest features including App Router and Server Components
- 🔒 **TypeScript**: Full type safety and better developer experience
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- 🧩 **Shadcn/ui**: Beautiful, accessible components built with Radix UI
- 🌙 **Dark Mode**: Built-in dark mode support
- 📱 **Responsive**: Mobile-first responsive design
- ⚡ **Performance**: Optimized for speed and SEO
- 🔧 **Developer Experience**: Hot reload, ESLint, and TypeScript support

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd zaipuna-web
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
zaipuna-web/
├── app/                    # Next.js App Router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/             # React components
│   └── ui/                # Shadcn/ui components
├── lib/                   # Utility functions
├── public/                # Static assets
├── components.json        # Shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🧩 Available Components

The following Shadcn/ui components are pre-installed and ready to use:

- **Button**: Various button styles and variants
- **Card**: Container components with header, content, and footer
- **Input**: Form input fields with proper styling
- **Label**: Accessible form labels

### Adding More Components

To add additional Shadcn/ui components:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add dialog dropdown-menu select
```

## 🎨 Customization

### Colors and Theme

The project uses a neutral color scheme by default. You can customize colors in:

- `src/app/globals.css` - CSS variables for theming
- `tailwind.config.ts` - Tailwind configuration

### Adding Custom Components

Create new components in `components/`:

```typescript
// components/MyComponent.tsx
export function MyComponent() {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      My Custom Component
    </div>
  );
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation links above
2. Search existing issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Shadcn/ui

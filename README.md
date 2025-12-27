# DevSheet

**DevSheet** is a sleek, modern, and highly performant developer cheat‑sheet web application built with **Next.js 15**, **React**, and **Tailwind CSS**. It provides a curated collection of short, searchable cheat‑sheets for common development tasks, commands, and snippets—especially geared toward Bangla‑speaking developers.

---

## ✨ Features

- **Bangla‑first UI** – All headings and UI text are rendered in beautiful Bangla using the SolaimanLipi font.
- **Dynamic imports** – Heavy components like the cheatsheet grid are lazy‑loaded, dramatically reducing the first‑paint time.
- **Optimized font loading** – Fonts are preloaded with `rel="preload"` and served with `font-display: swap` to avoid layout shifts.
- **Package import optimisation** – `next.config.js` uses `experimental.optimizePackageImports` to strip unused code from the large `@heroui/*` UI library.
- **Static generation** – Pages are pre‑rendered at build time (`export const dynamic = "force-static"`) with a 1‑hour revalidation window.
- **SEO‑ready** – Rich meta tags, Open Graph, Twitter cards, and JSON‑LD schema are baked in.
- **Responsive design** – Works beautifully on mobile, tablet, and desktop with fluid layouts.
- **Accessibility** – Semantic HTML, proper ARIA attributes, and high‑contrast colour schemes.

---

## 📦 Tech Stack

| Layer | Technology |
|------|------------|
| **Framework** | Next.js 15 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + custom globals.css |
| **Icons** | `devicon`, `react-icons`, `lucide-react` |
| **Data** | MDX files in `/data` parsed with `gray‑matter` |
| **Deployment** | Vercel (or any Node.js host) |

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/sayeedjoy/DevSheet.git
cd DevSheet

# Install dependencies
npm i

# Run the development server
npm run dev
```

Open <http://localhost:3000> in your browser. The site should load instantly thanks to the optimisations we added.

---

## 🛠️ Building for Production

```bash
npm run build   # creates an optimized production build
npm start       # serves the built app
```

The build output shows a **first‑load JavaScript size of ~139 KB** (compressed) for the home page—well within modern performance budgets.

---

## 📂 Project Structure (high‑level)

```
DevSheet/
├─ app/                # Next.js app router pages
│   ├─ layout.tsx      # Global layout with font preloads
│   └─ page.tsx        # Home page (dynamic import of cheatsheet grid)
├─ components/         # Re‑usable UI components
│   ├─ cheatsheet/     # Card & grid components
│   └─ home/           # Hero section
├─ data/               # MDX cheat‑sheet files (title, description, icon)
├─ lib/                # Helper functions for loading cheatsheets
├─ styles/             # globals.css (font & utility styles)
├─ next.config.js      # Turbopack config with import optimisation
└─ README.md           # You are reading it now!
```

---

## 🎨 Design Philosophy

- **Premium look & feel** – Gradient accents, glass‑morphism cards, and subtle micro‑animations make the UI feel modern and polished.
- **Performance first** – Every external resource (fonts, icons, images) is either pre‑connected, pre‑fetched, or lazy‑loaded.
- **Internationalisation** – While the default language is Bangla, the codebase is fully ready for i18n extensions.

---

## 🙏 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/awesome‑thing`).
3. Make your changes, ensuring the linting (`npm run lint`) passes.
4. Open a Pull Request describing the improvement.

All contributions are welcome—especially new cheat‑sheets, UI tweaks, or performance enhancements.

---

## 📜 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

## 📞 Contact

- **Author**: Sayeed Joy
- **GitHub**: <https://github.com/sayeedjoy>
- **Twitter**: <https://twitter.com/sayeedjoy>

Feel free to open an issue for bugs or feature requests. Happy coding! 🎉

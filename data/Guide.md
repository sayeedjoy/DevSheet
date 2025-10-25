# Cheatsheets Guide

This folder contains all the cheatsheet MDX files. The system automatically reads all `.mdx` files from this folder and displays them on the homepage.

## 📝 How to Add a New Cheatsheet

1. **Create a new MDX file** in this folder with your desired slug name (e.g., `docker.mdx`, `npm.mdx`, `python.mdx`)

2. **Add frontmatter** at the top of the file with the following fields:

```mdx
---
title: Your Cheatsheet Title
description: A brief description of the cheatsheet
icon: iconname
category: category-name
---

# Your Content Here

Your markdown/MDX content...
```

### Frontmatter Fields:

- **title** (required): The title displayed on cards and cheatsheet pages
- **description** (required): A short description shown on the homepage card
- **icon** (required): Devicon icon name (without `devicon-` prefix and `-plain` suffix)
  - Available icons: https://devicon.dev/
  - Examples: `git`, `linux`, `docker`, `javascript`, `python`, `react`, `nodejs`, etc.
  - Just use the base name (e.g., `git` will render as `devicon-git-plain`)
- **category** (optional): Category for grouping (future feature)

## 🎨 MDX Features

MDX allows you to use React components directly in your markdown! You can:

### Use Custom Components

```mdx
---
title: Example
description: Using React components in MDX
icon: terminal
---

# My Cheatsheet

Regular markdown content...

## You can also use JSX!

<div className="p-4 bg-primary/10 rounded-lg">Custom styled content</div>
```

### Available Styled Components

All standard markdown elements are pre-styled:

- Headings (h1, h2, h3) - Bangla font support
- Paragraphs - Bangla font with proper line height
- Code blocks - Consolas font with syntax highlighting
- Lists (ul, ol, li) - Bangla font support
- Blockquotes - Styled with border
- Links - Primary color with hover effect
- Strong/Bold - Bangla font support

## 🎨 Using Devicon Icons

The project uses [Devicon](https://devicon.dev/) for all developer tool icons.

### Icon Selection:

1. Visit https://devicon.dev/
2. Find your desired icon (e.g., Docker, Python, React)
3. Copy the base name (the part between `devicon-` and `-plain`)
4. Use it in your MDX frontmatter

**Examples:**

| Tool       | Icon Value   | Renders As                 |
| ---------- | ------------ | -------------------------- |
| Git        | `git`        | `devicon-git-plain`        |
| Docker     | `docker`     | `devicon-docker-plain`     |
| Linux      | `linux`      | `devicon-linux-plain`      |
| JavaScript | `javascript` | `devicon-javascript-plain` |
| Python     | `python`     | `devicon-python-plain`     |
| React      | `react`      | `devicon-react-plain`      |
| Node.js    | `nodejs`     | `devicon-nodejs-plain`     |

### Full Icon List:

Visit https://devicon.dev/ to browse all available icons. Devicon includes icons for:

- Programming languages
- Frameworks & libraries
- Databases
- Tools & platforms
- Operating systems
- And more!

## 📋 Example Cheatsheet File

Here's a complete example (`docker.mdx`):

```mdx
---
title: Docker চিটশিট
description: ডকার কন্টেইনার ম্যানেজমেন্টের সম্পূর্ণ গাইড
icon: docker
category: containerization
---

# Docker চিটশিট

ডকার হল একটি কন্টেইনারাইজেশন প্ল্যাটফর্ম...

## মৌলিক কমান্ডসমূহ

### ইমেজ ম্যানেজমেন্ট

\`\`\`bash

# ইমেজ লিস্ট দেখুন

docker images

# ইমেজ পুল করুন

docker pull image-name
\`\`\`
```

## ✨ Automatic Features

✅ **Auto-discovery**: The homepage automatically finds and displays all MDX files  
✅ **Auto-routing**: Each cheatsheet is accessible at `domain.com/{filename}` (without `.mdx`)  
✅ **Auto-search**: Search functionality works across all MDX files automatically  
✅ **Auto-icons**: Devicon icons are automatically rendered from the icon field  
✅ **React Components**: Use JSX and React components in your content  
✅ **No configuration needed**: Just add a `.mdx` file and it works!

## 📏 File Naming Conventions

- Use lowercase letters
- Use hyphens for multi-word slugs (e.g., `github-actions.mdx`)
- Avoid special characters
- Keep names short and descriptive
- **Always use `.mdx` extension** (not `.md`)

## 📝 Content Guidelines

- Write in Bangla for consistency
- Use code blocks with proper language tags
- Include clear section headings
- Add practical examples
- Keep descriptions concise (2-3 lines max)
- Leverage MDX for interactive/custom styled sections

## 🧪 Testing Your Cheatsheet

After adding a new MDX file:

1. The homepage will automatically show a new card with the Devicon icon
2. Access it at `http://localhost:3000/{your-filename}`
3. Search for content to test the search functionality
4. No server restart needed in development mode!

## 🎯 Icon Best Practices

1. **Use specific icons**: Choose icons that best represent your cheatsheet topic
2. **Check icon availability**: Verify the icon exists on devicon.dev before using
3. **Fallback**: If icon doesn't exist, system will still work (may show broken icon)
4. **Consistency**: Use the plain variant for all icons (automatically applied)

## 📚 More Examples

### JavaScript Cheatsheet:

```mdx
---
title: JavaScript চিটশিট
description: জাভাস্ক্রিপ্ট এর প্রয়োজনীয় সব কমান্ড
icon: javascript
---
```

### React Cheatsheet:

```mdx
---
title: React চিটশিট
description: রিয়্যাক্ট ডেভেলপমেন্ট গাইড
icon: react
---
```

### Python Cheatsheet:

```mdx
---
title: Python চিটশিট
description: পাইথন প্রোগ্রামিং রেফারেন্স
icon: python
---
```

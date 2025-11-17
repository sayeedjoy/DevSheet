export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ডেভ চিটশিট",
  fullName: "ডেভ চিটশিট - বাংলা প্রোগ্রামিং রেফারেন্স",
  description: "একটি ব্যক্তিগত চিটশিট সংগ্রহ সাইট :)",
  shortDescription: "বাংলা প্রোগ্রামিং চিটশিট",
  url: "https://dev.sayeedjoy.com",
  ogImage: "/og-image.png",
  keywords: [
    "বাংলা চিটশিট",
    "প্রোগ্রামিং রেফারেন্স",
    "git commands",
    "linux commands",
    "terminal commands",
    "developer tools",
    "programming guide",
    "বাংলা প্রোগ্রামিং",
    "কোডিং গাইড",
    "ডেভেলপার টুলস",
  ],
  author: {
    name: "DevSheet Team",
    url: "https://devsheet.bd",
    email: "contact@devsheet.bd",
  },
  navItems: [
    {
      label: "হোম",
      href: "/",
    },
    {
      label: "সম্পর্কে",
      href: "/about",
    },
    {
      label: "কন্ট্রিবিউটর",
      href: "/contributor",
    },
  ],
  navMenuItems: [
    {
      label: "হোম",
      href: "/",
    },
    {
      label: "সম্পর্কে",
      href: "/about",
    },
    {
      label: "কন্ট্রিবিউটর",
      href: "/contributor",
    },
  ],
  links: {
    github: "https://github.com/sayeedjoy/DevSheet",
    twitter: "https://twitter.com/devsheet_bd",
    docs: "/",
    discord: "https://discord.gg/devsheet",
    sponsor: "https://github.com/sponsors/devsheet",
  },
  social: {
    twitter: "@devsheet_bd",
    github: "devsheet",
    linkedin: "devsheet-bd",
  },
};

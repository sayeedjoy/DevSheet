import { memo } from "react";
import { Link } from "@heroui/link";

export const Footer = memo(function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 bangla-text">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/sayeedjoy/DevSheet"
        title="GitHub"
      >
        <span className="text-default-600">এটি একটি </span>
        <p className="text-primary">অপেন সোর্স প্রজেক্ট</p>
      </Link>
    </footer>
  );
});

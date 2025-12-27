"use client";

import { memo } from "react";
import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
// Removed global devicon CSS import from here to reduce bundle size
// We will use a more efficient way to load icons

interface CheatsheetCardProps {
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export const CheatsheetCard = memo(function CheatsheetCard({
  title,
  description,
  icon,
  slug,
}: CheatsheetCardProps) {
  return (
    <Link className="w-full h-full group" href={`/${slug}`}>
      <Card
        isPressable
        className="w-full h-full min-h-[160px] max-h-[160px] bg-gradient-to-br from-background to-default-50/30 border border-default-200/60 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-transform duration-300 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1"
        shadow="sm"
      >
        <CardBody className="px-7 py-5 h-full">
          <div className="flex gap-5 h-full items-center">
            {/* Icon on the left - no background, just the icon */}
            <div className="flex items-center justify-center w-16 h-16 min-w-16 text-primary group-hover:scale-105 transition-transform duration-300 ease-out">
              <i className={`devicon-${icon}-plain text-4xl`} />
            </div>

            {/* Content on the right - title and description stacked */}
            <div className="flex flex-col justify-center flex-1 min-w-0 pr-3">
              {/* Title - allow 2 lines to prevent cutting off */}
              <h3 className="text-xl font-bold bangla-text text-foreground line-clamp-2 leading-tight mb-2 group-hover:text-primary transition-colors duration-200">
                {title}
              </h3>

              {/* Description below title - 2 lines max */}
              <p className="text-lg text-default-600 bangla-text line-clamp-2 leading-relaxed group-hover:text-default-700 transition-colors duration-200">
                {description}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
});

import { memo } from "react";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/config/primitives";

export const HomeHero = memo(function HomeHero() {
  return (
    <div className="inline-block max-w-3xl text-center justify-center">
      <h1 className={title({ class: "bangla-text" })}>ডেভেলপার চিটশিট</h1>
      <div className={subtitle({ class: "mt-4 bangla-text" })}>
        {siteConfig.description}
      </div>
    </div>
  );
});

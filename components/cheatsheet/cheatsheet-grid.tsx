import { CheatsheetCard } from "@/components/cheatsheet/cheatsheet-card";
import { getAllCheatsheets } from "@/lib/cheatsheets";

export function CheatsheetGrid() {
  const cheatsheets = getAllCheatsheets();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8 mb-8">
      {cheatsheets.map((cheatsheet) => (
        <div key={cheatsheet.slug} className="h-[160px]">
          <CheatsheetCard
            description={cheatsheet.description}
            icon={cheatsheet.icon}
            slug={cheatsheet.slug}
            title={cheatsheet.title}
          />
        </div>
      ))}
    </div>
  );
}

import { Menu, Search, ShoppingBag } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";

export function MainHeader() {
  return (
    <header className="w-full bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center">
          <button type="button" aria-label="Open menu" className="text-black">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-1">
          <LogoMark className="h-12 w-12 sm:h-14 sm:w-14" />
          <span className="font-display text-lg font-bold tracking-[0.2em] text-black sm:text-2xl">
            THE GRAND DESIGNER
          </span>
          <span className="text-[10px] font-medium tracking-[0.3em] text-black/70 sm:text-xs">
            I AM YOU.
          </span>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button type="button" aria-label="Search" className="text-black">
            <Search className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Cart" className="text-black">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

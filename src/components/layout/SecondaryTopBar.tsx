import { Instagram, Facebook, Youtube, ChevronDown } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "Facebook", href: "#", Icon: Facebook },
  { label: "YouTube", href: "#", Icon: Youtube },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 1 1-2.59-2.59c.26 0 .51.03.75.1V9.85a5.9 5.9 0 0 0-.75-.05A5.99 5.99 0 0 0 4 15.85a5.99 5.99 0 0 0 11.99 0V8.4a7.345 7.345 0 0 0 4.3 1.38V6.69s-1.88.09-2.69-.87Z" />
    </svg>
  );
}

export function SecondaryTopBar() {
  return (
    <div className="hidden w-full border-b border-black/5 bg-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm sm:px-6">
        <a href="#" className="tracking-wide text-black hover:opacity-70">
          Search
        </a>
        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-black hover:opacity-70"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <a href="#" aria-label="TikTok" className="text-black hover:opacity-70">
            <TikTokIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="flex items-center gap-1.5 text-black hover:opacity-70"
          >
            <span aria-hidden="true">🇺🇸</span>
            <span className="tracking-wide">USD</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

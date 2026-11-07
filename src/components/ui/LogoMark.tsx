export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M30 85c-14-6-22-20-22-35 0-24 19-42 42-42 20 0 36 14 40 32"
        stroke="#0f4c4c"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="18" r="5" fill="#e0457b" />
      <circle cx="66" cy="14" r="4" fill="#f2a900" />
      <circle cx="80" cy="22" r="6" fill="#2a7fc9" />
      <circle cx="88" cy="36" r="4.5" fill="#6bbf59" />
      <circle cx="90" cy="52" r="3.5" fill="#9b59b6" />
      <circle cx="38" cy="10" r="3" fill="#f2a900" />
      <circle cx="24" cy="18" r="3.5" fill="#2a7fc9" />
      <circle cx="14" cy="32" r="3" fill="#6bbf59" />
      <circle cx="72" cy="30" r="2.5" fill="#e0457b" />
      <circle cx="60" cy="24" r="2" fill="#9b59b6" />
    </svg>
  );
}

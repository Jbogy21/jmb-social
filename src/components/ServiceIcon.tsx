const paths: Record<string, React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M3 9h18" />
      <circle cx="6" cy="6.75" r="0.4" fill="currentColor" />
      <circle cx="8.2" cy="6.75" r="0.4" fill="currentColor" />
      <path d="M7 13h5M7 16h9" />
    </>
  ),
  apps: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2" />
      <path d="M10.5 18.5h3" />
      <path d="M10 6.5h4" />
    </>
  ),
  ai: (
    <>
      <path d="M11 3.5l1.6 4.9 4.9 1.6-4.9 1.6L11 16.5l-1.6-4.9L4.5 10l4.9-1.6z" />
      <path d="M18 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </>
  ),
  ads: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
      <path d="M12 12l7-7M16.5 4.5h3v3" />
    </>
  ),
  creative: (
    <>
      <path d="M12 3l7 9-7 9-7-9z" />
      <circle cx="12" cy="12" r="1.5" />
      <path d="M12 3v7.5" />
    </>
  ),
  social: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H10l-4.5 4v-4h0A1.5 1.5 0 0 1 4 14.5z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M7.5 15l4-4.5 3 3L19.5 7" />
      <path d="M16 7h3.5v3.5" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  size = 28,
  className = "",
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[slug]}
    </svg>
  );
}

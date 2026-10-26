export default function Snowflake({
  size = 16,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
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
      style={style}
    >
      <path d="M12 2v20M3.34 7l17.32 10M3.34 17L20.66 7" />
      <path d="M9.6 3.9L12 6.3l2.4-2.4M9.6 20.1L12 17.7l2.4 2.4" />
      <path d="M4.3 9.8l3.3.9-.9 3.3M19.7 14.2l-3.3-.9.9-3.3" />
      <path d="M4.3 14.2l3.3-.9-.9-3.3M19.7 9.8l-3.3.9.9 3.3" />
    </svg>
  );
}

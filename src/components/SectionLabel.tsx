export default function SectionLabel({
  index,
  label,
  tone = "ink",
}: {
  index?: string;
  label: string;
  tone?: "ink" | "cream";
}) {
  const color = tone === "cream" ? "text-cream-70" : "text-ink-70";
  const line = tone === "cream" ? "bg-cream-70" : "bg-ink-70";

  return (
    <div className={`flex items-center gap-4 font-mono-label text-xs ${color}`}>
      {index && <span>{index}</span>}
      <span className={`h-px w-8 ${line}`} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

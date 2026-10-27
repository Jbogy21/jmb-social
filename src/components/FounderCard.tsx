import Image from "next/image";
import { founder } from "@/lib/data";
import StudioPanel from "./StudioPanel";

export default function FounderCard() {
  if (!founder.photo) return <StudioPanel />;

  return (
    <div className="relative h-full w-full overflow-hidden bg-green">
      <Image
        src={founder.photo}
        alt={founder.photoAlt}
        fill
        sizes="(min-width: 768px) 40vw, 90vw"
        className="object-cover"
        priority
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-6 pt-16 text-cream">
        <p className="font-display text-2xl font-medium">{founder.name}</p>
        <p className="font-mono-label mt-1 text-[11px] text-cream-70">{founder.role}</p>
      </div>
    </div>
  );
}

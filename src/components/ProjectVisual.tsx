import Image from "next/image";
import {
  statusLabels,
  type ProjectKind,
  type ProjectMedia,
  type ProjectStatus,
} from "@/lib/data";

type Accent = "green" | "charcoal" | "sage" | "cream";

const backgrounds: Record<Accent, string> = {
  green: "linear-gradient(155deg, #4a5633 0%, #333d22 48%, #20260f 100%)",
  charcoal: "linear-gradient(155deg, #37362e 0%, #201f19 55%, #131209 100%)",
  sage: "linear-gradient(155deg, #c3c6ac 0%, #a7ab8f 45%, #7d8266 100%)",
  cream: "linear-gradient(155deg, #efe8d4 0%, #e3dabd 50%, #cfc4a0 100%)",
};

const isDark: Record<Accent, boolean> = {
  green: true,
  charcoal: true,
  sage: false,
  cream: false,
};

const kindDescription: Record<ProjectKind, string> = {
  web: "website",
  app: "mobile app",
  ai: "AI agent conversation",
  ads: "set of ad creatives",
  brand: "brand identity",
  social: "social content grid",
};

export default function ProjectVisual({
  kind,
  accent = "green",
  tag,
  status,
  media,
}: {
  kind: ProjectKind;
  accent?: Accent;
  tag?: string;
  status?: ProjectStatus;
  media?: ProjectMedia;
}) {
  return (
    <div
      className={`grain relative h-full w-full overflow-hidden ${
        isDark[accent] ? "text-cream" : "text-ink"
      }`}
      style={{ backgroundImage: backgrounds[accent] }}
      role="img"
      aria-label={
        media
          ? `${kindDescription[kind]} preview`
          : `Illustrative ${kindDescription[kind]} mockup`
      }
    >
      <div className="absolute inset-0" aria-hidden="true">
        {media?.frame === "browser" && <ShotMock image={media.images[0]} url={media.url} />}
        {media?.frame === "stack" && <StackMock images={media.images} />}
        {!media && kind === "web" && <WebMock />}
        {!media && kind === "app" && <AppMock />}
        {!media && kind === "ai" && <AiMock />}
        {!media && kind === "ads" && <AdsMock />}
        {!media && kind === "brand" && <BrandMock />}
        {!media && kind === "social" && <SocialMock />}
      </div>

      {tag && (
        <span className="font-mono-label absolute left-5 top-5 border border-current/40 px-2.5 py-1 text-[10px] opacity-80">
          {tag}
        </span>
      )}
      {status && (
        <span className="font-mono-label absolute bottom-5 right-5 text-[9px] opacity-60">
          {statusLabels[status]}
        </span>
      )}
    </div>
  );
}

function ShotMock({ image, url }: { image: string; url?: string }) {
  return (
    <div className="absolute left-1/2 top-1/2 flex aspect-[185/100] w-[min(86%,900px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[3px] border border-current/30 bg-black/20 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex h-6 shrink-0 items-center gap-1.5 border-b border-current/20 bg-black/25 px-3">
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        {url && (
          <span className="font-mono-label mx-auto text-[8px] opacity-70">{url}</span>
        )}
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function StackMock({ images }: { images: string[] }) {
  return (
    <div className="absolute inset-y-[11%] left-1/2 flex -translate-x-1/2 items-center gap-[4%]">
      {images.map((src) => (
        <div
          key={src}
          className="relative aspect-[4/5] h-full overflow-hidden rounded-[3px] border border-current/30 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]"
        >
          <Image src={src} alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

function WebMock() {
  return (
    <div className="absolute bottom-[19%] top-[14%] left-1/2 flex w-[min(82%,760px)] -translate-x-1/2 flex-col rounded-[3px] border border-current/30 bg-current/[0.07] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-1.5 border-b border-current/20 px-3 py-2">
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        <i className="h-1.5 w-1.5 rounded-full bg-current/40" />
        <div className="mx-auto h-2 w-1/3 rounded-full bg-current/15" />
      </div>
      <div className="grid flex-1 grid-cols-5 gap-4 p-4">
        <div className="col-span-3 flex flex-col justify-center gap-2">
          <div className="h-3 w-11/12 rounded-sm bg-current/60" />
          <div className="h-3 w-8/12 rounded-sm bg-current/60" />
          <div className="mt-2 h-1.5 w-10/12 rounded-sm bg-current/25" />
          <div className="h-1.5 w-7/12 rounded-sm bg-current/25" />
          <div className="mt-3 h-5 w-20 rounded-[2px] bg-current/70" />
        </div>
        <div className="col-span-2 rounded-sm bg-current/20" />
      </div>
      <div className="grid grid-cols-3 gap-3 border-t border-current/20 p-3">
        <div className="h-6 rounded-sm bg-current/15" />
        <div className="h-6 rounded-sm bg-current/15" />
        <div className="h-6 rounded-sm bg-current/15" />
      </div>
    </div>
  );
}

function Phone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex aspect-[9/18.5] h-full flex-col gap-2 rounded-[1.4rem] border border-current/40 bg-current/[0.08] p-2.5 ${className}`}
    >
      <div className="mx-auto h-1 w-8 rounded-full bg-current/30" />
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded-full bg-current/40" />
        <div className="h-1.5 w-1/3 rounded-sm bg-current/50" />
      </div>
      <div className="h-[24%] rounded-lg bg-current/25" />
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2 rounded-md border border-current/20 p-1.5">
            <div className="h-4 w-4 rounded-sm bg-current/30" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-1 w-3/4 rounded-sm bg-current/45" />
              <div className="h-1 w-1/2 rounded-sm bg-current/20" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-around border-t border-current/20 pt-2">
        {[0, 1, 2, 3].map((dot) => (
          <i key={dot} className={`h-2 w-2 rounded-full ${dot === 0 ? "bg-current/70" : "bg-current/25"}`} />
        ))}
      </div>
    </div>
  );
}

function AppMock() {
  return (
    <div className="absolute bottom-[14%] top-[9%] left-1/2 flex -translate-x-1/2 items-center gap-[6%]">
      <Phone className="-rotate-3 opacity-60" />
      <Phone className="translate-y-[6%] rotate-2" />
    </div>
  );
}

function AiMock() {
  return (
    <div className="absolute inset-y-[12%] left-1/2 flex w-[min(72%,480px)] -translate-x-1/2 flex-col gap-2.5 rounded-[3px] border border-current/30 bg-current/[0.07] p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-current/20 pb-2.5">
        <div className="h-3 w-3 rounded-full bg-current/50" />
        <div className="h-1.5 w-1/4 rounded-sm bg-current/45" />
        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-current/60" />
      </div>
      <div className="h-6 w-3/4 rounded-lg rounded-bl-none bg-current/20" />
      <div className="ml-auto h-5 w-1/2 rounded-lg rounded-br-none bg-current/60" />
      <div className="h-9 w-2/3 rounded-lg rounded-bl-none bg-current/20" />
      <div className="flex gap-2">
        <div className="h-5 w-16 rounded-full border border-current/50 bg-current/10" />
        <div className="h-5 w-20 rounded-full border border-current/50 bg-current/10" />
        <div className="h-5 w-14 rounded-full border border-current/50 bg-current/10" />
      </div>
      <div className="ml-auto h-5 w-2/5 rounded-lg rounded-br-none bg-current/60" />
      <div className="flex w-3/5 items-center gap-3 rounded-lg rounded-bl-none border border-current/30 bg-current/15 p-2.5">
        <div className="h-5 w-5 shrink-0 rounded-full bg-current/60" />
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="h-1.5 w-4/5 rounded-sm bg-current/60" />
          <div className="h-1.5 w-3/5 rounded-sm bg-current/30" />
        </div>
      </div>
      <div className="mt-auto flex h-7 items-center rounded-full border border-current/30 px-3">
        <div className="h-1.5 w-1/3 rounded-sm bg-current/25" />
        <div className="ml-auto h-3.5 w-3.5 rounded-full bg-current/60" />
      </div>
    </div>
  );
}

function AdTile({ label, className }: { label: string; className: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="font-mono-label text-[9px] opacity-60">{label}</span>
      <div className={`flex flex-col gap-1.5 rounded-[3px] border border-current/30 bg-current/[0.07] p-2 ${className}`}>
        <div className="flex-1 rounded-sm bg-current/25" />
        <div className="h-1.5 w-3/4 rounded-sm bg-current/60" />
        <div className="h-1 w-1/2 rounded-sm bg-current/25" />
        <div className="h-3 w-10 rounded-[2px] bg-current/70" />
      </div>
    </div>
  );
}

function AdsMock() {
  return (
    <div className="absolute inset-y-[12%] left-1/2 flex -translate-x-1/2 items-center gap-[5%]">
      <AdTile label="A" className="aspect-square w-[min(24vw,120px)] sm:w-[110px] md:w-[96px] lg:w-[120px]" />
      <AdTile label="B" className="aspect-[4/5] w-[min(26vw,130px)] sm:w-[120px] md:w-[104px] lg:w-[130px]" />
      <AdTile label="C" className="aspect-[9/14] w-[min(20vw,100px)] sm:w-[90px] md:w-[80px] lg:w-[100px]" />
    </div>
  );
}

function BrandMock() {
  const swatches = ["#333d22", "#ece2c8", "#a7ab8f", "#1c1b16"];
  return (
    <div className="absolute inset-y-[14%] left-1/2 grid w-[min(80%,720px)] -translate-x-1/2 grid-cols-5 gap-5">
      <div className="col-span-3 flex flex-col justify-between rounded-[3px] border border-current/30 bg-current/[0.07] p-4">
        <p className="font-display text-6xl font-medium leading-none sm:text-7xl md:text-6xl lg:text-7xl">Aa</p>
        <div className="flex flex-col gap-1.5">
          <div className="h-1.5 w-full rounded-sm bg-current/30" />
          <div className="h-1.5 w-4/5 rounded-sm bg-current/30" />
          <div className="h-1.5 w-3/5 rounded-sm bg-current/30" />
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {swatches.map((color) => (
          <div
            key={color}
            className="flex-1 rounded-[2px] border border-current/30"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}

const socialCells = [
  "bg-current/30",
  "bg-current/10",
  "bg-current/55",
  "bg-current/15",
  "bg-current/35",
  "bg-current/20",
  "bg-current/10",
  "bg-current/45",
  "bg-current/25",
];

function SocialMock() {
  return (
    <div className="absolute inset-y-[11%] left-1/2 grid aspect-square -translate-x-1/2 grid-cols-3 gap-2">
      {socialCells.map((fill, index) => (
        <div
          key={index}
          className={`flex items-center justify-center rounded-[2px] border border-current/20 ${fill}`}
        >
          {index === 4 && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function StudioPanel() {
  return (
    <div className="grain relative flex h-full w-full flex-col justify-between overflow-hidden bg-green p-8 text-cream sm:p-10">
      <p className="font-mono-label text-[11px] text-cream-70">JMB / 001</p>
      <div>
        <p className="font-display text-[5.5rem] font-medium leading-none tracking-tight sm:text-[7rem]">
          JMB
        </p>
        <p className="font-mono-label mt-3 text-[11px] text-sage">Social</p>
      </div>
      <ul className="font-mono-label flex flex-col gap-2 border-t border-line-on-green pt-5 text-[11px] text-cream-70">
        <li>Founder-led</li>
        <li>Design · Engineering · AI · Growth</li>
        <li>UK / 2026</li>
      </ul>
    </div>
  );
}

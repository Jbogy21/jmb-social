// The flick-through on the home page opening screen: one list of scenes per side.
//
// To use a real photo for a scene, put the file in /public/hero/ and set `image`, e.g.
//   image: "/hero/trades-garage.jpg"
// A scene with an image shows the photo (slowly zooming); a scene without one shows the
// designed placeholder (gradient, texture and big word) so nothing looks empty meanwhile.

export type HeroScene = {
  label: string;
  word: string;
  bg: string;
  pattern?: string;
  image?: string;
  alt?: string;
};

export const heroScenes: { trades: HeroScene[]; creative: HeroScene[] } = {
  trades: [
    {
      label: "Building sites",
      word: "Site",
      bg: "radial-gradient(120% 90% at 72% 18%, #86743a 0%, #3b4527 46%, #12150d 100%)",
      pattern:
        "repeating-linear-gradient(45deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 38px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.07) 0 1px, transparent 1px 38px)",
    },
    {
      label: "Garages",
      word: "Garage",
      bg: "linear-gradient(160deg, #5d6a3c 0%, #2a3320 52%, #0f120b 100%)",
      pattern: "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0 2px, transparent 2px 40px)",
    },
    {
      label: "Workshops",
      word: "Workshop",
      bg: "radial-gradient(110% 95% at 20% 30%, #8f7d3e 0%, #333d22 50%, #10130c 100%)",
      pattern: "radial-gradient(rgba(255,255,255,0.16) 1.6px, transparent 1.7px) 0 0 / 30px 30px",
    },
    {
      label: "Shops & cafés",
      word: "Counter",
      bg: "linear-gradient(200deg, #77683a 0%, #2e3822 54%, #0e110a 100%)",
      pattern: "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 38px, transparent 38px 76px)",
    },
    {
      label: "Landscaping & tree care",
      word: "Outdoors",
      bg: "radial-gradient(120% 100% at 78% 72%, #6e8044 0%, #2b3a1f 50%, #0e120a 100%)",
      pattern:
        "repeating-radial-gradient(circle at 72% 40%, rgba(255,255,255,0.07) 0 2px, transparent 2px 24px)",
    },
  ],
  creative: [
    {
      label: "Fashion",
      word: "Runway",
      bg: "radial-gradient(120% 90% at 28% 22%, #e4572e 0%, #6a2312 44%, #15100d 100%)",
      pattern:
        "repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 64px)",
    },
    {
      label: "Modelling",
      word: "Studio",
      bg: "radial-gradient(90% 80% at 62% 38%, #f0724a 0%, #5a2414 46%, #130e0c 100%)",
      pattern:
        "radial-gradient(circle at 62% 38%, rgba(255,255,255,0.14) 0 120px, transparent 121px)",
    },
    {
      label: "Music",
      word: "Stage",
      bg: "linear-gradient(155deg, #c9471f 0%, #3c1a10 54%, #110c0a 100%)",
      pattern:
        "repeating-linear-gradient(100deg, rgba(255,255,255,0.09) 0 3px, transparent 3px 66px)",
    },
    {
      label: "Sport",
      word: "Pitch",
      bg: "radial-gradient(110% 95% at 80% 25%, #d9532b 0%, #4d2012 50%, #130d0b 100%)",
      pattern:
        "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 90px, transparent 90px 180px)",
    },
    {
      label: "Events & nights out",
      word: "After dark",
      bg: "radial-gradient(120% 100% at 30% 78%, #f0724a 0%, #54230f 48%, #120c0a 100%)",
      pattern: "radial-gradient(rgba(255,255,255,0.18) 2px, transparent 2.1px) 0 0 / 44px 44px",
    },
  ],
};

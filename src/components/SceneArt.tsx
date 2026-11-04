import Image from "next/image";
import type { HeroScene } from "@/lib/heroScenes";

// The picture for one scene: the real photo when there is one, otherwise the designed
// stand-in (texture plus a big ghosted word). Used by the reels and the film strip.
export default function SceneArt({
  scene,
  italic = false,
  priority = false,
  showWord = true,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  scene: HeroScene;
  italic?: boolean;
  priority?: boolean;
  showWord?: boolean;
  sizes?: string;
}) {
  if (scene.image) {
    return (
      <Image
        src={scene.image}
        alt={scene.alt ?? ""}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  return (
    <>
      {scene.pattern && <span className="absolute inset-0" style={{ background: scene.pattern }} />}
      {showWord && (
        <span className={`reel-word font-display ${italic ? "italic" : ""}`}>{scene.word}</span>
      )}
    </>
  );
}

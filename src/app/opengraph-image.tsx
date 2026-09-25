import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#333d22",
          color: "#f3eee0",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, letterSpacing: "0.08em" }}>
          JMB <span style={{ color: "#a7ab8f", marginLeft: 14 }}>SOCIAL</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, lineHeight: 1.1, maxWidth: 980 }}>
            Make your business impossible to ignore.
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a7ab8f", fontFamily: "sans-serif" }}>
            {siteConfig.descriptor} — {siteConfig.location}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

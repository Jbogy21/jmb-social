import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#333d22",
          color: "#f3eee0",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          fontFamily: "Georgia, serif",
        }}
      >
        JMB
      </div>
    ),
    { ...size }
  );
}

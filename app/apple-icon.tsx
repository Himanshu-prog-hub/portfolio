import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0f23 0%, #1a0533 100%)",
          borderRadius: 40,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 40,
            background:
              "radial-gradient(circle at 70% 30%, rgba(124,58,237,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-2px",
            position: "relative",
          }}
        >
          HM
        </div>
      </div>
    ),
    { ...size }
  );
}

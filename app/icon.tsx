import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d0f23 0%, #1a0533 100%)",
          borderRadius: 6,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle purple glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 6,
            background: "radial-gradient(circle at 70% 30%, rgba(124,58,237,0.5) 0%, transparent 65%)",
          }}
        />
        {/* Initials */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.5px",
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

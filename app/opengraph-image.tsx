import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Himanshu Mishra — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #000319 0%, #0d0f23 50%, #1a0533 100%)",
          padding: "60px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Purple glow top-right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
          }}
        />

        {/* Cyan glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
          }}
        />

        {/* URL watermark top-right */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 72,
            fontSize: 24,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.05em",
          }}
        >
          himanshumishra.site
        </div>

        {/* Role badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 24,
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(124,58,237,0.5)",
            background: "rgba(124,58,237,0.12)",
            color: "rgba(203,172,249,0.9)",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#7c3aed",
            }}
          />
          SD2 · Serko · Bengaluru
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.0,
            marginBottom: 16,
            letterSpacing: "-2px",
          }}
        >
          Himanshu Mishra
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.55)",
            marginBottom: 32,
            fontWeight: 400,
            lineHeight: 1.4,
          }}
        >
          Building scalable systems with Java · Spring Boot · GCP · React
        </div>

        {/* Tags row */}
        <div style={{ display: "flex", gap: 14, marginBottom: 36 }}>
          {["Java", "Spring Boot", "GCP", "React", "Next.js", "LLD"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid rgba(124,58,237,0.4)",
                color: "rgba(203,172,249,0.85)",
                fontSize: 20,
                fontWeight: 500,
                background: "rgba(124,58,237,0.08)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 28px",
            borderRadius: 999,
            background: "rgba(124,58,237,0.85)",
            color: "#fff",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.03em",
          }}
        >
          View Portfolio →
        </div>
      </div>
    ),
    { ...size }
  );
}

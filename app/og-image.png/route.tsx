import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Himanshu Mishra — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
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
        {/* Purple glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 16,
            letterSpacing: "-2px",
          }}
        >
          Himanshu Mishra
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.6)",
            marginBottom: 40,
            fontWeight: 400,
          }}
        >
          Software Developer · Serko · Bengaluru
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 12 }}>
          {["Java", "Spring Boot", "GCP", "React", "Next.js"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 20px",
                borderRadius: 100,
                border: "1px solid rgba(124,58,237,0.5)",
                color: "rgba(203,172,249,0.9)",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL watermark */}
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 72,
            fontSize: 22,
            color: "rgba(255,255,255,0.25)",
          }}
        >
          himanshumishra.site
        </div>
      </div>
    ),
    { ...size }
  );
}

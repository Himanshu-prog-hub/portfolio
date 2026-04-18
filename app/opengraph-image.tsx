import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Himanshu Mishra — Backend Developer at Serko";
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
          fontFamily: "sans-serif",
          background: "linear-gradient(135deg, #000319 0%, #0d0f23 60%, #1a0533 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Left — text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "56px 52px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Role badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 24,
              padding: "7px 16px",
              borderRadius: 999,
              border: "1px solid rgba(124,58,237,0.5)",
              background: "rgba(124,58,237,0.12)",
              color: "rgba(203,172,249,0.9)",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.08em",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#7c3aed",
              }}
            />
            SD2 · Serko · Bengaluru
          </div>

          {/* Name */}
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.0,
              marginBottom: 14,
              letterSpacing: "-2px",
            }}
          >
            Himanshu Mishra
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.5)",
              marginBottom: 36,
              fontWeight: 400,
            }}
          >
            Backend Developer · Java · Spring Boot · GCP
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Java", "Spring Boot", "GCP", "React", "Next.js"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(124,58,237,0.4)",
                  color: "rgba(203,172,249,0.85)",
                  fontSize: 18,
                  fontWeight: 500,
                  background: "rgba(124,58,237,0.08)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* URL watermark */}
          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.04em",
            }}
          >
            himanshumishra.site
          </div>
        </div>

        {/* Right — Avatar */}
        <div
          style={{
            width: 380,
            height: "100%",
            position: "relative",
            display: "flex",
            overflow: "hidden",
          }}
        >
          {/* Left fade overlay to blend into background */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "45%",
              height: "100%",
              background: "linear-gradient(to right, #000319, transparent)",
              zIndex: 2,
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "20%",
              background: "linear-gradient(to top, #0d0f23, transparent)",
              zIndex: 2,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://himanshumishra.site/HimanshuOG.jpg"
            alt="Himanshu Mishra"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}

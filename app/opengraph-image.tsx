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
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://himanshumishra.site/HimanshuOG.jpg"
          alt="Himanshu Mishra"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 15%",
          }}
        />
      </div>
    ),
    { ...size }
  );
}

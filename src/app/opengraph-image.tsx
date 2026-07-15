import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Cruxion: Engineering outcome infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/og-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          background: "#000520",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={860} height={374} alt="" />
        <div
          style={{
            fontSize: "32px",
            color: "#9fb3d1",
            textAlign: "center",
            maxWidth: "960px",
            lineHeight: 1.3,
          }}
        >
          AI-native engineering skill tracks: cloud, embedded systems, IoT.
          Apprentice → Engineer → Architect.
        </div>
      </div>
    ),
    { ...size }
  );
}

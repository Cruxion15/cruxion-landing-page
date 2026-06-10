import { ImageResponse } from "next/og";

export const alt = "Cruxion — Engineering outcome infrastructure";
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
          justifyContent: "center",
          padding: "80px",
          background: "#0c1324",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "#357DF1",
            }}
          />
          <div style={{ fontSize: "40px", fontWeight: 700 }}>Cruxion</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <div>Engineering outcome</div>
          <div>infrastructure</div>
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "#9fb3d1",
            marginTop: "28px",
            maxWidth: "900px",
          }}
        >
          AI-native skill tracks for CS &amp; EC students — cloud, embedded
          systems, IoT. Apprentice → Engineer → Architect.
        </div>
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}: research portfolio`;
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
          padding: "72px",
          background: "#f6f5f1",
          backgroundImage:
            "linear-gradient(rgba(29,79,122,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(29,79,122,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          color: "#15202b",
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: "#1d4f7a", textTransform: "uppercase" }}>
          Mechanical &amp; Aerospace Engineering · Research Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{profile.name}</div>
          <div style={{ fontSize: 30, marginTop: 24, color: "#3b4652", maxWidth: 980, lineHeight: 1.35 }}>
            CFD · Gaussian-process surrogates · Bayesian optimization · Diagnostics &amp; prognostics
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#3b4652", borderTop: "2px solid #d9d6cd", paddingTop: 24 }}>
          IMechE Part G (2026) · IBCAST 2025 · github.com/uns-haider96
        </div>
      </div>
    ),
    size,
  );
}

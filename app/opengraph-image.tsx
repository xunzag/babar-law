import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Babar Law Associates · Advocates & International Consultants. Karachi · New York · Cyprus.";

export default async function OpengraphImage() {
  const [cormorant, barlow, markBuffer] = await Promise.all([
    readFile(path.join(process.cwd(), "lib/fonts/CormorantGaramond-Bold.ttf")),
    readFile(path.join(process.cwd(), "lib/fonts/Barlow-Medium.ttf")),
    readFile(path.join(process.cwd(), "public/assets/babar-law-mark.png")),
  ]);
  const markSrc = `data:image/png;base64,${markBuffer.toString("base64")}`;

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
          background:
            "linear-gradient(160deg, #0a0a0c 0%, #08080a 55%, #0c0c0e 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 26,
            border: "1px solid rgba(201,162,39,0.38)",
          }}
        />
        <img src={markSrc} width={124} height={124} style={{ marginBottom: 30 }} />
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontFamily: "Cormorant Garamond",
            color: "#ffffff",
            letterSpacing: 4,
            lineHeight: 1,
          }}
        >
          BABAR LAW ASSOCIATES
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 22,
            fontSize: 21,
            fontFamily: "Barlow",
            color: "#c9a227",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Advocates &amp; International Consultants
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            width: 84,
            height: 1,
            background: "#c9a227",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 19,
            fontFamily: "Barlow",
            color: "rgba(239,234,223,0.62)",
            letterSpacing: 2,
          }}
        >
          Karachi · New York · Cyprus · Attorney at Law · LLM (Europe)
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant Garamond", data: cormorant, weight: 700, style: "normal" },
        { name: "Barlow", data: barlow, weight: 500, style: "normal" },
      ],
    }
  );
}

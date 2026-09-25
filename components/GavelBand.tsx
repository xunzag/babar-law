import { existsSync } from "node:fs";
import path from "node:path";
import GavelBandClient from "@/components/GavelBandClient";

export const GAVEL_SRC = "/assets/gavel.jpg";

// Cinematic full-bleed interlude. Renders only once the photograph has been
// added at public/assets/gavel.jpg, so the page never shows a broken image.
export default function GavelBand() {
  if (!existsSync(path.join(process.cwd(), "public", GAVEL_SRC))) return null;
  return <GavelBandClient src={GAVEL_SRC} />;
}

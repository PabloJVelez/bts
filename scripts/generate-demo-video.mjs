import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const root = process.cwd();
const outputDir = path.join(root, "public", "videos");
const outputPath = path.join(outputDir, "chef-booking-flow.webm");
const ffmpegPath = process.env.FFMPEG_PATH ?? "ffmpeg";

const inputs = [
  {
    path: "public/chefevethub-menus.png",
    y: 94,
  },
  {
    path: "public/chefeventhub-request.png",
    y: 0,
  },
  {
    path: "public/chefeventhub-admin-request.png",
    y: 0,
  },
  {
    path: "public/chefeventhub-request-accepted.png",
    y: 208,
  },
];

await fs.mkdir(outputDir, { recursive: true });

const inputArgs = inputs.flatMap((input) => [
  "-loop",
  "1",
  "-t",
  "4",
  "-i",
  input.path,
]);

const normalizedSlides = inputs
  .map(
    (input, index) =>
      `[${index}:v]scale=w=1280:h=720:force_original_aspect_ratio=increase,` +
      `crop=w=1280:h=720:x=(iw-1280)/2:y=${input.y},` +
      `setsar=sar=1,fps=fps=30,format=pix_fmts=yuv420p[v${index}]`
  )
  .join(";");

const filterGraph = [
  normalizedSlides,
  "[v0][v1]xfade=transition=fade:duration=0.45:offset=3.55[x1]",
  "[x1][v2]xfade=transition=fade:duration=0.45:offset=7.1[x2]",
  "[x2][v3]xfade=transition=fade:duration=0.45:offset=10.65[v]",
].join(";");

try {
  await execFileAsync(
    ffmpegPath,
    [
      "-y",
      "-hide_banner",
      ...inputArgs,
      "-filter_complex",
      filterGraph,
      "-map",
      "[v]",
      "-t",
      "14.2",
      "-an",
      "-c:v",
      "libvpx-vp9",
      "-crf",
      "34",
      "-b:v",
      "0",
      "-deadline",
      "good",
      outputPath,
    ],
    {
      cwd: root,
      maxBuffer: 1024 * 1024 * 10,
    }
  );
} catch (error) {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ENOENT"
  ) {
    throw new Error(
      "ffmpeg was not found. Install ffmpeg or set FFMPEG_PATH to regenerate the demo video."
    );
  }

  throw error;
}

console.log(`Wrote ${path.relative(root, outputPath)}`);

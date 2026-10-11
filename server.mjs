import path from "node:path";
import { fileURLToPath } from "node:url";
import compression from "compression";
import express from "express";
import { createRequestHandler } from "@react-router/express";
import * as build from "./build/server/index.js";

const app = express();
const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST;
const root = path.dirname(fileURLToPath(import.meta.url));
const clientDirectory = path.join(root, "build/client");

app.disable("x-powered-by");

// Video seeking requires byte ranges. Serve media before compression and tell
// proxies not to transform the response so Range requests remain intact.
app.use(
  "/videos",
  express.static(path.join(clientDirectory, "videos"), {
    acceptRanges: true,
    maxAge: "4h",
    setHeaders(response) {
      response.setHeader("Cache-Control", "public, max-age=14400, no-transform");
    },
  }),
);

app.use(compression());
app.use(
  "/assets",
  express.static(path.join(clientDirectory, "assets"), {
    immutable: true,
    maxAge: "1y",
  }),
);
app.use(express.static(clientDirectory));
app.all("*", createRequestHandler({ build, mode: process.env.NODE_ENV }));

const server = app.listen(port, host, () => {
  console.log(`[bts] http://${host || "localhost"}:${port}`);
});

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.once(signal, () => server.close());
}

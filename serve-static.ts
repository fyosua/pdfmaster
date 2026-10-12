// Static file server for the OfficeTools PDF toolkit (white-labeled PDFCraft static export).
// Serves ./out and maps directory/clean URLs to their index.html. Client-side only, no upload.
const root = new URL("./out/", import.meta.url).pathname;
const port = parseInt(Bun.env.PORT || "3010", 10);

function fileOrIndex(base: string): string {
  if (base === "/") return "index.html";
  if (base.endsWith("/")) return base + "index.html";
  return base + "/index.html";
}

Bun.serve({
  port,
  async fetch(req: Request): Promise<Response> {
    let path: string;
    try {
      path = decodeURIComponent(new URL(req.url).pathname);
    } catch {
      return new Response("Bad request", { status: 400 });
    }
    let rel = path.replace(/^\/+/, "");
    let f = Bun.file(root + rel);
    if (!(await f.exists())) {
      rel = fileOrIndex(rel);
      f = Bun.file(root + rel);
    }
    if (await f.exists()) {
      return new Response(f, {
        headers: { "X-Content-Type-Options": "nosniff" },
      });
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`OfficeTools PDF toolkit serving on http://0.0.0.0:${port} from ${root}`);

import { Hono } from "npm:hono";
import { serveStatic } from "npm:hono/deno";

const app = new Hono();

app.all("/_proxy/R4", async (c) => {
  const query = new URL(c.req.url).searchParams.toString();
  const targetURL = "https://ci.line-apps.com/R4" +
    (query === "" ? "" : "?" + query);

  const response = await fetch(targetURL, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: ["GET", "HEAD"].includes(c.req.method)
      ? undefined
      : c.req.raw.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      "Access-Control-Allow-Origin": "*",
    },
  });
});

app.all("/_proxy/CHROME_GW/*", async (c) => {
  const query = new URL(c.req.url).searchParams.toString();
  const targetURL = "https://line-chrome-gw.line-apps.com" +
    c.req.path.replace("/_proxy/CHROME_GW", "") +
    (query === "" ? "" : "?" + query);

  const response = await fetch(targetURL, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: ["GET", "HEAD"].includes(c.req.method)
      ? undefined
      : c.req.raw.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      "Access-Control-Allow-Origin": "*",
    },
  });
});

app.use("*", serveStatic({ root: "./www" }));

app.notFound((c) =>
  c.redirect("/?fallbackBy=" + encodeURIComponent(c.req.path))
);

Deno.serve({
  port: Number(Deno.env.get("PORT")) || 8000,
}, app.fetch);

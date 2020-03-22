const express = require("express");
// const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || "http://localhost:8000";

app.prepare().then(() => {
  let server = express();

  // Google signin urls
  server.use(
    ["/api/", "/complete/credit-kudos", "/_tasks/"],
    createProxyMiddleware({
      target: BACKEND_DOMAIN,
      changeOrigin: true,
      logLevel: "debug",
    }),
  );

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on ${dev ? "https" : "http"}://localhost:${port}`);
  });
});

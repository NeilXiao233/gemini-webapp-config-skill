const HOP_BY_HOP_HEADERS = new Set([
  "host",
  "connection",
  "content-length",
  "transfer-encoding",
  "accept-encoding",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-port",
  "x-forwarded-proto",
  "x-real-ip",
]);

const setCorsHeaders = (res: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "*");
};

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  const target = typeof req.query.target === "string" ? req.query.target : "";
  if (!target) {
    res.status(400).json({ error: "Missing target URL" });
    return;
  }

  const upstream = new URL(target);
  const headers = new Headers();
  Object.entries(req.headers || {}).forEach(([key, value]) => {
    if (!value || HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    if (Array.isArray(value)) {
      value.forEach((entry) => headers.append(key, entry));
      return;
    }
    headers.set(key, value as string);
  });

  const body = req.method === "GET" || req.method === "HEAD"
    ? undefined
    : typeof req.body === "string" || Buffer.isBuffer(req.body)
      ? req.body
      : JSON.stringify(req.body ?? {});

  try {
    const upstreamResponse = await fetch(upstream.toString(), {
      method: req.method,
      headers,
      body,
    });

    res.status(upstreamResponse.status);
    upstreamResponse.headers.forEach((value, key) => {
      if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) res.setHeader(key, value);
    });

    const buffer = Buffer.from(await upstreamResponse.arrayBuffer());
    res.send(buffer);
  } catch (error: any) {
    res.status(502).json({ error: error?.message || "Proxy request failed" });
  }
}

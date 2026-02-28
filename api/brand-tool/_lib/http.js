import { getBearerToken, verifyToken } from "./auth.js";

export const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
};

export const readBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

export const requireAdmin = (req) => {
  const token = getBearerToken(req.headers.authorization);
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.type !== "admin") return null;
  return payload;
};

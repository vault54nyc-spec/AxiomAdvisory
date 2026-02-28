import crypto from "crypto";

const ADMIN_PASSWORD = (process.env.BRAND_TOOL_ADMIN_PASSWORD || "AxiomAdmin2026!").trim();
const TOKEN_SECRET = (process.env.BRAND_TOOL_TOKEN_SECRET || "axiom-brand-tool-token-secret-change-me").trim();

const toBase64Url = (input) =>
  Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (input) => {
  const padded = input.padEnd(Math.ceil(input.length / 4) * 4, "=");
  const normalized = padded.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(normalized, "base64").toString("utf8");
};

const sign = (payloadPart) =>
  toBase64Url(crypto.createHmac("sha256", TOKEN_SECRET).update(payloadPart).digest());

export const issueToken = ({ type, sub, codeId, codeLabel, ttlSeconds }) => {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const body = { type, sub, codeId, codeLabel, exp };
  const encoded = toBase64Url(JSON.stringify(body));
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
};

export const verifyToken = (token) => {
  const [encoded, signature] = String(token || "").split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const sigA = Buffer.from(signature);
  const sigB = Buffer.from(expected);
  if (sigA.length !== sigB.length || !crypto.timingSafeEqual(sigA, sigB)) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(encoded));
    if (!parsed?.type || !parsed?.sub || !parsed?.exp) return null;
    if (parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const verifyAdminPassword = (attempt) => {
  const a = Buffer.from(String(attempt || ""));
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
};

export const getBearerToken = (authorizationHeader) => {
  if (!authorizationHeader) return null;
  const [scheme, token] = authorizationHeader.split(" ");
  if (!scheme || !token) return null;
  if (scheme.toLowerCase() !== "bearer") return null;
  return token;
};

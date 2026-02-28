import { issueToken, verifyAdminPassword } from "../_lib/auth.js";
import { readBody, sendJson } from "../_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  const body = await readBody(req);
  const password = typeof body.password === "string" ? body.password : "";

  if (!password) return sendJson(res, 400, { error: "Password is required." });

  if (!verifyAdminPassword(password)) {
    return sendJson(res, 401, { error: "Invalid credentials." });
  }

  const token = issueToken({ type: "admin", sub: "owner", ttlSeconds: 60 * 60 * 12 });

  return sendJson(res, 200, {
    ok: true,
    token,
    expiresInSeconds: 60 * 60 * 12,
  });
}

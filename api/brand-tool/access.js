import { issueToken } from "./_lib/auth.js";
import { getCodeByValue, getStore, isCodeUsable, sanitizeCode } from "./_lib/store.js";
import { readBody, sendJson } from "./_lib/http.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  const body = await readBody(req);
  const codeInput = typeof body.code === "string" ? sanitizeCode(body.code) : "";

  if (!codeInput) return sendJson(res, 400, { error: "Access code is required." });

  const store = await getStore();
  const code = getCodeByValue(store.codes, codeInput);

  if (!code || !isCodeUsable(code)) {
    return sendJson(res, 401, { error: "Invalid or inactive access code." });
  }

  const accessToken = issueToken({
    type: "access",
    sub: `code:${code.id}`,
    codeId: code.id,
    codeLabel: code.label,
    ttlSeconds: 60 * 60 * 8,
  });

  return sendJson(res, 200, {
    ok: true,
    accessToken,
    code: {
      id: code.id,
      label: code.label,
      expiresAt: code.expiresAt,
      maxUses: code.maxUses,
      uses: code.uses,
    },
  });
}

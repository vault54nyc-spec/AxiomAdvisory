import crypto from "crypto";
import { getBearerToken, verifyToken } from "./_lib/auth.js";
import { getStore, isCodeUsable, saveStore } from "./_lib/store.js";
import { readBody, sendJson } from "./_lib/http.js";

const FORMSPREE_ENDPOINT = process.env.BRAND_TOOL_FORMSPREE_ENDPOINT || "https://formspree.io/f/mqedjekk";

const safeText = (value, fallback = "") => (typeof value === "string" ? value.trim() : fallback);

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  const body = await readBody(req);
  const bearer = getBearerToken(req.headers.authorization);
  const token = bearer || (typeof body.accessToken === "string" ? body.accessToken : "");
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.type !== "access" || !payload.codeId) {
    return sendJson(res, 401, { error: "Invalid access token." });
  }

  const clientName = safeText(body.clientName);
  const clientEmail = safeText(body.clientEmail);
  const clientCompany = safeText(body.clientCompany);
  const brief = body.brief ?? null;

  if (!clientName || !clientEmail || !brief) {
    return sendJson(res, 400, { error: "Client identity and brief payload are required." });
  }

  const store = await getStore();
  const code = store.codes.find((item) => item.id === payload.codeId);

  if (!code || !isCodeUsable(code)) {
    return sendJson(res, 401, { error: "Access code is no longer active." });
  }

  code.uses += 1;

  const submission = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    codeId: code.id,
    codeLabel: code.label,
    clientName,
    clientEmail,
    clientCompany,
    status: "new",
    brief,
  };

  store.submissions.unshift(submission);
  store.submissions = store.submissions.slice(0, 500);

  await saveStore(store);

  fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: clientName,
      email: clientEmail,
      company: clientCompany,
      service: "Brand Decision Tool Submission",
      message: JSON.stringify(brief),
      submissionId: submission.id,
      codeLabel: code.label,
    }),
  }).catch(() => {
    // Non-fatal; dashboard still has submission.
  });

  return sendJson(res, 200, { ok: true, submissionId: submission.id });
}

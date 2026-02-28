import crypto from "crypto";
import { generateCode, getStore, sanitizeCode, saveStore } from "../_lib/store.js";
import { readBody, requireAdmin, sendJson } from "../_lib/http.js";

export default async function handler(req, res) {
  const admin = requireAdmin(req);
  if (!admin) return sendJson(res, 401, { error: "Unauthorized" });

  const store = await getStore();

  if (req.method === "GET") {
    const codes = [...store.codes].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sendJson(res, 200, { ok: true, codes });
  }

  if (req.method === "POST") {
    const body = await readBody(req);
    const label = typeof body.label === "string" && body.label.trim() ? body.label.trim() : "Partner Code";
    const candidate = typeof body.code === "string" && body.code.trim() ? sanitizeCode(body.code) : generateCode();
    const maxUsesRaw = typeof body.maxUses === "number" ? body.maxUses : null;
    const maxUses = maxUsesRaw === null ? null : Math.max(1, Math.floor(maxUsesRaw));
    const expiresAt = typeof body.expiresAt === "string" && body.expiresAt ? body.expiresAt : null;

    if (store.codes.some((item) => item.code === candidate)) {
      return sendJson(res, 409, { error: "Code already exists." });
    }

    const created = {
      id: crypto.randomUUID(),
      code: candidate,
      label,
      active: true,
      maxUses,
      uses: 0,
      expiresAt,
      createdAt: new Date().toISOString(),
    };

    store.codes.unshift(created);
    await saveStore(store);
    return sendJson(res, 200, { ok: true, code: created });
  }

  if (req.method === "PATCH") {
    const body = await readBody(req);
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return sendJson(res, 400, { error: "Code id is required." });

    const code = store.codes.find((item) => item.id === id);
    if (!code) return sendJson(res, 404, { error: "Code not found." });

    if (typeof body.active === "boolean") code.active = body.active;
    if (typeof body.label === "string" && body.label.trim()) code.label = body.label.trim();
    if (typeof body.maxUses === "number") code.maxUses = Math.max(1, Math.floor(body.maxUses));
    if (body.maxUses === null) code.maxUses = null;
    if (typeof body.expiresAt === "string") code.expiresAt = body.expiresAt || null;

    await saveStore(store);
    return sendJson(res, 200, { ok: true, code });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}

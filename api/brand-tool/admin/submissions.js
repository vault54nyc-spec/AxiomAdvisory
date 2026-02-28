import { getStore, saveStore } from "../_lib/store.js";
import { readBody, requireAdmin, sendJson } from "../_lib/http.js";

export default async function handler(req, res) {
  const admin = requireAdmin(req);
  if (!admin) return sendJson(res, 401, { error: "Unauthorized" });

  const store = await getStore();

  if (req.method === "GET") {
    const submissions = [...store.submissions].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sendJson(res, 200, { ok: true, submissions });
  }

  if (req.method === "PATCH") {
    const body = await readBody(req);
    const id = typeof body.id === "string" ? body.id : "";
    const status = typeof body.status === "string" ? body.status : "";

    if (!id || !status) return sendJson(res, 400, { error: "Submission id and status are required." });

    const validStatuses = new Set(["new", "reviewed", "in_progress", "completed"]);
    if (!validStatuses.has(status)) return sendJson(res, 400, { error: "Invalid status." });

    const submission = store.submissions.find((item) => item.id === id);
    if (!submission) return sendJson(res, 404, { error: "Submission not found." });

    submission.status = status;
    await saveStore(store);

    return sendJson(res, 200, { ok: true, submission });
  }

  if (req.method === "DELETE") {
    const body = await readBody(req);
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) return sendJson(res, 400, { error: "Submission id is required." });

    const before = store.submissions.length;
    store.submissions = store.submissions.filter((item) => item.id !== id);
    if (store.submissions.length === before) {
      return sendJson(res, 404, { error: "Submission not found." });
    }

    await saveStore(store);
    return sendJson(res, 200, { ok: true });
  }

  return sendJson(res, 405, { error: "Method not allowed" });
}

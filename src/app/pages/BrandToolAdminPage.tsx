import { useCallback, useEffect, useMemo, useState } from "react";

type ToolCode = {
  id: string;
  code: string;
  label: string;
  active: boolean;
  maxUses: number | null;
  uses: number;
  expiresAt: string | null;
  createdAt: string;
};

type ToolSubmission = {
  id: string;
  createdAt: string;
  codeId: string;
  codeLabel: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  status: "new" | "reviewed" | "in_progress" | "completed";
  brief: {
    generatedAt?: string;
    summary?: Record<string, string>;
  };
};

const ADMIN_TOKEN_KEY = "axiom_brand_tool_admin_token";

const statusOptions: ToolSubmission["status"][] = ["new", "reviewed", "in_progress", "completed"];

const formatDate = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
};

export default function BrandToolAdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(ADMIN_TOKEN_KEY));
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [codes, setCodes] = useState<ToolCode[]>([]);
  const [submissions, setSubmissions] = useState<ToolSubmission[]>([]);

  const [newCodeLabel, setNewCodeLabel] = useState("Partner Code");
  const [newCodeCustom, setNewCodeCustom] = useState("");
  const [newCodeMaxUses, setNewCodeMaxUses] = useState("");

  const apiFetch = useCallback(
    async (url: string, init?: RequestInit) => {
      if (!token) throw new Error("Unauthorized");
      const res = await fetch(url, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...(init?.headers || {}),
        },
      });
      const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
      if (!res.ok) {
        throw new Error((data.error as string) || "Request failed.");
      }
      return data;
    },
    [token],
  );

  const loadAll = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [codesRes, submissionsRes] = await Promise.all([
        apiFetch("/api/brand-tool/admin/codes"),
        apiFetch("/api/brand-tool/admin/submissions"),
      ]);
      setCodes((codesRes.codes as ToolCode[]) || []);
      setSubmissions((submissionsRes.submissions as ToolSubmission[]) || []);
    } finally {
      setLoading(false);
    }
  }, [apiFetch, token]);

  useEffect(() => {
    loadAll().catch((err) => {
      setAuthError(err instanceof Error ? err.message : "Unable to load admin data.");
    });
  }, [loadAll]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/brand-tool/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        throw new Error(data.error || "Login failed.");
      }
      sessionStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const createCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const payload: { label: string; code?: string; maxUses?: number } = {
        label: newCodeLabel.trim() || "Partner Code",
      };
      if (newCodeCustom.trim()) payload.code = newCodeCustom;
      if (newCodeMaxUses.trim()) {
        const parsed = Number(newCodeMaxUses);
        if (!Number.isNaN(parsed) && parsed > 0) payload.maxUses = parsed;
      }

      await apiFetch("/api/brand-tool/admin/codes", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setNewCodeCustom("");
      setNewCodeMaxUses("");
      await loadAll();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Unable to create code.");
    }
  };

  const toggleCode = async (code: ToolCode) => {
    try {
      await apiFetch("/api/brand-tool/admin/codes", {
        method: "PATCH",
        body: JSON.stringify({ id: code.id, active: !code.active }),
      });
      await loadAll();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Unable to update code.");
    }
  };

  const updateSubmissionStatus = async (submission: ToolSubmission, status: ToolSubmission["status"]) => {
    try {
      await apiFetch("/api/brand-tool/admin/submissions", {
        method: "PATCH",
        body: JSON.stringify({ id: submission.id, status }),
      });
      await loadAll();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Unable to update submission.");
    }
  };

  const exportCsv = () => {
    const rows = [
      ["Submitted At", "Client Name", "Client Email", "Company", "Code", "Status", "Brand Direction", "Tagline"],
      ...submissions.map((item) => [
        formatDate(item.createdAt),
        item.clientName,
        item.clientEmail,
        item.clientCompany,
        item.codeLabel,
        item.status,
        item.brief?.summary?.voice || "",
        item.brief?.summary?.tagline || "",
      ]),
    ];

    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `axiom-brand-tool-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const activeCodeCount = useMemo(() => codes.filter((item) => item.active).length, [codes]);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] pt-32 px-6 lg:px-16">
        <div className="max-w-lg mx-auto border border-white/10 bg-[#121214] p-8">
          <p className="text-[#D4AF37] text-[11px] uppercase tracking-[0.2em] mb-3" style={{ fontFamily: "'DM Mono', monospace" }}>
            Brand Tool Admin
          </p>
          <h1 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 400 }}>
            Owner Access
          </h1>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-white placeholder-white/25"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            />
            <button
              type="submit"
              className="px-6 py-3 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}
              disabled={loading}
            >
              {loading ? "Checking..." : "Enter Admin"}
            </button>
            {authError && (
              <p className="text-red-400 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>{authError}</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-20 px-6 lg:px-16">
      <div className="max-w-[1300px] mx-auto space-y-8">
        <div className="border border-[#D4AF37]/30 bg-[#121214] px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[#D4AF37] text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "'DM Mono', monospace" }}>
              Brand Tool Back Office
            </p>
            <p className="text-white/70" style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem" }}>
              Active codes: {activeCodeCount} · Submissions: {submissions.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => loadAll()}
              className="px-3 py-2 border border-white/20 text-white/70 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Refresh
            </button>
            <button
              onClick={exportCsv}
              className="px-3 py-2 border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A]"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Export CSV
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem(ADMIN_TOKEN_KEY);
                setToken(null);
              }}
              className="px-3 py-2 border border-white/20 text-white/60"
              style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.04em" }}
            >
              Logout
            </button>
          </div>
        </div>

        {authError && <p className="text-red-400 text-sm">{authError}</p>}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-4 border border-white/10 bg-[#121214] p-6">
            <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500 }}>
              Access Codes
            </h2>

            <form onSubmit={createCode} className="space-y-3 mb-6 border border-white/10 p-4">
              <input
                type="text"
                value={newCodeLabel}
                onChange={(e) => setNewCodeLabel(e.target.value)}
                placeholder="Label"
                className="w-full bg-transparent border border-white/15 px-3 py-2 text-white"
              />
              <input
                type="text"
                value={newCodeCustom}
                onChange={(e) => setNewCodeCustom(e.target.value)}
                placeholder="Custom code (optional)"
                className="w-full bg-transparent border border-white/15 px-3 py-2 text-white"
              />
              <input
                type="number"
                min="1"
                value={newCodeMaxUses}
                onChange={(e) => setNewCodeMaxUses(e.target.value)}
                placeholder="Max uses (optional)"
                className="w-full bg-transparent border border-white/15 px-3 py-2 text-white"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-[#D4AF37] text-[#0A0A0A] font-semibold"
                style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.82rem" }}
              >
                Create Code
              </button>
            </form>

            <div className="space-y-3 max-h-[540px] overflow-y-auto pr-1">
              {codes.map((item) => (
                <div key={item.id} className="border border-white/10 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white" style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.73rem" }}>{item.code}</p>
                    <button
                      onClick={() => toggleCode(item)}
                      className="px-2 py-1 border border-white/20 text-[10px] uppercase tracking-[0.08em]"
                      style={{ color: item.active ? "#D4AF37" : "rgba(255,255,255,0.55)" }}
                    >
                      {item.active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                  <p className="text-white/60 text-xs mt-1">{item.label}</p>
                  <p className="text-white/40 text-[11px] mt-1">Uses: {item.uses}{item.maxUses ? ` / ${item.maxUses}` : ""}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="xl:col-span-8 border border-white/10 bg-[#121214] p-6">
            <h2 className="text-white mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 500 }}>
              Client Submissions
            </h2>
            <div className="space-y-3 max-h-[700px] overflow-y-auto pr-1">
              {submissions.map((item) => (
                <div key={item.id} className="border border-white/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <p className="text-white font-semibold">{item.clientName}</p>
                    <select
                      value={item.status}
                      onChange={(e) => updateSubmissionStatus(item, e.target.value as ToolSubmission["status"])}
                      className="bg-[#0A0A0A] border border-white/20 text-white text-xs px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <p className="text-white/55 text-xs">{item.clientEmail}{item.clientCompany ? ` · ${item.clientCompany}` : ""}</p>
                  <p className="text-white/40 text-[11px] mt-1">{formatDate(item.createdAt)} · {item.codeLabel}</p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(item.brief?.summary || {}).map(([key, value]) => (
                      <div key={key} className="border border-white/10 px-2 py-1.5">
                        <p className="text-[10px] uppercase tracking-[0.08em] text-white/35">{key}</p>
                        <p className="text-xs text-white/70">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {submissions.length === 0 && (
                <p className="text-white/45 text-sm">No submissions yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

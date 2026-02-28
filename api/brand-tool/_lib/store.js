import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const STORE_PATH = process.env.BRAND_TOOL_STORE_PATH || path.join("/tmp", "brand-tool-store.json");
const GITHUB_TOKEN = (process.env.BRAND_TOOL_GITHUB_TOKEN || "").trim();
const GITHUB_OWNER = (process.env.BRAND_TOOL_GITHUB_OWNER || "").trim();
const GITHUB_REPO = (process.env.BRAND_TOOL_GITHUB_REPO || "").trim();
const GITHUB_BRANCH = (process.env.BRAND_TOOL_GITHUB_BRANCH || "main").trim();
const GITHUB_PATH = (process.env.BRAND_TOOL_GITHUB_PATH || "data/brand-tool-store.json").trim();

const DEFAULT_CODES = [
  {
    id: "default-axiom-2026",
    code: "AXIOM2026",
    label: "Default Partner Code",
    active: true,
    maxUses: null,
    uses: 0,
    expiresAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-brand-001",
    code: "BRAND001",
    label: "Legacy Access",
    active: true,
    maxUses: null,
    uses: 0,
    expiresAt: null,
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-partner",
    code: "PARTNER",
    label: "Legacy Access",
    active: true,
    maxUses: null,
    uses: 0,
    expiresAt: null,
    createdAt: new Date().toISOString(),
  },
];

let cache = null;
let cacheSha = null;

const defaultStore = () => ({ codes: DEFAULT_CODES, submissions: [] });

const normalizeStore = (input) => {
  const base = defaultStore();
  if (!input || typeof input !== "object") return base;

  const codes = Array.isArray(input.codes) && input.codes.length > 0 ? input.codes : base.codes;
  const submissions = Array.isArray(input.submissions) ? input.submissions : [];

  return { codes, submissions };
};

const readDiskStore = async () => {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return normalizeStore(JSON.parse(raw));
  } catch {
    return null;
  }
};

const writeDiskStore = async (store) => {
  try {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
    await fs.writeFile(STORE_PATH, JSON.stringify(store), "utf8");
  } catch {
    // Best-effort write in serverless environments.
  }
};

const githubEnabled = Boolean(GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO);

const githubFileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_PATH}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;

const readGitHubStore = async () => {
  const res = await fetch(githubFileUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "axiom-brand-tool-store",
    },
  });

  if (res.status === 404) {
    cacheSha = null;
    return null;
  }

  if (!res.ok) {
    throw new Error(`GitHub store read failed with status ${res.status}`);
  }

  const payload = await res.json();
  cacheSha = payload.sha || null;
  const content = String(payload.content || "").replace(/\n/g, "");
  if (!content) return null;
  const decoded = Buffer.from(content, "base64").toString("utf8");
  return normalizeStore(JSON.parse(decoded));
};

const writeGitHubStore = async (store) => {
  const body = {
    message: "chore: update brand tool store",
    content: Buffer.from(JSON.stringify(store), "utf8").toString("base64"),
    branch: GITHUB_BRANCH,
    ...(cacheSha ? { sha: cacheSha } : {}),
  };

  const res = await fetch(githubFileUrl.replace(`?ref=${encodeURIComponent(GITHUB_BRANCH)}`, ""), {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "axiom-brand-tool-store",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub store write failed with status ${res.status}: ${txt}`);
  }

  const payload = await res.json();
  cacheSha = payload?.content?.sha || cacheSha;
};

export const sanitizeCode = (raw) => String(raw || "").trim().toUpperCase().replace(/\s+/g, "");

export const generateCode = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const chunk = Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  const chunk2 = Array.from({ length: 4 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `AX-${chunk}-${chunk2}`;
};

export const getStore = async () => {
  if (githubEnabled) {
    try {
      const remote = await readGitHubStore();
      cache = remote || defaultStore();
      return cache;
    } catch {
      // Fall through to local fallback if GitHub is temporarily unavailable.
    }
  }

  if (cache) return cache;
  const disk = await readDiskStore();
  cache = disk || defaultStore();
  return cache;
};

export const saveStore = async (store) => {
  cache = store;
  if (githubEnabled) {
    try {
      await writeGitHubStore(store);
      return;
    } catch {
      // Continue to local fallback write for resiliency.
    }
  }
  await writeDiskStore(store);
};

export const getCodeByValue = (codes, input) => {
  const normalized = sanitizeCode(input);
  return codes.find((item) => item.code === normalized);
};

export const isCodeUsable = (code) => {
  if (!code?.active) return false;
  if (code.expiresAt && new Date(code.expiresAt).getTime() <= Date.now()) return false;
  if (typeof code.maxUses === "number" && code.maxUses >= 0 && code.uses >= code.maxUses) return false;
  return true;
};

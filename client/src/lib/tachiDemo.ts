export type TachiDemoContext = {
  kind: "url" | "prompt";
  identity: string;
  resultKey: "source" | "brief";
  resultValue: string;
};

export function canRunTachiDemo(value: string) {
  return value.trim().length >= 3;
}

export function getTachiDemoContext(value: string): TachiDemoContext {
  const trimmed = value.trim();
  const looksLikeUrl = /^(https?:\/\/|(?:[\w-]+\.)+[a-z]{2,}(?:\/|$))/i.test(trimmed);
  if (!looksLikeUrl) {
    return { kind: "prompt", identity: "research brief", resultKey: "brief", resultValue: trimmed || "Prompt pending" };
  }
  try {
    const host = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`).hostname.replace(/^www\./, "");
    return { kind: "url", identity: host, resultKey: "source", resultValue: host };
  } catch {
    return { kind: "prompt", identity: "research brief", resultKey: "brief", resultValue: trimmed || "Prompt pending" };
  }
}

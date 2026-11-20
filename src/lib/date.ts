const HOUR = 60 * 60 * 1000;// 1時間のミリ秒数

export type Urgency = "overdue" | "soon" | "normal" | "none";//締め切りの緊急度を表す型

export function getUrgency(dueAt: string | null, now = Date.now()): Urgency {// 締め切りの緊急度を返す関数
  if (dueAt === null) return "none";
  const diff = new Date(dueAt).getTime() - now;
  if (diff < 0) return "overdue";
  if (diff < 24 * HOUR) return "soon";
  return "normal";
}

export function formatDue(dueAt: string | null): string {
  if (dueAt === null) return "期限なし";
  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dueAt));
}

export function formatRemaining(dueAt: string | null, now = Date.now()): string {
  if (dueAt === null) return "";
  const diff = new Date(dueAt).getTime() - now;
  const abs = Math.abs(diff);
  const hours = Math.floor(abs / HOUR);
  const text =
    hours >= 24 ? `${Math.floor(hours / 24)}日` : `${Math.max(hours, 1)}時間`;
  return diff < 0 ? `${text}超過` : `あと${text}`;
}

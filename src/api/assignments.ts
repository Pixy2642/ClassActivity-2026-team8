import type { Assignment, AssignmentSource } from "../types";
import { mockSources } from "./mockSources";

/** 使う取得元の一覧。実装ができたらここを差し替える */
export const sources: AssignmentSource[] = mockSources;

/** 全取得元から集めて、期限が近い順(期限なしは最後)に並べる */
export async function fetchAllAssignments(): Promise<Assignment[]> {
  const results = await Promise.all(sources.map((s) => s.fetchAssignments()));
  return results.flat().sort((a, b) => {
    if (a.dueAt === b.dueAt) return 0;// 期限が同じ場合は順序を変えない
    if (a.dueAt === null) return 1;// 期限なしは最後にする
    if (b.dueAt === null) return -1;// 期限なしは最後にする
    return new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime();
  });
}

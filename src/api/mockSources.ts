import type { Assignment, AssignmentSource } from "../types";

const HOUR = 60 * 60 * 1000;
const iso = (offsetHours: number) =>               // 現在時刻からのオフセットを指定してISO 8601形式の文字列を返す関数
  new Date(Date.now() + offsetHours * HOUR).toISOString();

/** ダミーデータ。実APIに差し替えるまでの仮の取得元 */
const mockAssignments: Assignment[] = [
  {
    id: "wc-1",
    source: "webclass",
    courseName: "線形代数学",
    title: "第5回 演習レポート",
    dueAt: iso(5),
    submitted: false,
    url: "https://example.com/webclass/linear-algebra/5",
  },
  {
    id: "gc-1",
    source: "classroom",
    courseName: "プログラミング演習",
    title: "課題3: 配列と関数",
    dueAt: iso(30),
    submitted: false,
    url: "https://classroom.google.com/",
  },
  {
    id: "wc-2",
    source: "webclass",
    courseName: "英語コミュニケーション",
    title: "リーディング課題 Unit 4",
    dueAt: iso(24 * 4),
    submitted: true,
    url: "https://example.com/webclass/english/4",
  },
  {
    id: "gc-2",
    source: "classroom",
    courseName: "データ構造",
    title: "期末レポート(テーマ自由)",
    dueAt: iso(24 * 12),//
    submitted: false,
    url: "https://classroom.google.com/",
  },
  {
    id: "wc-3",
    source: "webclass",
    courseName: "統計学",
    title: "小テスト復習プリント",
    dueAt: iso(-20),
    submitted: false,
    url: "https://example.com/webclass/statistics/quiz",
  },
  {
    id: "gc-3",
    source: "classroom",
    courseName: "ゼミ",
    title: "文献紹介の準備",
    dueAt: null,
    submitted: false,
    url: "https://classroom.google.com/",
  },
];

export const mockSources: AssignmentSource[] = [
  {
    id: "webclass",
    fetchAssignments: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockAssignments.filter((a) => a.source === "webclass");
    },
  },
  {
    id: "classroom",
    fetchAssignments: async () => {
      await new Promise((r) => setTimeout(r, 400));
      return mockAssignments.filter((a) => a.source === "classroom");
    },
  },
];

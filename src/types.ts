export type AssignmentSourceId = "webclass" | "classroom";

export interface Assignment {
  id: string;
  source: AssignmentSourceId;
  courseName: string;
  title: string;
  /** ISO 8601。期限なしは null */
  dueAt: string | null;
  submitted: boolean;
  /** 提出先サイトのURL(ここから自分で提出する) */
  url: string;
}

/** 課題の取得元。WebClass / Classroom の実装はこのインターフェースに合わせて差し替える */
export interface AssignmentSource {
  id: AssignmentSourceId;
  fetchAssignments(): Promise<Assignment[]>;
}

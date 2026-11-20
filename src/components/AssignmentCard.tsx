import type { Assignment } from "../types";
import { formatDue, formatRemaining, getUrgency } from "../lib/date";

const sourceLabel = {
  webclass: "WebClass",
  classroom: "Classroom",
} as const;

const urgencyStyle = {
  overdue: "bg-red-100 text-red-700",
  soon: "bg-amber-100 text-amber-800",
  normal: "bg-slate-100 text-slate-600",
  none: "bg-slate-100 text-slate-500",
} as const;

export function AssignmentCard({ assignment }: { assignment: Assignment }) {
  const urgency = assignment.submitted
    ? "normal"
    : getUrgency(assignment.dueAt);

  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-slate-500">
            {assignment.courseName} ・ {sourceLabel[assignment.source]}
          </p>
          <h3
            className={`mt-1 font-semibold ${
              assignment.submitted ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {assignment.title}
          </h3>
        </div>
        {assignment.submitted && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
            提出済み
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${urgencyStyle[urgency]}`}
        >
          {formatDue(assignment.dueAt)}
          {!assignment.submitted && assignment.dueAt && (
            <> ・ {formatRemaining(assignment.dueAt)}</>
          )}
        </span>
        <a
          href={assignment.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          提出ページを開く
        </a>
      </div>
    </li>
  );
}

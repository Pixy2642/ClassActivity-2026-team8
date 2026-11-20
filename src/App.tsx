import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllAssignments } from "./api/assignments";
import { AssignmentCard } from "./components/AssignmentCard";
import type { AssignmentSourceId } from "./types";

type SourceFilter = AssignmentSourceId | "all";

const filters: { value: SourceFilter; label: string }[] = [
  { value: "all", label: "すべて" },
  { value: "webclass", label: "WebClass" },
  { value: "classroom", label: "Classroom" },
];

export default function App() {
  const [source, setSource] = useState<SourceFilter>("all");
  const [hideSubmitted, setHideSubmitted] = useState(true);

  const { data, isPending, isError, refetch, isFetching } = useQuery({
    queryKey: ["assignments"],
    queryFn: fetchAllAssignments,
  });

  const visible = useMemo(
    () =>
      (data ?? []).filter(
        (a) =>
          (source === "all" || a.source === source) &&
          (!hideSubmitted || !a.submitted),
      ),
    [data, source, hideSubmitted],
  );

  return (
    <div className="mx-auto min-h-screen max-w-2xl bg-slate-50 px-4 py-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">課題ボード</h1>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
        >
          {isFetching ? "更新中…" : "更新"}
        </button>
      </header>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setSource(f.value)}
            className={`rounded-full px-3 py-1 text-sm ${
              source === f.value
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-700 ring-1 ring-slate-300 hover:bg-slate-100"
            }`}
          >
            {f.label}
          </button>
        ))}
        <label className="ml-auto flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={hideSubmitted}
            onChange={(e) => setHideSubmitted(e.target.checked)}
          />
          提出済みを隠す
        </label>
      </div>

      <main className="mt-4">
        {isPending && <p className="text-slate-500">読み込み中…</p>}
        {isError && (
          <p className="text-red-600">課題の取得に失敗しました。</p>
        )}
        {!isPending && !isError && visible.length === 0 && (
          <p className="text-slate-500">表示する課題はありません。</p>
        )}
        <ul className="space-y-3">
          {visible.map((a) => (
            <AssignmentCard key={a.id} assignment={a} />
          ))}
        </ul>
      </main>
    </div>
  );
}

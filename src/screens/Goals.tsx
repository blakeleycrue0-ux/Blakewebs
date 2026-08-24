import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "../lib/store";
import { goalProgress } from "../lib/selectors";
import GoalCard from "../components/GoalCard";
import GoalSheet from "../components/GoalSheet";
import GoalDetailSheet from "../components/GoalDetailSheet";
import EmptyState from "../components/EmptyState";

export default function Goals() {
  const { state } = useStore();
  const [detailGoalId, setDetailGoalId] = useState<string | undefined>();
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  const progress = useMemo(
    () => goalProgress(state.goals, state.contributions),
    [state.goals, state.contributions]
  );

  const editingGoal = state.goals.find((g) => g.id === detailGoalId);

  return (
    <div className="px-5 pt-6 pb-28 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-[22px] font-semibold" style={{ color: "var(--text)" }}>
          Goals
        </h1>
        <button
          type="button"
          onClick={() => setAddSheetOpen(true)}
          aria-label="New goal"
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "var(--bg)" }}
        >
          <Plus className="w-4 h-4" style={{ color: "var(--text)" }} />
        </button>
      </div>

      {progress.length === 0 ? (
        <EmptyState
          title="No goals yet"
          subtitle="Save toward a trip, a gift, or anything you want."
          action={
            <button
              type="button"
              onClick={() => setAddSheetOpen(true)}
              className="rounded-full px-6 py-3 text-[14px] font-semibold"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              Create your first goal
            </button>
          }
        />
      ) : (
        <div className="flex flex-col gap-2.5">
          {progress.map((g) => (
            <GoalCard key={g.id} goal={g} onClick={() => setDetailGoalId(g.id)} />
          ))}
        </div>
      )}

      <GoalDetailSheet
        open={Boolean(detailGoalId)}
        onClose={() => setDetailGoalId(undefined)}
        goalId={detailGoalId}
        onEdit={() => {
          setEditSheetOpen(true);
        }}
      />
      <GoalSheet
        open={editSheetOpen}
        onClose={() => setEditSheetOpen(false)}
        goal={editingGoal}
      />
      <GoalSheet open={addSheetOpen} onClose={() => setAddSheetOpen(false)} />
    </div>
  );
}

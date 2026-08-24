import type { AppState, Category, Contribution, Expense, SavingsGoal } from "./types";
import { isSameMonth } from "./format";

export function expensesForMonth(state: AppState, reference: Date): Expense[] {
  return state.expenses.filter((e) => isSameMonth(e.date, reference));
}

export function totalSpent(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function spentForCategory(expenses: Expense[], categoryId: string): number {
  return expenses
    .filter((e) => e.categoryId === categoryId)
    .reduce((sum, e) => sum + e.amount, 0);
}

export type CategoryProgress = Category & {
  spent: number;
  remaining: number;
  ratio: number;
  isOver: boolean;
};

export function categoryProgress(
  categories: Category[],
  expenses: Expense[]
): CategoryProgress[] {
  return categories.map((c) => {
    const spent = spentForCategory(expenses, c.id);
    const remaining = c.budget - spent;
    const ratio = c.budget > 0 ? Math.min(spent / c.budget, 1) : 0;
    return { ...c, spent, remaining, ratio, isOver: remaining < 0 };
  });
}

export type GoalProgress = SavingsGoal & {
  saved: number;
  remaining: number;
  ratio: number;
  isComplete: boolean;
  daysLeft: number | null;
};

export function savedForGoal(contributions: Contribution[], goalId: string): number {
  return contributions
    .filter((c) => c.goalId === goalId)
    .reduce((sum, c) => sum + c.amount, 0);
}

export function goalProgress(
  goals: SavingsGoal[],
  contributions: Contribution[]
): GoalProgress[] {
  return goals.map((g) => {
    const saved = savedForGoal(contributions, g.id);
    const remaining = Math.max(g.targetAmount - saved, 0);
    const ratio = g.targetAmount > 0 ? Math.min(saved / g.targetAmount, 1) : 0;
    let daysLeft: number | null = null;
    if (g.targetDate) {
      const ms = new Date(g.targetDate).getTime() - Date.now();
      daysLeft = Math.ceil(ms / (1000 * 60 * 60 * 24));
    }
    return { ...g, saved, remaining, ratio, isComplete: saved >= g.targetAmount, daysLeft };
  });
}

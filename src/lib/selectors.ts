import type { AppState, Category, Expense } from "./types";
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

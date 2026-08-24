import type { AppState, Category, Expense } from "./types";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + (n % 6), 15, 0, 0);
  return d.toISOString();
}

const CATEGORIES: Category[] = [
  { id: "cat-groceries", name: "Groceries", icon: "groceries", budget: 300 },
  { id: "cat-eating-out", name: "Eating out", icon: "eatingOut", budget: 150 },
  { id: "cat-transport", name: "Transport", icon: "transport", budget: 100 },
  { id: "cat-shopping", name: "Shopping", icon: "shopping", budget: 200 },
  {
    id: "cat-entertainment",
    name: "Entertainment",
    icon: "entertainment",
    budget: 80,
  },
  { id: "cat-bills", name: "Bills", icon: "bills", budget: 150 },
  { id: "cat-health", name: "Health", icon: "health", budget: 60 },
  { id: "cat-other", name: "Other", icon: "other", budget: 50 },
];

const EXPENSES: Omit<Expense, "id">[] = [
  { categoryId: "cat-groceries", amount: 34.72, merchant: "Mercadona", date: daysAgo(0) },
  { categoryId: "cat-transport", amount: 12.4, merchant: "Uber", date: daysAgo(0) },
  { categoryId: "cat-eating-out", amount: 18.5, merchant: "Glovo", date: daysAgo(0), note: "Lunch" },

  { categoryId: "cat-entertainment", amount: 12.99, merchant: "Netflix", date: daysAgo(1) },
  { categoryId: "cat-shopping", amount: 54.0, merchant: "Zara", date: daysAgo(1) },
  { categoryId: "cat-transport", amount: 15.6, merchant: "Uber", date: daysAgo(1) },

  { categoryId: "cat-groceries", amount: 52.1, merchant: "Carrefour", date: daysAgo(3) },
  { categoryId: "cat-shopping", amount: 20.0, merchant: "Amazon", date: daysAgo(3) },
  { categoryId: "cat-transport", amount: 29.0, merchant: "Renfe", date: daysAgo(4) },
  { categoryId: "cat-health", amount: 14.5, merchant: "Farmacia Central", date: daysAgo(4) },

  { categoryId: "cat-eating-out", amount: 22.0, merchant: "Glovo", date: daysAgo(2), note: "Dinner" },
  { categoryId: "cat-eating-out", amount: 37.5, merchant: "La Tasca", date: daysAgo(5) },
  { categoryId: "cat-entertainment", amount: 10.99, merchant: "Spotify", date: daysAgo(5) },

  { categoryId: "cat-groceries", amount: 29.3, merchant: "Mercadona", date: daysAgo(6) },
  { categoryId: "cat-other", amount: 6.9, merchant: "Correos", date: daysAgo(6) },

  { categoryId: "cat-bills", amount: 68.0, merchant: "Iberdrola", date: daysAgo(7) },
  { categoryId: "cat-bills", amount: 45.0, merchant: "Movistar", date: daysAgo(8) },
  { categoryId: "cat-other", amount: 82.5, merchant: "IKEA", date: daysAgo(9) },
];

export function createSeedState(): AppState {
  return {
    initialized: true,
    userName: "Alex",
    monthlyBudget: 1200,
    categories: CATEGORIES,
    expenses: EXPENSES.map((e, i) => ({ ...e, id: `exp-seed-${i}` })),
    theme: "system",
  };
}

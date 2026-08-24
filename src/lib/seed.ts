import type { AppState, Category, Contribution, Expense, SavingsGoal } from "./types";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(9 + (n % 6), 15, 0, 0);
  return d.toISOString();
}

export function createEmptyState(): AppState {
  return {
    authUser: null,
    initialized: false,
    userName: "",
    monthlyBudget: 0,
    categories: [],
    expenses: [],
    goals: [],
    contributions: [],
    theme: "system",
  };
}

const DEMO_CATEGORIES: Category[] = [
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

const DEMO_EXPENSES: Omit<Expense, "id">[] = [
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

const DEMO_GOALS: SavingsGoal[] = [
  { id: "goal-lisbon", name: "Trip to Lisbon", emoji: "✈️", targetAmount: 900, targetDate: daysAgo(-70) },
  { id: "goal-laptop", name: "New laptop", emoji: "💻", targetAmount: 1200 },
  { id: "goal-emergency", name: "Emergency fund", emoji: "🏥", targetAmount: 2000 },
];

const DEMO_CONTRIBUTIONS: Omit<Contribution, "id">[] = [
  { goalId: "goal-lisbon", amount: 200, date: daysAgo(28) },
  { goalId: "goal-lisbon", amount: 150, date: daysAgo(14) },
  { goalId: "goal-lisbon", amount: 100, date: daysAgo(2), note: "Sold old bike" },
  { goalId: "goal-laptop", amount: 300, date: daysAgo(20) },
  { goalId: "goal-emergency", amount: 500, date: daysAgo(40) },
  { goalId: "goal-emergency", amount: 250, date: daysAgo(10) },
];

export function createDemoState(): AppState {
  return {
    authUser: { provider: "email", name: "Alex Rivera", email: "alex@example.com", initials: "AR" },
    initialized: true,
    userName: "Alex",
    monthlyBudget: 1200,
    categories: DEMO_CATEGORIES,
    expenses: DEMO_EXPENSES.map((e, i) => ({ ...e, id: `exp-demo-${i}` })),
    goals: DEMO_GOALS,
    contributions: DEMO_CONTRIBUTIONS.map((c, i) => ({ ...c, id: `contrib-demo-${i}` })),
    theme: "system",
  };
}

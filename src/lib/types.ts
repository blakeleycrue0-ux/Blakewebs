export type IconKey =
  | "groceries"
  | "eatingOut"
  | "transport"
  | "shopping"
  | "entertainment"
  | "bills"
  | "health"
  | "other";

export type Category = {
  id: string;
  name: string;
  icon: IconKey;
  budget: number;
};

export type Expense = {
  id: string;
  categoryId: string;
  amount: number;
  merchant: string;
  note?: string;
  date: string; // ISO timestamp
};

export type Theme = "light" | "dark" | "system";

export type AppState = {
  initialized: boolean;
  userName: string;
  monthlyBudget: number;
  categories: Category[];
  expenses: Expense[];
  theme: Theme;
};

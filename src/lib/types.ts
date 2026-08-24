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

export type AuthProvider = "google" | "email";

export type AuthUser = {
  provider: AuthProvider;
  name: string;
  email: string;
  initials: string;
};

export type GoalEmoji =
  | "✈️"
  | "🏖️"
  | "🎁"
  | "🏠"
  | "🚗"
  | "💍"
  | "🎓"
  | "💻"
  | "🏥"
  | "🐣";

export type SavingsGoal = {
  id: string;
  name: string;
  emoji: GoalEmoji;
  targetAmount: number;
  targetDate?: string; // ISO date, optional
};

export type Contribution = {
  id: string;
  goalId: string;
  amount: number;
  note?: string;
  date: string; // ISO timestamp
};

export type AppState = {
  authUser: AuthUser | null;
  initialized: boolean;
  userName: string;
  monthlyBudget: number;
  categories: Category[];
  expenses: Expense[];
  goals: SavingsGoal[];
  contributions: Contribution[];
  theme: Theme;
};

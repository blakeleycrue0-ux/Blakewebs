import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AppState,
  AuthUser,
  Category,
  Contribution,
  Expense,
  IconKey,
  SavingsGoal,
  Theme,
} from "./types";
import { createEmptyState, createDemoState } from "./seed";

const STORAGE_KEY = "pace-state-v2";

function loadState(): AppState {
  if (typeof window === "undefined") return createEmptyState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw) as Partial<AppState>;
    if (!parsed || typeof parsed !== "object") return createEmptyState();
    return { ...createEmptyState(), ...parsed };
  } catch {
    return createEmptyState();
  }
}

function uid(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type Action =
  | { type: "LOGIN"; payload: AuthUser }
  | { type: "LOGOUT" }
  | { type: "LOAD_DEMO" }
  | { type: "ADD_EXPENSE"; payload: Omit<Expense, "id"> }
  | { type: "EDIT_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: { id: string } }
  | { type: "ADD_CATEGORY"; payload: { name: string; icon: IconKey; budget: number } }
  | { type: "EDIT_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: { id: string } }
  | { type: "ADD_GOAL"; payload: Omit<SavingsGoal, "id"> }
  | { type: "EDIT_GOAL"; payload: SavingsGoal }
  | { type: "DELETE_GOAL"; payload: { id: string } }
  | { type: "ADD_CONTRIBUTION"; payload: Omit<Contribution, "id"> }
  | { type: "DELETE_CONTRIBUTION"; payload: { id: string } }
  | { type: "SET_MONTHLY_BUDGET"; payload: number }
  | { type: "SET_USER_NAME"; payload: string }
  | { type: "SET_THEME"; payload: Theme }
  | {
      type: "COMPLETE_ONBOARDING";
      payload: {
        monthlyBudget: number;
        categories: Category[];
        userName: string;
        goal?: Omit<SavingsGoal, "id">;
      };
    }
  | { type: "RESET" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authUser: action.payload };
    case "LOGOUT":
      return { ...state, authUser: null };
    case "LOAD_DEMO":
      return createDemoState();
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [{ ...action.payload, id: uid("exp") }, ...state.expenses],
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((e) =>
          e.id === action.payload.id ? action.payload : e
        ),
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload.id),
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [
          ...state.categories,
          { ...action.payload, id: uid("cat") },
        ],
      };
    case "EDIT_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };
    case "DELETE_CATEGORY": {
      const fallback = state.categories.find(
        (c) => c.id !== action.payload.id && c.icon === "other"
      );
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.payload.id),
        expenses: fallback
          ? state.expenses.map((e) =>
              e.categoryId === action.payload.id
                ? { ...e, categoryId: fallback.id }
                : e
            )
          : state.expenses.filter((e) => e.categoryId !== action.payload.id),
      };
    }
    case "ADD_GOAL":
      return { ...state, goals: [...state.goals, { ...action.payload, id: uid("goal") }] };
    case "EDIT_GOAL":
      return {
        ...state,
        goals: state.goals.map((g) => (g.id === action.payload.id ? action.payload : g)),
      };
    case "DELETE_GOAL":
      return {
        ...state,
        goals: state.goals.filter((g) => g.id !== action.payload.id),
        contributions: state.contributions.filter((c) => c.goalId !== action.payload.id),
      };
    case "ADD_CONTRIBUTION":
      return {
        ...state,
        contributions: [{ ...action.payload, id: uid("contrib") }, ...state.contributions],
      };
    case "DELETE_CONTRIBUTION":
      return {
        ...state,
        contributions: state.contributions.filter((c) => c.id !== action.payload.id),
      };
    case "SET_MONTHLY_BUDGET":
      return { ...state, monthlyBudget: action.payload };
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "COMPLETE_ONBOARDING":
      return {
        ...state,
        initialized: true,
        monthlyBudget: action.payload.monthlyBudget,
        categories: action.payload.categories,
        userName: action.payload.userName,
        expenses: [],
        goals: action.payload.goal
          ? [{ ...action.payload.goal, id: uid("goal") }]
          : [],
        contributions: [],
      };
    case "RESET":
      return { ...createEmptyState(), theme: state.theme };
    default:
      return state;
  }
}

type StoreValue = {
  state: AppState;
  login: (user: AuthUser) => void;
  logout: () => void;
  loadDemo: () => void;
  addExpense: (expense: Omit<Expense, "id">) => void;
  editExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: { name: string; icon: IconKey; budget: number }) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addGoal: (goal: Omit<SavingsGoal, "id">) => void;
  editGoal: (goal: SavingsGoal) => void;
  deleteGoal: (id: string) => void;
  addContribution: (contribution: Omit<Contribution, "id">) => void;
  deleteContribution: (id: string) => void;
  setMonthlyBudget: (value: number) => void;
  setUserName: (value: string) => void;
  setTheme: (value: Theme) => void;
  completeOnboarding: (payload: {
    monthlyBudget: number;
    categories: Category[];
    userName: string;
    goal?: Omit<SavingsGoal, "id">;
  }) => void;
  reset: () => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", state.theme);
    }
  }, [state.theme]);

  const value = useMemo<StoreValue>(
    () => ({
      state,
      login: (user) => dispatch({ type: "LOGIN", payload: user }),
      logout: () => dispatch({ type: "LOGOUT" }),
      loadDemo: () => dispatch({ type: "LOAD_DEMO" }),
      addExpense: (expense) => dispatch({ type: "ADD_EXPENSE", payload: expense }),
      editExpense: (expense) => dispatch({ type: "EDIT_EXPENSE", payload: expense }),
      deleteExpense: (id) => dispatch({ type: "DELETE_EXPENSE", payload: { id } }),
      addCategory: (category) => dispatch({ type: "ADD_CATEGORY", payload: category }),
      editCategory: (category) => dispatch({ type: "EDIT_CATEGORY", payload: category }),
      deleteCategory: (id) => dispatch({ type: "DELETE_CATEGORY", payload: { id } }),
      addGoal: (goal) => dispatch({ type: "ADD_GOAL", payload: goal }),
      editGoal: (goal) => dispatch({ type: "EDIT_GOAL", payload: goal }),
      deleteGoal: (id) => dispatch({ type: "DELETE_GOAL", payload: { id } }),
      addContribution: (contribution) =>
        dispatch({ type: "ADD_CONTRIBUTION", payload: contribution }),
      deleteContribution: (id) => dispatch({ type: "DELETE_CONTRIBUTION", payload: { id } }),
      setMonthlyBudget: (value) => dispatch({ type: "SET_MONTHLY_BUDGET", payload: value }),
      setUserName: (value) => dispatch({ type: "SET_USER_NAME", payload: value }),
      setTheme: (value) => dispatch({ type: "SET_THEME", payload: value }),
      completeOnboarding: (payload) =>
        dispatch({ type: "COMPLETE_ONBOARDING", payload }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

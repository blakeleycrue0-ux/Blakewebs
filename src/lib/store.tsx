import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { AppState, Category, Expense, IconKey, Theme } from "./types";
import { createSeedState } from "./seed";

const STORAGE_KEY = "pace-state-v1";

function loadState(): AppState {
  if (typeof window === "undefined") return createSeedState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createSeedState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed || typeof parsed !== "object" || !Array.isArray(parsed.categories)) {
      return createSeedState();
    }
    return parsed;
  } catch {
    return createSeedState();
  }
}

function uid(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type Action =
  | { type: "ADD_EXPENSE"; payload: Omit<Expense, "id"> }
  | { type: "EDIT_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: { id: string } }
  | { type: "ADD_CATEGORY"; payload: { name: string; icon: IconKey; budget: number } }
  | { type: "EDIT_CATEGORY"; payload: Category }
  | { type: "DELETE_CATEGORY"; payload: { id: string } }
  | { type: "SET_MONTHLY_BUDGET"; payload: number }
  | { type: "SET_USER_NAME"; payload: string }
  | { type: "SET_THEME"; payload: Theme }
  | {
      type: "COMPLETE_ONBOARDING";
      payload: { monthlyBudget: number; categories: Category[]; userName: string };
    }
  | { type: "RESET" };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
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
      };
    case "RESET":
      return {
        initialized: false,
        userName: "",
        monthlyBudget: 0,
        categories: [],
        expenses: [],
        theme: state.theme,
      };
    default:
      return state;
  }
}

type StoreValue = {
  state: AppState;
  addExpense: (expense: Omit<Expense, "id">) => void;
  editExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: { name: string; icon: IconKey; budget: number }) => void;
  editCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  setMonthlyBudget: (value: number) => void;
  setUserName: (value: string) => void;
  setTheme: (value: Theme) => void;
  completeOnboarding: (payload: {
    monthlyBudget: number;
    categories: Category[];
    userName: string;
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
      addExpense: (expense) => dispatch({ type: "ADD_EXPENSE", payload: expense }),
      editExpense: (expense) => dispatch({ type: "EDIT_EXPENSE", payload: expense }),
      deleteExpense: (id) => dispatch({ type: "DELETE_EXPENSE", payload: { id } }),
      addCategory: (category) => dispatch({ type: "ADD_CATEGORY", payload: category }),
      editCategory: (category) => dispatch({ type: "EDIT_CATEGORY", payload: category }),
      deleteCategory: (id) => dispatch({ type: "DELETE_CATEGORY", payload: { id } }),
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

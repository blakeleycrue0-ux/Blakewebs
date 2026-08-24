import {
  ShoppingBasket,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Clapperboard,
  Receipt,
  HeartPulse,
  CircleDashed,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "./types";

export const ICONS: Record<IconKey, LucideIcon> = {
  groceries: ShoppingBasket,
  eatingOut: UtensilsCrossed,
  transport: Car,
  shopping: ShoppingBag,
  entertainment: Clapperboard,
  bills: Receipt,
  health: HeartPulse,
  other: CircleDashed,
};

export const ICON_OPTIONS: { key: IconKey; label: string }[] = [
  { key: "groceries", label: "Groceries" },
  { key: "eatingOut", label: "Eating out" },
  { key: "transport", label: "Transport" },
  { key: "shopping", label: "Shopping" },
  { key: "entertainment", label: "Entertainment" },
  { key: "bills", label: "Bills" },
  { key: "health", label: "Health" },
  { key: "other", label: "Other" },
];

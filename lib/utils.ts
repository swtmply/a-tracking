import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMonthQuarter(date: Date): string {
  const quarter = Math.ceil(date.getDate() / 17);
  return `${format(date, "MMMM")}-${quarter < 15 ? "0" + quarter : quarter}`;
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function enumToOptions<T extends Record<string, string | number>>(
  e: T
): { label: string; value: number }[] {
  return Object.values(e)
    .filter((v) => typeof v === "number")
    .map((v) => ({ label: e[v as keyof T] as string, value: v as number }));
}

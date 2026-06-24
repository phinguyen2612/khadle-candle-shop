import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function isValidPhone(phone: string) {
  return /^(0|\+84)[0-9\s.-]{8,13}$/.test(phone.trim());
}

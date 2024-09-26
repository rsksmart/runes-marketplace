import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export async function copyToClipboard(string: string) {
  await navigator.clipboard.writeText(string);
}


export const toastStyle = {
  background: "#333",
  color: "#fff",
  padding: "10px",
  borderRadius: "10px",
};

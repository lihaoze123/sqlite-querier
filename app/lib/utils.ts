import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 

export function exportFile(file: ArrayBuffer, fileName: string) {
  const blob = new Blob([file], { type: 'application/x-sqlite3' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.style.display = 'none';
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}

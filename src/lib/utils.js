import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date, options = {}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(dateObj);
}

export function formatTime(date) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function getProgressPercentage(completed, total) {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

export function getProgressStatus(percentage) {
  if (percentage === 0) return 'not-started';
  if (percentage === 100) return 'completed';
  return 'in-progress';
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function calculateScore(correct, total) {
  if (total === 0) return 0;
  return Math.round((correct / total) * 100);
}

export function getScoreColor(score) {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-500';
}

export function getProgressColor(percentage) {
  if (percentage === 100) return 'bg-green-500';
  if (percentage > 0) return 'bg-yellow-500';
  return 'bg-gray-300';
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function getRandomColor() {
  const colors = [
    '#8347ff', '#6616e3', '#7524f7',
    '#3b82f6', '#2563eb', '#1d4ed8',
    '#10b981', '#059669', '#047857',
    '#f59e0b', '#d97706', '#b45309',
    '#ef4444', '#dc2626', '#b91c1c',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================================
// Sporting CP - Utility Functions
// ============================================================

// Combine class names (simplified version without clsx/tailwind-merge)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Format date to Portuguese locale
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Format date short (e.g., "24 Jun")
export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", {
    day: "numeric",
    month: "short",
  });
}

// Format time (e.g., "20:30")
export function formatTime(time: string): string {
  return time.slice(0, 5);
}

// Get time ago string
export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "ano", seconds: 31536000 },
    { label: "mês", seconds: 2592000 },
    { label: "semana", seconds: 604800 },
    { label: "dia", seconds: 86400 },
    { label: "hora", seconds: 3600 },
    { label: "minuto", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      if (interval.label === "mês") {
        const months = Math.floor(seconds / 2592000);
        return `há ${months} ${months > 1 ? "meses" : "mês"}`;
      }
      return `há ${count} ${count > 1 ? interval.label + "s" : interval.label}`;
    }
  }

  return "agora mesmo";
}

// Get match status text and styling
export function getMatchStatus(status: string): { text: string; color: string } {
  switch (status) {
    case "live":
      return { text: "🔴 AO VIVO", color: "bg-red-500" };
    case "finished":
      return { text: "FINAL", color: "bg-gray-500" };
    case "scheduled":
      return { text: "AGENDADO", color: "bg-blue-500" };
    case "postponed":
      return { text: "ADIADO", color: "bg-yellow-500" };
    default:
      return { text: status, color: "bg-gray-400" };
  }
}

// Get position color for standings
export function getPositionColor(position: number): string {
  if (position <= 1) return "text-sporting-green";
  if (position <= 4) return "text-blue-500";
  return "text-gray-500 dark:text-gray-400";
}

// Get position badge for CL/UCL spots
export function getPositionBadge(position: number): string {
  if (position <= 1) return "🏆";
  if (position <= 4) return "⭐";
  return "";
}

// Get position label (ordinal)
export function getPositionLabel(position: number): string {
  const suffixes: Record<number, string> = {
    1: "º",
    2: "º",
    3: "º",
  };
  return `${position}${suffixes[position] || "º"}`;
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("pt-PT").format(num);
}

// Truncate text to a maximum length
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "...";
}

// Generate initials from name (max 2 chars)
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Get player position color class
export function getPositionColorClass(position: string): string {
  const positions: Record<string, string> = {
    "Guarda-Redes": "text-yellow-500 border-yellow-500",
    "Defesa": "text-blue-500 border-blue-500",
    "Médio": "text-green-500 border-green-500",
    "Avançado": "text-red-500 border-red-500",
  };
  return positions[position] || "text-gray-500";
}

// Group players by position
export function groupByPosition<T extends { position: string }>(players: T[]): Record<string, T[]> {
  return players.reduce(
    (acc, player) => {
      const pos = player.position;
      if (!acc[pos]) acc[pos] = [];
      acc[pos].push(player);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

// Filter matches by status
export function filterMatches<T extends { status: string }>(
  matches: T[],
  filter: "all" | "scheduled" | "finished" | "live"
): T[] {
  if (filter === "all") return matches;
  return matches.filter((m) => m.status === filter);
}

// Simple debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
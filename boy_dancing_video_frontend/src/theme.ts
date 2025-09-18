export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#374151", // Slate-700
    secondary: "#9CA3AF", // Gray-400
    success: "#10B981", // Emerald-500
    error: "#EF4444", // Red-500
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: "#111827", // Gray-900
    border: "#E5E7EB", // Gray-200
    accent: "#6B7280", // Gray-500
  },
  shadows: {
    soft: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
  },
  spacing: (n: number) => `${n * 8}px`,
};

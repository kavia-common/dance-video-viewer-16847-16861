import React, { useMemo, useState } from "react";
import { theme } from "../theme";

type AppShellProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * PUBLIC_INTERFACE
 * AppShell: Minimal responsive application shell with optional sidebar.
 */
export function AppShell({ header, sidebar, children, footer }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const styles = useMemo(() => {
    const gutter = theme.spacing(3);
    return {
      root: {
        minHeight: "100vh",
        background: theme.colors.background,
        color: theme.colors.text,
        fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        display: "flex",
        flexDirection: "column" as const,
      },
      header: {
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `0 ${gutter}`,
        borderBottom: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        position: "sticky" as const,
        top: 0,
        zIndex: 10,
      },
      contentRow: {
        display: "grid",
        gridTemplateColumns: sidebarOpen ? "280px 1fr" : "1fr",
        gap: gutter,
        padding: gutter,
        flex: 1,
      },
      sidebar: {
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.soft,
        minHeight: 300,
        overflow: "hidden",
      },
      main: {
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        boxShadow: theme.shadows.soft,
        minHeight: 400,
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column" as const,
      },
      footer: {
        borderTop: `1px solid ${theme.colors.border}`,
        padding: `${theme.spacing(2)} ${gutter}`,
        background: theme.colors.surface,
      },
      toggleBtn: {
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
        color: theme.colors.primary,
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 14,
        cursor: "pointer",
      },
      // Mobile adjustments
      "@media": `
        @media (max-width: 900px) {
          .content-row {
            grid-template-columns: 1fr !important;
          }
        }
      `,
    };
  }, [sidebarOpen]);

  return (
    <div style={styles.root as React.CSSProperties}>
      <style>{styles["@media"]}</style>
      <header style={styles.header as React.CSSProperties}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              background: theme.colors.success,
              borderRadius: 999,
            }}
          />
          <strong style={{ color: theme.colors.primary }}>
            Ocean Dance Studio
          </strong>
        </div>
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          style={styles.toggleBtn as React.CSSProperties}
          aria-label="Toggle customization sidebar"
        >
          {sidebarOpen ? "Hide" : "Show"} Sidebar
        </button>
      </header>
      <div className="content-row" style={styles.contentRow as React.CSSProperties}>
        {sidebarOpen && <aside style={styles.sidebar as React.CSSProperties}>{sidebar}</aside>}
        <main style={styles.main as React.CSSProperties}>{children}</main>
      </div>
      {footer ? <footer style={styles.footer as React.CSSProperties}>{footer}</footer> : null}
    </div>
  );
}

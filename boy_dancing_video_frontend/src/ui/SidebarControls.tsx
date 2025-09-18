import React, { useMemo } from "react";
import { theme } from "../theme";

/**
 * PUBLIC_INTERFACE
 * SidebarControls: Placeholder customization panel for composition props.
 */
export function SidebarControls({
  values,
  onChange,
}: {
  values: { bgColor: string; primary: string; secondary: string; accent: string };
  onChange: (next: Partial<typeof values>) => void;
}) {
  const styles = useMemo(() => {
    return {
      group: {
        padding: 16,
        display: "flex",
        flexDirection: "column" as const,
        gap: 12,
      },
      label: {
        fontSize: 12,
        color: theme.colors.accent,
      },
      input: {
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.primary,
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 14,
        width: "100%",
      },
      colorRow: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 10,
      },
      swatch: {
        width: 20,
        height: 20,
        borderRadius: 4,
        border: `1px solid ${theme.colors.border}`,
      },
      sectionTitle: {
        marginTop: 6,
        marginBottom: 6,
        fontSize: 13,
        color: theme.colors.primary,
        fontWeight: 600,
      },
      hint: {
        fontSize: 12,
        color: theme.colors.accent,
        lineHeight: 1.4,
      },
    } as const;
  }, []);

  return (
    <div>
      <div style={styles.group as React.CSSProperties}>
        <div style={styles.sectionTitle as React.CSSProperties}>Customize</div>
        <div style={styles.hint as React.CSSProperties}>
          Adjust colors for the dancing animation. Future updates may allow deeper motion control.
        </div>

        {([
          ["Background", "bgColor"],
          ["Primary", "primary"],
          ["Secondary", "secondary"],
          ["Accent", "accent"],
        ] as const).map(([label, key]) => {
          return (
            <div style={styles.colorRow as React.CSSProperties} key={key}>
              <div>
                <div style={styles.label as React.CSSProperties}>{label}</div>
                <input
                  aria-label={`${label} color`}
                  defaultValue={(values as any)[key]}
                  onBlur={(e) => onChange({ [key]: e.target.value } as any)}
                  placeholder="#RRGGBB"
                  style={styles.input as React.CSSProperties}
                />
              </div>
              <div
                style={{
                  ...(styles.swatch as React.CSSProperties),
                  background: (values as any)[key],
                }}
                title={(values as any)[key]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

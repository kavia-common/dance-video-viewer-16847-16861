import React, { useMemo } from "react";
import { theme } from "../theme";

/**
 * PUBLIC_INTERFACE
 * PlayerView: Wraps content for a central player area and minimal controls below.
 * Expects a visual content (the Remotion Composition UI renders separately in Studio).
 *
 * Note: This component must NOT use Remotion hooks, since it is rendered outside of any <Composition/>.
 * Pass width/height/fps/durationInFrames as props if needed for display purposes.
 */
// PUBLIC_INTERFACE
export function PlayerView({
  title,
  children,
  onResolutionChange,
  width = 1920,
  height = 1080,
  fps = 30,
  durationInFrames = 240,
  currentFrame = 0,
}: {
  title?: string;
  children: React.ReactNode;
  onResolutionChange?: (w: number, h: number) => void;
  width?: number;
  height?: number;
  fps?: number;
  durationInFrames?: number;
  currentFrame?: number;
}) {
  const styles = useMemo(() => {
    const safeTotal = Math.max(1, durationInFrames - 1);
    const progressPct = (currentFrame / safeTotal) * 100;

    return {
      container: {
        flex: 1,
        display: "flex",
        flexDirection: "column" as const,
        gap: 16,
      },
      titleBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 10px",
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.sm,
        background: theme.colors.background,
      },
      playerWrap: {
        flex: 1,
        background: `linear-gradient(180deg, #fff, #f3f4f6)`,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      },
      controls: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: 12,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.radius.sm,
        background: theme.colors.background,
      },
      label: {
        fontSize: 12,
        color: theme.colors.accent,
      },
      value: {
        fontSize: 12,
        color: theme.colors.primary,
        fontWeight: 600,
      },
      button: {
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.primary,
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 14,
        cursor: "pointer",
      },
      select: {
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.surface,
        color: theme.colors.primary,
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 14,
      },
      infoGroup: {
        display: "flex",
        alignItems: "center",
        gap: 16,
      },
      track: {
        position: "relative" as const,
        height: 6,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: 999,
        width: "100%",
        overflow: "hidden",
      },
      knob: {
        position: "absolute" as const,
        top: -6,
        width: 16,
        height: 16,
        borderRadius: 999,
        background: theme.colors.primary,
        boxShadow: theme.shadows.soft,
        transform: `translateX(${progressPct}%)`,
      },
      trackFill: {
        position: "absolute" as const,
        left: 0,
        top: 0,
        bottom: 0,
        width: `${progressPct}%`,
        background: theme.colors.secondary,
      },
    } as const;
  }, [durationInFrames, currentFrame]);

  const onSelectResolution = (val: string) => {
    const [w, h] = val.split("x").map((n) => parseInt(n.trim(), 10));
    if (onResolutionChange && !Number.isNaN(w) && !Number.isNaN(h)) {
      onResolutionChange(w, h);
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.titleBar as React.CSSProperties}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: theme.colors.success,
            }}
          />
          <strong style={{ color: theme.colors.primary }}>
            {title || "Boy Dancing Viewer"}
          </strong>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={styles.label as React.CSSProperties}>Resolution</span>
          <select
            defaultValue={`${width}x${height}`}
            onChange={(e) => onSelectResolution(e.target.value)}
            style={styles.select as React.CSSProperties}
            aria-label="Resolution"
          >
            <option value={`${width}x${height}`}>{width}x{height}</option>
            <option value={`1280x720`}>1280x720</option>
            <option value={`1920x1080`}>1920x1080</option>
            <option value={`1080x1080`}>1080x1080</option>
          </select>
        </div>
      </div>

      <div style={styles.playerWrap as React.CSSProperties}>
        {/* The actual composition canvas is rendered by Remotion Studio.
            Here we provide a framed container to align with the required layout. */}
        <div
          style={{
            aspectRatio: `${width} / ${height}`,
            width: "100%",
            maxWidth: 980,
            borderRadius: theme.radius.lg,
            overflow: "hidden",
            border: `1px solid ${theme.colors.border}`,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Player Frame"
        >
          {/* Children can render overlays or preview items if needed */}
          {children}
          <div
            style={{
              position: "absolute",
              bottom: 10,
              right: 10,
              color: "white",
              fontSize: 12,
              opacity: 0.65,
            }}
          >
            {width}x{height} • {fps} fps
          </div>
        </div>
      </div>

      <div style={styles.controls as React.CSSProperties}>
        <div style={{ display: "flex", gap: 8 }}>
          {/* In Remotion Studio, play/pause is native. Here, we present minimalist controls visually. */}
          <button
            type="button"
            style={styles.button as React.CSSProperties}
            title="Play/Pause (use Remotion Studio controls)"
          >
            ▶︎ / ⏸
          </button>
          <button
            type="button"
            style={styles.button as React.CSSProperties}
            title="Restart (use Remotion Studio controls)"
          >
            ↺
          </button>
        </div>

        <div style={{ flex: 1, maxWidth: 600 }}>
          <div style={styles.track as React.CSSProperties} aria-label="Timeline">
            <div style={styles.trackFill as React.CSSProperties} />
            <div style={styles.knob as React.CSSProperties} />
          </div>
        </div>

        <div style={styles.infoGroup as React.CSSProperties}>
          <span style={styles.label as React.CSSProperties}>Frame</span>
          <span style={styles.value as React.CSSProperties}>
            {currentFrame} / {durationInFrames - 1}
          </span>
        </div>
      </div>
    </div>
  );
}

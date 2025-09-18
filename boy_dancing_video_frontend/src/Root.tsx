import React, { useMemo, useState } from "react";
import { Composition, Folder } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { BoyDancing, BoyDancingSchema } from "./compositions/BoyDancing";
import { AppShell } from "./ui/AppShell";
import { PlayerView } from "./ui/PlayerView";
import { SidebarControls } from "./ui/SidebarControls";
import { theme } from "./theme";

// Each <Composition> is an entry in the sidebar, and Remotion Studio renders the player.
// We also add a top-level viewer UI to meet the product layout requirements.

export const RemotionRoot: React.FC = () => {
  const [ui, setUi] = useState({
    width: 1920,
    height: 1080,
    bgColor: "#FFFFFF",
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    accent: theme.colors.success,
  });

  const sidebar = useMemo(
    () => (
      <SidebarControls
        values={{
          bgColor: ui.bgColor,
          primary: ui.primary,
          secondary: ui.secondary,
          accent: ui.accent,
        }}
        onChange={(partial) => setUi((prev) => ({ ...prev, ...partial }))}
      />
    ),
    [ui]
  );

  const footer = useMemo(
    () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ color: theme.colors.accent, fontSize: 12 }}>
          Ocean Professional • Minimalist • Clean lines
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: theme.colors.accent }}>
            Tip: Use Remotion Studio controls (top) to play/pause and scrub.
          </span>
        </div>
      </div>
    ),
    []
  );

  const main = useMemo(
    () => (
      <PlayerView
        title="Boy Dancing Viewer"
        width={ui.width}
        height={ui.height}
        // fps and durationInFrames are display-only; keep defaults or wire up if needed.
        onResolutionChange={(w, h) => setUi((prev) => ({ ...prev, width: w, height: h }))}
      >
        <div style={{ color: "#9CA3AF", fontSize: 12 }}>
          Use Remotion Studio controls to play and scrub.
        </div>
      </PlayerView>
    ),
    [ui.width, ui.height]
  );

  return (
    <>
      {/* Application Shell for layout */}
      <AppShell
        header={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, background: theme.colors.success, borderRadius: 999 }} />
            <span style={{ color: theme.colors.primary, fontWeight: 600 }}>Boy Dancing</span>
          </div>
        }
        sidebar={sidebar}
        footer={footer}
      >
        {main}
      </AppShell>

      {/* Compositions available in Remotion Studio sidebar */}
      <Folder name="Examples">
        <Composition
          id="HelloWorld"
          component={HelloWorld}
          durationInFrames={150}
          fps={30}
          width={ui.width}
          height={ui.height}
          schema={myCompSchema}
          defaultProps={{
            titleText: "Welcome to Remotion",
            titleColor: "#111827",
            logoColor1: "#91EAE4",
            logoColor2: "#86A8E7",
          }}
        />
        <Composition
          id="OnlyLogo"
          component={Logo}
          durationInFrames={150}
          fps={30}
          width={ui.width}
          height={ui.height}
          schema={myCompSchema2}
          defaultProps={{
            logoColor1: "#91dAE2" as const,
            logoColor2: "#86A8E7" as const,
          }}
        />
      </Folder>

      <Folder name="boy-dancing">
        <Composition
          id="BoyDancing"
          component={BoyDancing}
          durationInFrames={240}
          fps={30}
          width={ui.width}
          height={ui.height}
          schema={BoyDancingSchema}
          defaultProps={{
            bgColor: ui.bgColor,
            primary: ui.primary,
            secondary: ui.secondary,
            accent: ui.accent,
          }}
        />
      </Folder>
    </>
  );
};

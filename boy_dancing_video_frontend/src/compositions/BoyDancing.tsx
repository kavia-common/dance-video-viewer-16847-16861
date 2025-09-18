import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

/**
 * A minimal, programmatic "boy dancing" placeholder animation.
 * Replace shapes with actual assets or more advanced animations later.
 */

// PUBLIC_INTERFACE
export const BoyDancingSchema = z.object({
  bgColor: z.string().default("#FFFFFF"),
  primary: z.string().default("#374151"),
  secondary: z.string().default("#9CA3AF"),
  accent: z.string().default("#10B981"),
});

type BoyDancingProps = z.infer<typeof BoyDancingSchema>;

/**
 * PUBLIC_INTERFACE
 * BoyDancing: Simple dancing stick-figure-like animation.
 */
export const BoyDancing: React.FC<BoyDancingProps> = ({
  bgColor,
  primary,
  secondary,
  accent,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entry fade
  const intro = spring({
    fps,
    frame,
    config: { damping: 200, mass: 0.6 },
  });

  // Continuous head bobbing and body sway
  const t = frame / fps;
  const bodySway = Math.sin(t * 2 * Math.PI) * 10; // left-right
  const headBob = Math.sin(t * 3 * Math.PI) * 6; // up-down
  const armSwing = Math.sin(t * 4 * Math.PI) * 22; // arm rotation
  const legStep = Math.sin(t * 2.5 * Math.PI) * 16; // leg rotation

  const outro = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.ease,
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: intro * outro,
      }}
    >
      {/* Ground shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "18%",
          width: 300,
          height: 28,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 70%, rgba(0,0,0,0) 100%)",
          borderRadius: 999,
          filter: "blur(1px)",
        }}
      />

      {/* Dancer container */}
      <div
        style={{
          width: 240,
          height: 360,
          transform: `translateX(${bodySway}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Torso */}
        <div
          style={{
            position: "relative",
            width: 16,
            height: 150,
            background: primary,
            borderRadius: 8,
          }}
        >
          {/* Head */}
          <div
            style={{
              position: "absolute",
              top: -58 + headBob,
              left: "50%",
              transform: "translateX(-50%)",
              width: 64,
              height: 64,
              background: secondary,
              borderRadius: "50%",
              boxShadow: "inset 0 0 0 4px rgba(255,255,255,0.7)",
            }}
          />
          {/* Left Arm */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: -8,
              width: 12,
              height: 96,
              background: accent,
              borderRadius: 8,
              transformOrigin: "top center",
              transform: `rotate(${armSwing}deg) translateY(0px)`,
            }}
          />
          {/* Right Arm */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: -8,
              width: 12,
              height: 96,
              background: accent,
              borderRadius: 8,
              transformOrigin: "top center",
              transform: `rotate(${-armSwing}deg) translateY(0px)`,
            }}
          />
        </div>

        {/* Hips and Legs */}
        <div
          style={{
            position: "absolute",
            marginTop: 120,
            width: 80,
            height: 16,
            background: primary,
            borderRadius: 8,
          }}
        />
        {/* Left Leg */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "calc(50% - 28px)",
            width: 12,
            height: 120,
            background: primary,
            borderRadius: 8,
            transformOrigin: "top center",
            transform: `rotate(${10 + legStep}deg)`,
          }}
        />
        {/* Right Leg */}
        <div
          style={{
            position: "absolute",
            top: "55%",
            left: "calc(50% + 16px)",
            width: 12,
            height: 120,
            background: primary,
            borderRadius: 8,
            transformOrigin: "top center",
            transform: `rotate(${-10 - legStep}deg)`,
          }}
        />
      </div>

      {/* Simple beat indicators */}
      <Sequence from={10}>
        <div
          style={{
            position: "absolute",
            top: "12%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 10,
            opacity: 0.9,
          }}
        >
          {[0, 1, 2].map((i) => {
            const pulse = Math.max(
              0.6,
              Math.sin((t + i * 0.2) * 2 * Math.PI) * 0.5 + 0.5
            );
            return (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: accent,
                  transform: `scale(${pulse})`,
                }}
              />
            );
          })}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

# Boy Dancing Video Frontend (Remotion)

Minimalist Ocean Professional themed viewer for a "Boy Dancing" video using Remotion.

## Features
- Central player frame with controls section beneath (play/pause guidance, scrub progress indicator)
- Optional collapsible sidebar for customization (colors: background, primary, secondary, accent)
- Responsive layout suitable for desktop and mobile
- Remotion compositions:
  - BoyDancing (simple programmatic animation placeholder)
  - HelloWorld and OnlyLogo examples

## Getting Started

Install dependencies:
```bash
npm i
```

Start Remotion Studio:
```bash
npm run dev
```

Open the preview URL from the terminal output. The application shell is visible in the studio. Use the Studio controls (top bar) to play/pause and scrub the timeline.

## Rendering
Render via CLI:
```bash
npx remotion render src/index.ts BoyDancing out/boy-dancing.mp4
```

## Customization
Use the sidebar controls to adjust colors for the BoyDancing composition. For advanced animation customization, extend `src/compositions/BoyDancing.tsx`.

## Style Guide
Ocean Professional theme:
- Primary: `#374151`
- Secondary: `#9CA3AF`
- Success: `#10B981`
- Error: `#EF4444`
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Text: `#111827`

## Notes
- This MVP uses programmatic shapes as a placeholder for the boy dancing. Replace with assets or more complex animation as needed.
- The Remotion Studio manages playback; the bottom controls in the app shell are visual/UX aids.

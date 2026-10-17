# Remotion Video Demo

Create videos programmatically with [Remotion](https://remotion.dev) — React components as frames.

## Project structure

- `src/HelloWorld.tsx` — the video: an animated title card using `useCurrentFrame`, `spring`, and `interpolate`
- `src/Root.tsx` — registers the composition (1920x1080, 30fps, 150 frames / 5s)
- `src/index.ts` — Remotion entry point
- `remotion.config.ts` — Remotion CLI config

## Usage

```bash
npm install

# Render the video to out/hello-world.mp4
npm run render

# Open Remotion Studio (live preview while editing)
npm run dev
```

## Sandbox note

The sandbox lacks system Chrome libraries and fonts, so rendering needs two env vars
(libs were extracted from Debian `.deb` packages into `/tmp/chrome-libs`):

```bash
LD_LIBRARY_PATH=/tmp/chrome-libs/usr/lib/x86_64-linux-gnu \
FONTCONFIG_FILE=/tmp/chrome-libs/etc/fonts/fonts.conf \
npx remotion render HelloWorld out/hello-world.mp4
```

## Writing your own video

Edit `src/HelloWorld.tsx` (or add components in `src/Root.tsx`'s `<Composition>`).
Every re-render at each frame calls your component with that frame number — animate
anything with plain React + math. See the [Remotion docs](https://www.remotion.dev/docs).

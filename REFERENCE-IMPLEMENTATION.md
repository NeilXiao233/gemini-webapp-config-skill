# Reference Implementation

This skill already has one real reference implementation pattern derived from a migrated Gemini-exported app with these features:

- separated `API Settings` and `Model Settings`
- three provider modes
  - `Gemini native`
  - `Gemini official`
  - `OpenAI-compatible`
- localStorage-backed runtime configuration
- HTTPS-safe Vercel proxy for HTTP upstreams
- local/private preview plus public Vercel deployment verification

Use this reference pattern when adapting future apps.

## Architecture Pattern

Split the solution into three layers.

### 1. UI Layer

Add:

- one top-bar button for `API Settings`
- one top-bar button for `Model Settings`
- one empty-state entry to prompt for API setup when no key is stored

Do not combine provider setup and model selection into a single modal.

### 2. Runtime Config Layer

Keep a single runtime config object such as:

```ts
interface ApiConfig {
  provider: "gemini" | "gemini-official" | "openai-compatible"
  apiKey: string
  baseUrl: string
  chatCompletionsPath?: string
  textModel: string
  imageModel: string
}
```

Persist API settings and model settings independently.

### 3. Transport Layer

Support:

- Gemini native request path
- Gemini official request path
- OpenAI-compatible request path
- same-origin Vercel proxy when an HTTPS page must reach an HTTP upstream

## Behavioral Pattern

### API Settings Behavior

- `Gemini native`: show key and base URL
- `Gemini official`: show key only
- `OpenAI-compatible`: show key, base URL, and path

### Model Settings Behavior

- always show text model selector
- always show image model selector
- do not hide models based on selected provider
- let unsupported combinations fail at request time

### Verification Behavior

Every integration or update should end with:

1. a local/private preview URL
2. a public Vercel URL
3. a brief note confirming what was verified

## Practical Merge Guidance For Updates

When a new upstream Gemini export arrives under `gemini/gemini-vX.Y.Z`:

- treat that folder as the upstream business source
- treat the current main app as the adapted deployable source
- preserve the adaptation layer
  - provider settings
  - model settings
  - proxy logic
  - Vercel deployment config
- reapply UI entry points if upstream changed layout structure
- re-check AI service files carefully because those are the most likely conflict points
- in fast replace mode, never drop in an old adapted `App.tsx` as a whole-file replacement
- instead, start from the newest upstream `App.tsx` and insert the adaptation logic into that file
- in fast replace mode, also start from the newest upstream `services/gemini.ts` (or equivalent AI business service)
- only adapt provider/config/transport wiring in AI service files; keep upstream prompt content and business-generation rules primary

## Common Conflict Files

These files need the most careful merging in real projects:

- `App.tsx`
- `services/gemini.ts`
- `index.tsx`
- `vite.config.ts`
- `vercel.json`

## Recommended Delivery Summary

When an agent finishes applying this skill, it should report:

- changed files
- provider modes available
- app prefix used for storage keys
- local/private preview URL
- public Vercel URL
- whether proxy support was added or reused

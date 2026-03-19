# Update Checklist

Use this checklist when the user says something like:

```text
Update the current project to gemini-v1.0.3
```

## Expected Project Layout

Recommended structure:

```text
<project-name>/
  gemini/
    gemini-v1.0.0/
    gemini-v1.0.1/
    gemini-v1.0.3/
  <adapted app files>
```

Rules:

- the root project folder is the adapted, deployable app
- `gemini/gemini-vX.Y.Z` folders are raw upstream Gemini exports
- never edit raw upstream folders during a normal update

## Pre-Execution Confirmation

Before editing, report this summary and wait for confirmation:

- current adapted project directory
- target upstream Gemini source directory
- available update modes
  - `Standard mode`
  - `Fast replace mode`
- adaptation layers that will be preserved
  - API settings
  - model settings
  - proxy route
  - deployment config
- likely conflict files
- major risks

If `Fast replace mode` is offered, explicitly warn that it discards current business-layer code that is not present in the target `gemini/gemini-vX.Y.Z` source.

## Update Modes

### Standard Mode

- preserve adaptation layer
- inspect and merge upstream business changes selectively
- use when current app contains business-layer edits worth preserving

### Fast Replace Mode

- treat target `gemini/gemini-vX.Y.Z` as the new full business baseline
- reapply the adaptation layer afterward
- use when the user wants the fastest reliable update path
- do not spend time on detailed business-level diff merging unless required for the adaptation layer
- delete the current deployable app content locally first when that is the cleanest route, then rebuild the adapted app from the target Gemini source and redeploy
- for `App.tsx`, always start from the latest upstream file and insert the adaptation logic into it
- never copy an older adapted `App.tsx` over the new upstream file wholesale
- for `services/gemini.ts` or equivalent AI business service files, always start from the latest upstream file and only adapt transport/config wiring
- never preserve older adapted prompt text, interference rules, style-analysis prompts, or other business-generation rules wholesale

## Merge Priorities

During update:

### Preserve First

- API/provider settings UI
- model settings UI
- runtime config storage
- proxy logic
- deployment configuration

### Absorb From Upstream

- business UI changes
- new pages or sections
- new business logic
- updated copy or assets
- updated data structures where safe

In `Fast replace mode`, this section effectively becomes full upstream replacement for the business layer.

## High-Risk Files

Review carefully if changed by upstream:

- `App.tsx`
- `services/gemini.ts`
- `index.tsx`
- `vite.config.ts`
- `vercel.json`

`App.tsx` is the highest-risk file in fast replace mode because it contains both business flow and runtime config entry points. Upstream business flow must remain primary.

`services/gemini.ts` is the next highest-risk file because it contains prompt design, generation rules, and interference logic. Upstream business prompts must remain primary.

## Required Validation After Merge

1. type check or lint
2. production build
3. local/private preview URL
4. public Vercel deployment
5. public URL verification

## Expected Delivery Back To User

- changed files summary
- what was preserved from the adapted app
- what was absorbed from the upstream Gemini version
- local/private preview URL
- public Vercel URL
- known risks or follow-up actions

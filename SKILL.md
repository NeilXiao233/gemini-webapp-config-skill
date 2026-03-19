---
name: gemini-webapp-config
description: Integrate and maintain runtime API/provider settings, model selection, HTTPS-safe proxying, and Vercel deployment workflows for Gemini-exported web apps. Supports first-time setup and versioned upstream updates from gemini/gemini-vX.Y.Z sources.
allowed-tools: Read, Glob, Grep, ApplyPatch, Bash
---

# Gemini Webapp Config

## Goal

Adapt a Gemini-exported or Gemini-migrated web app so it can be configured at runtime, deployed on Vercel, and updated from later Gemini source exports while preserving the adaptation layer.

## Use This Skill When

- the app has hardcoded AI credentials or env-only credentials
- the app needs runtime API settings and model settings
- the app must support one or more of:
  - `Gemini native`
  - `Gemini official`
  - `OpenAI-compatible`
- the app must run on HTTPS while some upstreams may still be HTTP
- the app must be deployed and verified on Vercel
- the user wants to update the current adapted app from `gemini/gemini-vX.Y.Z`

## Required Inputs

Determine or infer:

- `app_root`
- `app_prefix`
- `deployment_target` = `vercel` by default
- current adapted app directory
- target upstream Gemini directory when doing updates

Never hardcode an old project prefix.

If `app_prefix` is not provided, derive it from the project folder name using lowercase snake_case.

## Project Layout Convention

Use this structure for both first release and later updates:

```text
<project-name>/
  gemini/
    gemini-v1.0.0/
    gemini-v1.0.1/
    gemini-v1.0.3/
  <adapted app files>
```

Rules:

- root project directory = current adapted and deployable app
- `gemini/gemini-vX.Y.Z` = raw upstream Gemini exports
- do not normally edit raw upstream folders

## Core Rules

### Storage

All localStorage keys must be parameterized from `app_prefix`.

Required pattern:

```text
<app_prefix>_api_provider
<app_prefix>_api_key
<app_prefix>_api_base_url
<app_prefix>_api_path
<app_prefix>_text_model
<app_prefix>_image_model
```

### UI Split

Provider settings and model settings must be separate.

Required UI surfaces:

- `API Settings`
- `Model Settings`

Do not force users to choose models while entering API credentials.

### Provider Support

Support these modes:

- `Gemini native`
  - fields: `API Key`, `API Base URL`
- `Gemini official`
  - fields: `API Key`
  - no `Base URL` or `Path` in UI
- `OpenAI-compatible`
  - fields: `API Key`, `API Base URL`, `Chat Completions Path`

### Model Rule

Model settings must always remain visible regardless of provider.

Required visible options:

- text models:
  - `gemini-3.1-pro-preview`
  - `gemini-3.1-flash-lite-preview`
  - `gemini-3-flash-preview`
- image models:
  - `gemini-3.1-pro-image-preview`
  - `gemini-3.1-flash-image-preview`
  - `gemini-3.0-pro-image-preview`
  - `gemini-3.0-flash-image-preview`
  - `gemini-3-pro-image-preview`
  - `gemini-3-flash-image-preview`

Do not hide unsupported combinations. Let request-time errors surface.

### Transport Rule

Refactor AI calls to use a shared runtime config object.

Do not rely on hidden globals or env-only values at call time.

### Proxy Rule

If the app runs on HTTPS and the upstream base URL is HTTP, browser requests must be rewritten to a same-origin proxy.

Preferred pattern:

```text
/api/proxy?target=<encoded-upstream-url>
```

When using Vercel, prefer:

- `api/proxy.ts`
- `vercel.json`

### Official Gemini Rule

For official Gemini requests, send only official request fields.

Do not invent or keep unsupported top-level fields.

### Business Logic Rule

Preserve business behavior whenever possible.

Change only:

- runtime credential collection
- provider/model persistence
- AI transport wiring
- proxy and deployment plumbing

## Standard Workflows

### 1. Initial Integration

Use when the app has not yet been adapted.

Required sequence:

1. inspect the app
2. normalize runtime config
3. add API settings UI
4. add model settings UI
5. refactor AI calls to shared runtime config
6. add proxy support if HTTPS may reach HTTP upstreams
7. run type check / lint
8. run production build
9. start a local/private preview URL
10. deploy to Vercel
11. verify the public URL

### 2. Upstream Update

Use when the user says something like:

```text
Update the current project to gemini-v1.0.3
```

Required sequence:

1. inspect current adapted app
2. inspect target `gemini/gemini-vX.Y.Z`
3. ask the user to choose update mode
4. summarize the plan and risks
5. wait for user confirmation
6. execute the chosen update mode
7. run type check / lint
8. run production build
9. start a local/private preview URL
10. deploy to Vercel
11. verify the public URL

### Update Modes

Support two update modes:

- `Standard mode`
  - preserve adaptation layer
  - selectively absorb upstream business changes
- `Fast replace mode`
  - use the target `gemini/gemini-vX.Y.Z` as the new full business base
  - reapply the adaptation layer on top
  - prefer this for high-frequency iterations when the user treats Gemini export as the source of truth

### Fast Replace Rule

In fast replace mode:

- do not spend time on detailed business-level diff merging unless needed to restore the adaptation layer
- replace current app business files with the target Gemini source baseline
- treat the latest upstream `App.tsx` as the business source of truth
- adapt `App.tsx` by inserting the required configuration and deployment logic into the latest upstream file
- never reuse an older adapted `App.tsx` wholesale in fast replace mode
- treat the latest upstream `services/gemini.ts` or equivalent AI business service as the business source of truth for prompts, generation rules, and interference logic
- adapt AI service files by changing transport/config wiring only
- never carry forward older adapted prompt text, interference rules, style-analysis rules, or generation-business logic wholesale
- keep or reapply:
  - API settings
  - model settings
  - provider routing
  - proxy route
  - deployment config
  - local/private preview and public deployment verification flow
- delete the current deployed app content locally before rebuilding the new adapted version when that is the fastest reliable route
- do not attempt to preserve old business-layer code unless the user explicitly asks for that

## Update Confirmation Protocol

Before executing an upstream update, always report:

- current adapted project directory
- target upstream Gemini source directory
- adaptation layers to preserve
- available update modes
- likely conflict files
- major risks

If fast replace mode is available, explicitly warn that it will discard current business-layer code that is not present in the target Gemini source.

Wait for user confirmation before merging.

## Verification Requirements

Always provide both:

- a local/private preview URL
- a public Vercel URL

Minimum checks:

- app boots locally
- build succeeds
- homepage is reachable publicly
- proxy route works if the deployed app depends on an HTTP upstream

If deployment auth is required, trigger or guide the Vercel auth flow, then continue.

## Output Contract

When finished, report:

- changed files
- provider modes available
- storage prefix used
- whether proxy support was added or reused
- whether lint/build passed
- local/private preview URL
- public Vercel URL
- whether public verification passed
- how the user should fill each provider mode

## Agent Constraints

- prefer React/Vite/Tailwind patterns when the app matches that stack
- use Vercel as the default deployment platform
- do not redesign the app unnecessarily
- do not edit raw `gemini/gemini-vX.Y.Z` sources during normal updates
- keep unsupported provider/model combinations saveable; fail only at request time

## Supporting Docs

Use these only as needed:

- `QUICKSTART.md`
- `MINIMAL-INTEGRATION.md`
- `DEPLOY-AND-VERIFY.md`
- `UPDATE-CHECKLIST.md`
- `REFERENCE-IMPLEMENTATION.md`
- `templates/react-vite-tailwind/*`

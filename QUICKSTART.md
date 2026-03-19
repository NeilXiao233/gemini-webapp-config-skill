# Quickstart

Use this skill when migrating a Gemini-exported web app that needs runtime API and model settings.

## Simplest Project Layout

Use one project folder per app, named after the app itself.

Recommended structure:

```text
<project-name>/
  gemini/
    gemini-v1.0.0/
    gemini-v1.0.1/
    gemini-v1.0.3/
  <adapted app files>
```

Meaning:

- root project folder = current adapted and deployable app
- `gemini/gemini-vX.Y.Z` = raw Gemini export snapshots

This same structure works for both first release and later updates.

For high-frequency iterations, prefer `Fast replace mode` during updates: use the new `gemini/gemini-vX.Y.Z` source as the full business baseline and then reapply the adaptation layer.

## Inputs To Decide First

- `app_root`: target project folder
- `app_prefix`: storage key prefix, for example `my_puzzle_app`
- `deployment_target`: default `vercel`
- `default_gemini_native_base_url`: optional gateway default

## Fast Integration Order

1. For the first release, copy the first raw Gemini export into `gemini/gemini-vX.Y.Z`.
2. Treat the project root as the adapted app you will deploy.
3. Copy template files from `templates/react-vite-tailwind/` into the target app.
4. Replace every `__APP_PREFIX__` placeholder.
5. Wire `ApiSettingsModal` and `ModelSettingsModal` into the top bar or empty state.
6. Replace hardcoded Gemini calls with `buildApiConfig(...)` and the shared client helpers.
7. Add `api/proxy.ts` if the app is deployed over HTTPS and may call HTTP upstreams.
8. Run type check, build, and start a local/private preview URL.
9. Deploy to Vercel and verify the public URL.

## Expected End State

- Users can choose `Gemini native`, `Gemini official`, or `OpenAI-compatible`
- Users can configure API credentials separately from model selection
- Selected text and image models persist independently
- HTTPS pages can safely reach HTTP upstreams through a same-origin proxy
- A local/private preview URL is available for merge verification
- A public Vercel URL is available for final validation

## Files In This Skill

- `SKILL.md`: full behavior and workflow spec
- `REFERENCE-IMPLEMENTATION.md`: real-world architecture and merge guidance
- `MINIMAL-INTEGRATION.md`: smallest practical adoption recipe
- `DEPLOY-AND-VERIFY.md`: local/private preview and Vercel verification workflow
- `UPDATE-CHECKLIST.md`: repeatable update flow for `gemini/gemini-vX.Y.Z`
- `templates/react-vite-tailwind/services/ai-config.ts`
- `templates/react-vite-tailwind/services/ai-client.ts`
- `templates/react-vite-tailwind/components/ApiSettingsModal.tsx`
- `templates/react-vite-tailwind/components/ModelSettingsModal.tsx`
- `templates/react-vite-tailwind/api/proxy.ts`
- `templates/react-vite-tailwind/vercel.json`

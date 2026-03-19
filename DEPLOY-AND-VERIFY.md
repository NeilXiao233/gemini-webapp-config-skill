# Deploy And Verify

This skill assumes Vercel is the default public deployment platform.

## Stage 1: Local / Private Preview

Always start with a local or private preview URL before relying on the public deployment.

Goal:

- verify merge quality
- verify UI wiring
- verify that the app boots with current runtime settings

Recommended commands:

```bash
npm run dev -- --host 127.0.0.1 --port 3000
```

or:

```bash
npm run preview -- --host 127.0.0.1 --port 3000
```

If the server must stay running, start it in the background and report the URL.

Expected output to the user:

- local/private preview URL
- note that this URL is mainly for merge and runtime validation

## Stage 2: Vercel Deployment

Use Vercel by default.

Recommended deployment command:

```bash
npx vercel --prod --yes
```

If login is required:

- trigger the auth flow
- let the user complete authentication
- resume deployment after auth finishes

Expected output to the user:

- public production URL
- note that this is the external validation URL

## Stage 3: Public Verification

After deployment, verify the public URL.

Required checks:

- homepage returns successfully
- main built asset is reachable
- if using HTTP upstreams under HTTPS, proxy route responds as expected

If browser automation is available, open the deployed app and confirm it loads.

## Update Workflow Note

For upstream updates, the same sequence applies:

1. merge upstream Gemini changes into current adapted app
2. start local/private preview
3. validate behavior
4. deploy to Vercel
5. verify public URL

Do not stop at a successful build alone.

## Fast Replace Deployment Note

If the user chooses `Fast replace mode`:

- rebuild the deployable app from the target `gemini/gemini-vX.Y.Z` source plus the adaptation layer
- if needed, delete the current local deployable app contents first to avoid stale files
- then build, preview, deploy, and verify as usual

The goal is speed and a clean baseline, not preserving old business-layer code.

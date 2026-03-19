# Minimal Integration

This is the minimum reliable integration path for a React/Vite/Tailwind app.

## 1. Add Shared Runtime Config

Copy:

- `templates/react-vite-tailwind/services/ai-config.ts`
- `templates/react-vite-tailwind/services/ai-client.ts`
- `templates/react-vite-tailwind/vercel.json` if the app will use Vercel deployment or proxying

Replace `__APP_PREFIX__` with the target prefix.

## 2. Add Two Entry Buttons

Add top-bar actions:

- `API Settings`
- `Model Settings`

Mount:

- `ApiSettingsModal`
- `ModelSettingsModal`

## 3. Replace Hidden API Sources

Remove or stop relying on:

- hardcoded API keys
- `process.env.API_KEY`
- `process.env.GEMINI_API_KEY`
- provider-specific globals hidden in modules

Build one runtime config object from localStorage-backed state and pass it to all AI calls.

## 4. Refactor AI Calls

Typical migration:

```ts
// before
const result = await generatePlan(theme)

// after
const apiConfig = buildApiConfig({
  provider,
  apiKey,
  baseUrl,
  chatCompletionsPath,
  textModel,
  imageModel,
})

const result = await generatePlan(apiConfig, theme)
```

## 5. Add Proxy Only If Needed

If the deployed app is HTTPS and the chosen upstream can be HTTP, add:

- `templates/react-vite-tailwind/api/proxy.ts`

and make requests route through `/api/proxy?target=...` when needed.

## 6. Validate

- provider settings persist after refresh
- model settings persist after refresh
- official mode only asks for API key
- unsupported model/provider combinations fail at request time, not save time
- type check and build succeed

## 7. Start A Local / Private Preview

Always provide a preview URL after integration or update.

Typical command:

```bash
npm run dev -- --host 127.0.0.1 --port 3000
```

If needed, run in the background and report the URL.

## 8. Deploy To Vercel And Verify

Default public deployment target is Vercel.

Typical command:

```bash
npx vercel --prod --yes
```

After deploy:

- return the public URL
- verify the public URL responds successfully
- verify proxy behavior if the app depends on HTTP upstreams

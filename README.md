# Gemini Webapp Config Skill

[English](./README.md) | [简体中文](./README.zh-CN.md)

Turn Gemini-exported web apps into **configurable, provider-switchable, cloud-deployable products**.

This OpenCode skill is designed for real-world shipping, not just demos. It helps developers and non-experts take a Gemini web app and quickly transform it into something they can configure, deploy, and share.

> **From Gemini export to public deployment, this skill covers the hardest middle part.**

---

## What this skill does

This skill is built to solve three practical problems.

### 1. Replace hardcoded Gemini web settings
Many Gemini-generated web apps come with limitations like:
- hardcoded API keys
- fixed models
- no runtime provider switching
- no easy way to change endpoints

This skill adapts the app so users can configure settings directly in the UI, including:
- API Key
- API Base URL
- Chat Completions Path
- text model
- image model
- provider selection

Supported provider modes:
- Gemini native
- Gemini official
- OpenAI-compatible

---

### 2. Add HTTPS-safe proxy and cloud deployment support
A lot of Gemini web apps work locally, then fail in production because of:
- HTTPS pages calling HTTP upstreams
- browser CORS restrictions
- broken deployment behavior on Vercel

This skill includes the adaptation layer needed for production delivery:
- same-origin proxy pattern
- `api/proxy.ts`
- `vercel.json`
- browser-side request rewriting logic

That means it is not just about configuration.

> **It is also a deployment-enablement skill.**

---

### 3. Give beginners a near one-click deployment workflow
This skill is designed to be approachable for non-experts.

Instead of forcing users to manually figure out app wiring, proxying, and deployment, it provides a repeatable workflow for:
- runtime config integration
- model settings integration
- proxy integration
- local preview
- Vercel deployment
- public verification

---

## Who this is for

This skill is especially useful if you want to:
- take a Gemini-exported web app and control its API stack yourself
- turn a Gemini demo into a client-ready product
- support OpenAI-compatible providers
- deploy to Vercel without rebuilding everything from scratch
- preserve your adaptation layer while updating from newer `gemini-vX.Y.Z` exports

---

## In one sentence

This skill is a:

> **Gemini webapp upgrader + runtime config layer + cloud deployment accelerator**

---

## What is included

This repository is intended to contain the full skill directory, not just a single `SKILL.md` file.

Core contents include:
- `SKILL.md` — the main skill definition
- `QUICKSTART.md` — fast-start guide
- `MINIMAL-INTEGRATION.md` — smallest practical adoption path
- `REFERENCE-IMPLEMENTATION.md` — reference architecture and merge guidance
- `DEPLOY-AND-VERIFY.md` — deployment and validation workflow
- `UPDATE-CHECKLIST.md` — repeatable update checklist
- `templates/react-vite-tailwind/` — reusable implementation templates

---

## Why this skill matters

A lot of people can generate a Gemini web app.
Much fewer people can:
- make it runtime-configurable
- make it provider-switchable
- make it production-safe
- make it deployable
- make it maintainable across future Gemini exports

That is the gap this skill is meant to close.

> **It moves a project from “it runs” to “it ships.”**

---

## Recommended usage

In OpenCode, this skill is especially effective for requests like:
- make this Gemini web app configurable at runtime
- add API Settings and Model Settings
- support OpenAI-compatible endpoints
- add Vercel proxy support and deploy it
- update the app to a newer `gemini-vX.Y.Z` version while preserving the adaptation layer

---

## Expected result

After using this skill, you should end up with a web app that can:
- switch providers freely
- switch models freely
- let users fill settings inside the UI
- work correctly in HTTPS environments
- deploy to Vercel
- produce a public shareable URL

---

## For global users

This repository provides:
- an English-first README for international sharing
- a Chinese README for Chinese-speaking users

Chinese version:
- [README.zh-CN.md](./README.zh-CN.md)

---

## Final takeaway

If you want more people to actually use Gemini-generated web apps in the real world, this skill is built for that exact purpose.

**It helps turn generated apps into deployable products.**

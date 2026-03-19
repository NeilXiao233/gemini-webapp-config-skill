# Gemini Webapp Config Skill

[English](./README.md) | [简体中文](./README.zh-CN.md)

把 Gemini 导出的网页应用，快速改造成一个 **可配置、可切换接口、可部署到云端** 的正式产品。

这是一个面向中文用户和小白用户都很友好的 OpenCode skill。它的目标不是只让应用“跑起来”，而是帮助你把 Gemini 网页应用真正变成可以配置、可以交付、可以分享的在线成品。

> **从 Gemini 导出，到公网部署，中间最麻烦的一段路，这个 skill 会帮你补齐。**

---

## 这个 skill 能做什么

它主要解决 3 类现实问题。

### 1. 接管 Gemini 网页的默认配置
很多 Gemini 导出的网页应用都有这些问题：
- API Key 写死
- 模型固定
- 不能运行时切换 Provider
- 不能方便替换接口地址

这个 skill 会把应用改造成可在网页内直接配置的版本，支持用户填写：
- API Key
- API Base URL
- Chat Completions Path
- 文本模型
- 图片模型
- Provider 选择

支持的 Provider 模式：
- Gemini native
- Gemini official
- OpenAI-compatible

---

### 2. 自动补上 HTTPS 代理与云部署能力
很多 Gemini 网页应用在本地能跑，但一部署就会出问题，例如：
- HTTPS 页面请求 HTTP 上游失败
- 浏览器跨域
- Vercel 部署后接口失效

这个 skill 已经包含了生产可用的改造层：
- 同源代理模式
- `api/proxy.ts`
- `vercel.json`
- 浏览器端请求改写逻辑

也就是说，它不仅解决“配置问题”，还解决“部署问题”。

> **它本质上也是一个帮助你上云交付的 skill。**

---

### 3. 给小白也能上手的近乎一键部署流程
这个 skill 的设计目标之一，就是降低使用门槛。

你不需要自己研究复杂的接线、代理和部署细节，它会提供一套可重复使用的流程，用于：
- 接入运行时配置
- 接入模型设置
- 接入代理
- 本地预览
- Vercel 部署
- 公网验证

---

## 适合谁使用

如果你有下面这些需求，这个 skill 会非常适合你：
- 想把 Gemini 导出的网页应用改成自己可控的 API 版本
- 想把 Gemini demo 变成可以交付客户的正式产品
- 想支持 OpenAI-compatible 接口
- 想快速部署到 Vercel，而不是从头重构部署流程
- 想在后续升级到新的 `gemini-vX.Y.Z` 时保留自己的改造层

---

## 一句话理解

这个 skill 本质上是：

> **Gemini 网页应用增强器 + 运行时配置接管层 + 云部署加速器**

---

## 仓库包含什么

这个仓库的目标是保存完整的 skill 目录，而不是只放一个 `SKILL.md`。

核心内容包括：
- `SKILL.md`：主 skill 定义
- `QUICKSTART.md`：快速开始说明
- `MINIMAL-INTEGRATION.md`：最小可行接入路径
- `REFERENCE-IMPLEMENTATION.md`：参考架构与合并说明
- `DEPLOY-AND-VERIFY.md`：部署与验证流程
- `UPDATE-CHECKLIST.md`：后续升级检查清单
- `templates/react-vite-tailwind/`：可复用模板代码

---

## 为什么这个 skill 值得分享

因为很多人会生成 Gemini 网页应用，但很少有人能继续完成下面这些事情：
- 改成运行时可配置
- 改成可切换 Provider
- 改成适合生产环境
- 改成可以部署
- 改成未来还能持续升级

而这个 skill 的价值就在于，它补上了这条链路。

> **它把“能跑”推进到了“能交付”。**

---

## 推荐怎么使用

在 OpenCode 里，这个 skill 很适合处理下面这些需求：
- 把当前 Gemini 网页改成运行时可配置版本
- 增加 API Settings 和 Model Settings
- 支持 OpenAI-compatible 接口
- 增加 Vercel 代理并完成部署
- 更新到新的 `gemini-vX.Y.Z` 版本，同时保留原有改造层

---

## 最终你会得到什么

使用这个 skill 后，你最终应该得到一个这样的应用：
- 可自由切换接口供应商
- 可自由切换模型
- 可在网页 UI 内直接填写配置
- 可在 HTTPS 环境中正常工作
- 可部署到 Vercel
- 可生成公网分享链接

---

## 面向全球用户

本仓库提供：
- 英文优先的 README，方便全球传播
- 中文 README，方便中文用户快速理解

英文版：
- [README.md](./README.md)

---

## 最后的结论

如果你想让更多人真正把 Gemini 生成的网页应用用起来，而不只是停留在 demo 阶段，这个 skill 就是为这个目的而做的。

**它帮助你把生成应用，真正推进为可部署、可分享、可交付的产品。**

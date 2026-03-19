# Gemini Webapp Config Skill

把 Gemini 导出的网页应用，快速改造成一个 **可配置、可替换接口、可一键部署到云端** 的成品。

这是一个面向小白也能直接上手的 OpenCode skill。

你不需要自己手搓运行时配置、不需要自己研究代理、不需要自己重写 Vercel 部署流程。
这个 skill 的目标只有一个：

> **让任何一个 Gemini 网页应用，都能更快变成可交付、可分享、可部署的正式应用。**

---

## 它能做什么

这个 skill 主要解决 3 类问题：

### 1. 替换 Gemini 网页默认配置
很多 Gemini 导出的网页应用：
- API key 写死
- 只能用固定模型
- 不能动态改接口
- 不能方便切换供应商

这个 skill 会把它改造成支持运行时配置的版本，允许用户直接在网页里配置：
- API Key
- API Base URL
- Chat Completions Path
- 文本模型
- 图片模型
- Provider 切换

支持：
- Gemini native
- Gemini official
- OpenAI-compatible

---

### 2. 自动补上 HTTPS / Proxy / 云部署能力
很多本地能跑的 Gemini 应用，一上云就会遇到：
- HTTPS 页面不能请求 HTTP 接口
- 浏览器跨域失败
- Vercel 部署后请求挂掉

这个 skill 已经内置了：
- 同源代理方案
- `api/proxy.ts`
- `vercel.json`
- 浏览器端请求改写逻辑

也就是说：

> **不仅能改配置，还能直接为上云部署铺平道路。**

---

### 3. 面向小白的傻瓜式一键部署工作流
这个 skill 的设计目标不是“给专家看文档”，而是：

> **让普通人也能把 Gemini 网页应用发布成真正可访问的在线产品。**

它会引导或直接完成：
- 运行时配置接入
- 模型设置接入
- 代理接入
- 本地预览
- Vercel 部署
- 公网验证

---

## 适合谁用

非常适合这几类人：

- 想把 Gemini 导出的网页应用改成自己能控制接口的版本
- 想把 Gemini demo 变成可以交付客户的在线产品
- 想让应用支持第三方兼容 OpenAI 的接口
- 想快速上 Vercel，不想自己折腾部署细节
- 想保留 Gemini 上游版本，同时持续更新自己改造后的应用

---

## 一句话理解

这个 skill 本质上就是：

> **Gemini 网页应用增强器 + 配置接管器 + 云部署加速器**

---

## 包含内容

本仓库包含完整 skill 目录，而不只是一个 `SKILL.md`：

- `SKILL.md`：主 skill 定义
- `QUICKSTART.md`：快速上手
- `MINIMAL-INTEGRATION.md`：最小改造方案
- `REFERENCE-IMPLEMENTATION.md`：参考实现说明
- `DEPLOY-AND-VERIFY.md`：部署与验证流程
- `UPDATE-CHECKLIST.md`：后续升级检查清单
- `templates/react-vite-tailwind/`：现成模板代码

---

## 为什么这个 skill 值得分享

因为很多人卡在这一步：

- 会生成 Gemini 网页
- 但不会改成可配置版本
- 不会处理代理
- 不会部署
- 不会把 demo 变成产品

而这个 skill 的价值就在于：

> **把“能跑”推进到“能交付”。**

---

## 推荐使用方式

如果你在 OpenCode 里使用 skill，推荐直接让它处理类似需求：

- 把当前 Gemini 网页改成可配置版本
- 增加 API Settings 和 Model Settings
- 支持 OpenAI-compatible 接口
- 增加 Vercel 代理并完成部署
- 更新到新的 `gemini-vX.Y.Z` 版本并保留改造层

---

## 目标效果

最终你会得到一个这样的应用：

- 可自由切换接口供应商
- 可自由替换模型
- 可在网页中直接填写配置
- 可在 HTTPS 环境中正常工作
- 可部署到 Vercel
- 可生成公开访问链接

---

## 结论

如果你想让更多人低门槛地把 Gemini 网页应用真正用起来，这个 skill 就是为此而生的。

**从 Gemini 导出，到在线部署，中间最麻烦的一段路，它帮你补齐了。**

# BESTAR METAL 官网

纯 HTML / CSS / JavaScript，部署在 GitHub Pages。完整报告见上一级的 `BestarMetal-最终优化报告.md`。

## 上传到 GitHub
1. 把这个文件夹里的**所有内容**（含 `assets`、`insights` 文件夹和 `.nojekyll`）上传到仓库根目录，覆盖旧文件。
2. 仓库里已有的旧图片文件夹保留不动（我没有删除任何文件），其中不再被引用的文件可以以后手动清理。
3. 等 1–3 分钟，强制刷新网站，逐页检查。

## 图片规则
- 只有 `manufacturing.html` 使用真实车间/生产照片（`assets/images/real/`）。
- 其他页面使用 AI 概念图（`hero/`、`products/`、`design/`、`industries/`、`materials/`、`prototyping/`、`insights/`）。
- 换成更高分辨率或真实图片时，保持同名文件覆盖，并同步更新 `alt`。

## 表单与统计
- 把 Formspree 地址填入 `config.js` 的 `formspreeEndpoint`，再自己提交一条测试询盘。
- 统计事件接口已预留，需要加入 Google Analytics 4 或 Plausible 代码后才会发送。

## 域名
canonical 已指向 `https://bestarmetal.com`。绑定步骤见 `DOMAIN-MIGRATION-CHECKLIST.md`。

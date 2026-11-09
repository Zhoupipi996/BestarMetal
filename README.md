# BESTAR METAL 官网（OEM/ODM 版）

纯 HTML / CSS / JavaScript，部署在 GitHub Pages。详细报告见上一级的 `BestarMetal-OEM-ODM-实施报告.md`。

## 上传到 GitHub
1. 把这个文件夹里的**所有内容**（含 `assets` 文件夹和 `.nojekyll`）上传到仓库根目录，覆盖旧文件。
2. 仓库里原有的旧图片文件夹（`assets/images/hero`、`design`、`industries`、`materials`、`processes`、`prototyping`、`production`、`workshop`，以及 `assets/images/products` 里的旧文件）现在没有页面使用。确认新站正常后可以手动删除，我没有替你删除。
3. 等 1–3 分钟，强制刷新网站，逐页检查。

## 图片
- 全部使用你提供的真实授权照片，位于 `assets/images/real/`。
- 我做过处理的文件（原图在你的 ZIP 里没有改动）：
  - `workshop-15-02-rotated.webp`：原图倒置，已旋转 180°（另有 800px 宽版本）。
  - `process-17-3-shelving.webp`：从拼图中裁出左侧货架照片。
  - `process-19-4-worker.webp`、`process-19-4-container.webp`：把拼图拆成两张。
  - `coffee-tables-detail-26-12-trim.webp`、`nesting-tables-detail-28-11-trim.webp`：裁掉白边。
- 没有使用：`racks-detail-30-11`（画面里有第三方品牌字样）、`racks-detail-30-22`（两张拼图，内容不能确认是金属货架）、`workshop-15-04`（场景杂乱）。

## 表单（Formspree）
把 Formspree 表单地址填入 `config.js` 的 `formspreeEndpoint`。未配置时，表单只提示"未发送"并提供邮件备用链接。配置后请自己提交一条测试询盘并确认邮箱收到。

## 统计事件
页面已预留 `quote_form_submit_success`、`whatsapp_click`、`email_click`、`product_inquiry_click`、`engineering_inquiry_click`。只有在页面里加入 Google Analytics 4（gtag）或 Plausible 之后才会发送，目前没有配置任何统计工具。

## 域名（canonical 已指向 bestarmetal.com）
见 `DOMAIN-MIGRATION-CHECKLIST.md`。

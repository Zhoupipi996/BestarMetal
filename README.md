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

## 询盘表单（RG Forms）
- 表单已连接 RG Forms（Google Apps Script）。接收地址在 `config.js` 的 `formEndpoint`；这个地址是公开的，不含密码，但请不要把 Google 账号、Sheet 链接或通知邮箱写进网站文件。
- **首次使用前**：用创建表单的 Google 账号，在浏览器里打开一次这个接收地址完成授权（页面会显示一小段 JSON，这是正常的）。没有授权的话，网站提交会失败，页面会提示用邮件发送。
- 上线后请自己在联系页提交一条测试询盘，确认 Google 表格里出现新的一行，并确认通知邮箱收到邮件。
- 表单已启用 Cloudflare Turnstile 验证码（站点密钥写在 `contact.html`，它是公开的；密钥 secret 只在你的 RG Forms/Google 表格里，不要写进网站）。提交时验证码令牌作为 `_captcha` 发送；没通过验证码页面会提示重新验证。
- 表单字段与 RG Forms 中定义的字段对应（项目描述字段名为 `project_description`）。如果你在 RG Forms 里增删字段或修改下拉选项，需要同步修改 `contact.html` 和 `script.js`。
- 统计事件接口已预留，需要加入 Google Analytics 4 或 Plausible 代码后才会发送。

## 域名
canonical 已指向 `https://bestarmetal.com`。绑定步骤见 `DOMAIN-MIGRATION-CHECKLIST.md`。

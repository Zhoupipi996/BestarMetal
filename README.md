# BESTAR METAL 官网（纯 HTML / CSS / JavaScript）

这是一个英文 B2B 企业官网，不需要安装任何软件，可以直接部署到 GitHub Pages。

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` 等 9 个 `.html` | 9 个页面（首页、产品、设计工程、制造、行业、打样、关于、联系、隐私政策） |
| `config.js` | **公司信息集中配置**（邮箱、WhatsApp、地址、表单地址等） |
| `style.css` | 样式 |
| `script.js` | 菜单、WhatsApp 按钮、回到顶部、表单逻辑 |
| `sitemap.xml` / `robots.txt` / `llms.txt` | 搜索引擎与 AI 搜索使用的说明文件 |
| `assets/images/` | 图片（目前是占位图，需要换成真实照片） |
| `.nojekyll` | 告诉 GitHub Pages 不要用 Jekyll 处理，请保留 |

## 1. 本地预览

- 最简单：双击 `index.html`，用浏览器打开即可。
- 或者用 VS Code：安装 Live Server 插件，右键 `index.html` → Open with Live Server。

## 2. 创建 GitHub 仓库

1. 注册并登录 github.com。
2. 右上角 `+` → `New repository`。
3. Repository name 填 `bestarmetal-website`（任意名称均可），选 `Public`，点 `Create repository`。

## 3. 上传网站文件

1. 在新仓库页面点 `uploading an existing file`。
2. 把**文件夹里面的所有内容**（不是文件夹本身）拖进去，包括 `assets` 文件夹和 `.nojekyll`。`index.html` 必须在仓库最外层。
3. 点 `Commit changes`。

## 4. 开启 GitHub Pages

1. 仓库 → `Settings` → `Pages`。
2. Source 选 `Deploy from a branch`，Branch 选 `main`，文件夹选 `/ (root)`，点 `Save`。
3. 等 1-3 分钟，页面顶部会显示网站地址（形如 `https://你的用户名.github.io/仓库名/`）。

## 5. 测试已发布的网站

逐项检查：

- 9 个页面都能打开，导航和页脚链接都正常。
- 手机上菜单（汉堡按钮）能打开。
- 点 WhatsApp 按钮能打开 +86 134 7614 4359；点邮箱能打开 marketing@bestarmetal.com。
- 联系页的表单：未配置 Formspree 时，提交只会提示"未发送"，这是正常的。

## 6. 绑定域名 bestarmetal.com

先完成第 5 步测试，再操作：

1. 仓库 → `Settings` → `Pages` → `Custom domain`，填 `bestarmetal.com`，点 `Save`。
2. 到域名注册商的 DNS 管理页添加记录。**具体数值请以 GitHub Pages 设置页和 GitHub 官方文档当前显示的为准**。常见形式如下（我凭记忆写的，没有联网核对，仅供参考）：
   - 根域名 `bestarmetal.com`：4 条 `A` 记录，指向 GitHub Pages 的 IP（185.199.108.153、185.199.109.153、185.199.110.153、185.199.111.153）。
   - 可选：对应的 `AAAA` 记录（IPv6），以官方文档为准。
   - `www` 子域名：一条 `CNAME` 记录，指向 `你的用户名.github.io`。
3. DNS 生效后（几分钟到 24 小时），回到 `Settings` → `Pages`，勾选 `Enforce HTTPS`。
4. 网站的 canonical、sitemap 都以 `https://bestarmetal.com`（不带 www）为标准。建议保持根域名为主域名。

## 7. 更换图片与修改文字

- **换图片**：把真实照片改成和占位图**完全相同的文件名**（如 `assets/images/processes/welding.jpg`），覆盖上传即可。建议每张图小于 300 KB，比例 3:2（如 1200×800）。
- 换完图片后，请在所有 `.html` 文件中全局搜索 ` (placeholder image)` 并删除，让图片说明（alt）变成正式描述。
- **改文字**：用 VS Code 打开对应 `.html` 文件直接修改文字，不要改尖括号 `< >` 里的内容。
- **页面日期**：修改页面后，请同步更新 `sitemap.xml` 里的 `lastmod` 日期。

## 8. 修改 config.js

打开 `config.js`，修改引号里面的内容即可：

- `email`、`whatsappNumber`（只填数字，含国家码）、`whatsappDisplay`、`factoryAddress`、`companyName`：页面上显示的公司信息会自动同步。
- `socialLinks`：填入 LinkedIn / Facebook / Instagram 完整网址（`https://` 开头）后，页脚会自动出现链接；留空则自动隐藏。
- `formspreeEndpoint`：见下一节。
- 注意：为了让搜索引擎在不运行 JavaScript 时也能读到联系信息，HTML 里同时保存了一份相同的文字。如果修改了邮箱/地址/号码，请同时用 VS Code 的"全局搜索替换"把 HTML 和 `sitemap.xml`、`llms.txt` 里的旧内容一并替换。
- `logoPath`、`faviconPath` 目前仅作记录。页头使用的是文字 Logo；如需换成图片 Logo，修改各页的 `<a class="brand">` 部分，并替换 `assets/images/logo.png`、`assets/icons/favicon.ico`。

### 开启询盘表单（Formspree）

1. 注册 formspree.io，新建一个表单，邮箱填 marketing@bestarmetal.com。
2. 复制表单网址（形如 `https://formspree.io/f/xxxxxxxx`）。
3. 粘贴到 `config.js` 的 `formspreeEndpoint` 里，上传覆盖。
4. 自己提交一条测试询盘，确认邮箱收到后再对外宣传。
5. 上传附件功能：我没有确认 Formspree 免费版是否支持，所以表单里没有放上传框，页面提示客户把文件发到邮箱。

## 9. 发布后建议做的事

- 在 Google Search Console 和 Bing Webmaster Tools 验证域名，并提交 `https://bestarmetal.com/sitemap.xml`。
- 用 Google 的"富媒体搜索结果测试"检查结构化数据。

## 10. 还需要你提供或确认的内容

**照片（优先用真实生产照片）**：工厂外观、车间全景、激光切割、焊接、抛光、折弯、CAD/3D 截图、工程图、打样样品、成品家具、商用不锈钢产品、定制金属展示架。

**需要你确认的信息**：

- 抛光（Grinding & Polishing）、喷涂、PVD 电镀分别哪些是自己做、哪些是外协？目前网站按"核心加工"和"协调表面处理"分组，没有声明具体哪一项是自有。
- 是否有真实的认证、客户案例、工厂面积等？目前一律没有写。
- LinkedIn / Facebook / Instagram 链接。
- 正式 Logo 文件。
- Formspree 表单地址。

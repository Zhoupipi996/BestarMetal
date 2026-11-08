# BESTAR METAL 官网

纯 HTML / CSS / JavaScript，部署在 GitHub Pages。

## 更新到 GitHub
1. 把这个文件夹里的**所有内容**（含 `assets` 文件夹和 `.nojekyll`）上传到仓库根目录，覆盖旧文件。
2. 等 1–3 分钟，强制刷新网站，逐页检查。

## Canonical 与域名
- canonical、og:url、sitemap、robots、llms.txt 都指向 `https://bestarmetal.com`。
- 域名公开后：`Settings → Pages → Custom domain` 填 `bestarmetal.com`，配置 DNS，等 HTTPS 生效，保留 GitHub 生成的 `CNAME` 文件，然后在 Google Search Console 提交 `https://bestarmetal.com/sitemap.xml`。
- 注意：域名生效之前，github.io 上的页面 canonical 指向尚未打开的域名，搜索引擎可能忽略它；社交分享图（og:image）也暂时无法加载。

## 换成真实图片
- 覆盖 `assets/images/` 里的同名文件，或修改 HTML 里的路径；同时更新 `alt` 和 `width`/`height`。
- 建议尺寸：首页主图 1920×1080；章节图 1200×800；产品卡片 900×675。
- 页脚的示意图说明在每个 HTML 文件的页脚中，换成真实照片后可删除。
- 视频：见 `manufacturing.html` 顶部注释，文件上传后再加 `<video>` 标签。

## 修改联系信息
改 `config.js`，并在 HTML、`sitemap.xml`、`llms.txt` 里搜索替换旧信息。

## 开启询盘表单
把 Formspree 地址填入 `config.js` 的 `formspreeEndpoint`。未配置时表单只提示"未发送"，并提供邮件备用链接。

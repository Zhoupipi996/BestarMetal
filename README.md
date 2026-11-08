# BESTAR METAL 官网（升级版）

纯 HTML / CSS / JavaScript，部署在 GitHub Pages。完整的审计、验证和部署清单见上一级的 `BestarMetal-升级报告.md`。

## 这一版做了什么
- 修复图片：恢复了被提交 `465d6d0` 删除的 `assets/images/`，并把页面引用改成实际文件名。
- 全站改为图片主导的版面；设计工程、制造、打样页新增视觉流程。
- 所有图片带"Illustrative image"（示意图）标签；概念插图带"Conceptual illustration"标签。
- canonical、sitemap、robots、llms.txt 暂时指向 `https://zhoupipi996.github.io/BestarMetal`。

## 更新到 GitHub
1. 把这个文件夹里的**所有内容**（含 `assets` 文件夹和 `.nojekyll`）上传到仓库根目录，覆盖旧文件。
2. 等 1–3 分钟，强制刷新网站，逐页检查。

## 绑定 bestarmetal.com 之后（重要）
1. `Settings → Pages → Custom domain` 填 `bestarmetal.com`，配置 DNS，等 HTTPS 生效；保留 GitHub 自动生成的 `CNAME` 文件。
2. 域名能打开网站后，用 VS Code 全局查找替换：
   `https://zhoupipi996.github.io/BestarMetal` → `https://bestarmetal.com`
   （范围包括所有 `.html`、`sitemap.xml`、`robots.txt`、`llms.txt`）
3. 在 Google Search Console 添加域名并提交 `https://bestarmetal.com/sitemap.xml`。

## 换成真实图片
- 示意图的标签是 CSS 加的：在 HTML 里把 `class="fig ill ..."` 的 `ill` 删掉即可去掉标签。
- 建议尺寸：首页主图 1920×1080；章节图 1200×800；产品卡片 900×675。
- 换图后请同步更新该图片的 `alt` 文字和 `width`/`height` 属性。
- 加视频：见 `manufacturing.html` 顶部注释。只有文件真的上传后才加 `<video>` 标签。

## 修改联系信息
改 `config.js`，并同时在 HTML、`sitemap.xml`、`llms.txt` 里搜索替换旧信息（HTML 里保留了一份静态文字给搜索引擎）。

## 开启询盘表单
把 Formspree 地址填入 `config.js` 的 `formspreeEndpoint`。未配置时，表单只会提示"未发送"，并提供邮件备用链接。

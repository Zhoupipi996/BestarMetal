# bestarmetal.com 域名迁移清单

现状：所有页面的 canonical、og:url、sitemap、robots、llms.txt 和结构化数据都已指向 `https://bestarmetal.com`。仓库里目前没有 `CNAME` 文件；我无法确认该域名是否已经能打开网站。

- [ ] 1. 在域名注册商配置 DNS（具体记录以 GitHub Pages 设置页和 GitHub 官方文档当前显示为准）。
- [ ] 2. 仓库 `Settings → Pages → Custom domain` 填 `bestarmetal.com`，保留 GitHub 生成的 `CNAME` 文件。
- [ ] 3. 等 HTTPS 证书生效，勾选 `Enforce HTTPS`。
- [ ] 4. 用浏览器打开 `https://bestarmetal.com/`，确认新站正常显示（不是旧页面或错误页）。
- [ ] 5. 随机打开 3–4 个页面，用"查看网页源代码"确认 canonical 为 `https://bestarmetal.com/...`。
- [ ] 6. 打开 `https://bestarmetal.com/sitemap.xml` 和 `robots.txt`，确认可访问。
- [ ] 7. 确认 `https://bestarmetal.com/assets/images/og-default.png` 可以打开（社交分享图）。
- [ ] 8. 在 Google Search Console 添加 `bestarmetal.com` 并提交 sitemap；Bing Webmaster Tools 同理。
- [ ] 9. 绑定后检查 github.io 地址是否跳转到 bestarmetal.com（我记得 GitHub 通常会跳转，请实测）。
- [ ] 10. 不要同时让两个域名各自被索引。
- [ ] 11. 在域名生效之前，github.io 页面的 canonical 指向尚未打开的域名，搜索引擎可能忽略它；社交分享图也暂时加载不出来。

# 🔗 URL 缩短工具

一个简单、快速、免费的 URL 缩短在线工具，无需后端，完全运行在浏览器中。

## ✨ 功能特点

- ✅ **快速缩短** - 一键将长 URL 转换为简短链接
- ✅ **复制功能** - 一键复制缩短后的 URL 到剪贴板
- ✅ **历史记录** - 自动保存最近 20 条缩短记录
- ✅ **本地存储** - 使用浏览器 LocalStorage，无需服务器
- ✅ **响应式设计** - 完美支持桌面和移动设备
- ✅ **无依赖** - 纯 HTML/CSS/JavaScript，加载快
- ✅ **隐私安全** - 所有数据存储在本地，不上传任何信息

## 🚀 快速开始

### 在线使用

访问项目的 GitHub Pages 版本（如果已发布）：

```
https://sixboy700.github.io/url-shortener
```

### 本地运行

1. 克隆仓库
```bash
git clone https://github.com/sixboy700/url-shortener.git
cd url-shortener
```

2. 打开 `index.html`
```bash
# 使用 Python 启动简单 HTTP 服务器
python -m http.server 8000

# 或使用 Node.js 的 http-server
npx http-server

# 或直接在浏览器中打开
open index.html
```

3. 在浏览器中访问
```
http://localhost:8000
```

## 📖 使用方法

1. **输入长 URL** - 在输入框中粘贴你要缩短的 URL
2. **点击缩短** - 点击"缩短 URL"按钮
3. **复制链接** - 点击"📋 复制"按钮复制缩短后的 URL
4. **查看历史** - 所有缩短过的 URL 会自动保存在历史记录中

## 🎨 界面预览

- 现代化设计，紫色渐变背景
- 简洁清晰的布局
- 流畅的动画效果
- 完全响应式设计

## 📱 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动浏览器（iOS Safari, Chrome Mobile 等）

## 🔧 技术栈

- **前端**: HTML5, CSS3, Vanilla JavaScript
- **存储**: Browser LocalStorage
- **无依赖**: 不需要任何框架或库

## 📦 项目结构

```
url-shortener/
├── index.html       # 主 HTML 文件
├── style.css        # 样式文件
├── script.js        # 逻辑代码
├── README.md        # 项目说明文档
├── LICENSE          # MIT 许可证
└── .gitignore       # Git 忽略文件
```

## 🎯 核心功能说明

### URL 验证
- 使用浏览器原生 URL API 验证输入
- 自动检测无效的 URL 格式

### 短码生成
- 随机生成 6 位字符短码
- 使用大小写字母和数字组合
- 确保唯一性

### 数据持久化
- 使用 LocalStorage 存储数据
- 自动保存最近 20 条记录
- 支持手动清空历史

### 安全性
- 所有数据在浏览器本地处理
- 无网络请求，隐私完全保护
- HTML 转义防止 XSS 攻击

## 🌐 部署到 GitHub Pages

1. 确保仓库是公开的
2. 进入仓库设置
3. 找到 "Pages" 选项
4. 选择 "main" 分支作为发布源
5. 等待几分钟，你的应用就会在线上线

访问地址：`https://sixboy700.github.io/url-shortener`

## 💡 未来计划

- [ ] 支持自定义短码
- [ ] 支持 QR 码生成
- [ ] 支持导出历史为 CSV
- [ ] 支持深色主题
- [ ] 添加 PWA 支持
- [ ] 国际化多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

## 👨‍💻 作者

[@sixboy700](https://github.com/sixboy700)

---

**如果有帮助，请给个 ⭐ Star 支持一下！**
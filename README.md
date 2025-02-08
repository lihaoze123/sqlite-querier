<div align="center">
  <img src="https://cdn.simpleicons.org/sqlite/003B57" alt="SQLite Logo" width="100"/>
  <h1>SQLite 在线查询工具</h1>
  <p>直接在浏览器中执行 SQLite 查询的轻量级工具</p>
</div>

# SQLite 查询工具

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react&style=for-the-badge)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&style=for-the-badge)](https://www.sqlite.org/)

## ✨ 功能特性
- 📝 内置 SQL 编辑器（语法高亮 + 自动补全）
- 📁 支持上传 SQLite 数据库文件（.db/.sqlite）
- ⚡ 实时执行 SQL 查询并显示表格结果
- 📥 查询结果导出为 CSV/JSON 格式

## 🚀 快速开始
### 环境要求
- Node.js 18+
- pnpm 8+

### 安装运行
```bash
# 克隆项目
git clone https://github.com/your-username/sqlite-query-tool.git

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 生产构建
pnpm build
pnpm start
```

## 🛠️ 使用说明
1. **上传数据库**  
   点击"上传"按钮，选择本地的 SQLite 数据库文件（.db 或 .sqlite）

2. **编写 SQL**  
   在编辑器中输入要执行的 SQL 语句

3. **执行查询**  
   点击"执行"按钮运行 SQL

4. **查看结果**  
   - 成功查询：表格形式展示结果，支持排序和分页
   - 执行错误：红色高亮显示错误信息
   - 空结果：显示"无数据"提示

## 🤝 参与贡献
欢迎通过 Issue 或 PR 参与改进：
1. Fork 项目仓库
2. 创建特性分支 (`git checkout -b feature/your-feature`)
3. 提交修改 (`git commit -m 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 📄 开源协议
本项目基于 [MIT License](LICENSE) 开源

## 📌 注意事项
1. 数据库文件仅存储在服务端内存中，刷新页面后需要重新上传
2. 复杂查询可能导致浏览器卡顿，建议使用 LIMIT 限制结果集
3. 请勿上传包含敏感信息的数据库文件
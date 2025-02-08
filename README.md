<div align="center">
  <img src="https://cdn.simpleicons.org/sqlite/003B57" alt="SQLite Logo" width="100"/>
  <h1>SQLite Online Query Tool</h1>
  <p>A lightweight tool for executing SQLite queries directly in your browser</p>
</div>

English | [简体中文](./README-zh_CN.md)

# SQLite Query Tool

[![React](https://img.shields.io/badge/React-18.0-blue?logo=react&style=for-the-badge)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css&style=for-the-badge)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3.0-003B57?logo=sqlite&style=for-the-badge)](https://www.sqlite.org/)

## ✨ Features
- 📝 Built-in SQL Editor (Syntax highlighting + Auto-completion)
- 📁 Support for SQLite database file upload (.db/.sqlite)
- ⚡ Real-time SQL query execution with table results
- 📥 Export query results to CSV/JSON formats

## 🚀 Quick Start
### Prerequisites
- Node.js 18+
- pnpm 8+

### Installation & Running
```bash
# Clone the repository
git clone https://github.com/your-username/sqlite-query-tool.git

# Install dependencies
pnpm install

# Development mode
pnpm dev

# Production build
pnpm build
pnpm start
```

## 🛠️ Usage Guide
1. **Upload Database**  
   Click the "Upload" button and select a local SQLite database file (.db or .sqlite)

2. **Write SQL**  
   Enter your SQL query in the editor

3. **Execute Query**  
   Click the "Execute" button to run the SQL

4. **View Results**  
   - Successful query: Results displayed in a table with sorting and pagination
   - Execution error: Error message highlighted in red
   - Empty result: "No data" message shown

## 🤝 Contributing
Contributions via Issues or PRs are welcome:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

## 📄 License
This project is licensed under the [MIT License](LICENSE)

## 📌 Notes
1. Database files are only stored in server memory and need to be re-uploaded after page refresh
2. Complex queries may cause browser lag, consider using LIMIT to restrict result sets
3. Do not upload database files containing sensitive information
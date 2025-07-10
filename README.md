# 💰 CashClarity

**CashClarity** is a personal finance tracking application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to securely log in, track their incomes and expenses, filter transactions, and view a summary of their financial data.

## 🔗 Live Demo

🌐 [https://expense-tracker-ui-theta.vercel.app/login](https://expense-tracker-ui-theta.vercel.app/)

## 🚀 Features

- ✅ User authentication with **JWT**
- 🔐 Secure password hashing with **bcrypt**
- ➕ Add income and expense entries
- 🗂️ Filter entries by type (income or expense)
- 📊 Summary section displaying:
  - Total income
  - Total expense
  - Net balance
- 🧾 View and delete transactions
- ⚡ Instant feedback with **Toaster notifications**
- 💻 Clean and responsive UI built with **TailwindCSS**

## 🛠️ Tech Stack

- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **Notifications:** react-toastify
- **Tools:** Postman, MongoDB Atlas

## 🧑‍💻 Installation & Setup

### Clone the repository

```bash
https://github.com/prajwal-tarpe/ExpenseTracker.git
cd cashclarity
```
### Backend Setup

```bash
cd Backend
npm install
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```
### 🔐 Environment Variables

In the /backend/.env file:

```bash
PORT = ...
MONGO_CONN = ...
JWT_SECRET= ...
```

# Foodstore
**Foodstore** is a simple e-commerce web application designed for food ordering. Built as a portfolio project, this platform allows users to browse products, place orders, track their order status, and manage shipping addresses. Admins can manage products, categories, and tags, making it a complete small-scale food store management system.

## ✨ Features
### 👤 For Users
- Sign up / Log in
- Browse and order food items
- Manage shipping addresses
- View current and past orders
- Checkout with invoice generation

### 🛠️ For Admins
- Manage product list (create, edit, delete)
- Manage product categories and tags
- Access full order history and details

## 🧰 Tech Stack
### Frontend
- **React.js**
- **Bootstrap 5**
- **React Redux** – state management
- **React Router** – routing/navigation
### Backend
- **Express.js** – REST API server
- **Sequelize** – ORM
- **MongoDB** – database

## 🚀 Getting Started
### ⚙️ Prerequisites
- Node.js (v18 or later)
- MongoDB running locally or in the cloud

### 📁 Project Structure
```
foodstore/
├── client/ # Frontend (React.js)
├── server/ # Backend (Express.js)
└── README.md
```

### 🔧 Installation & Run (Local Development)
#### 1. Clone the repository
```
git clone https://github.com/ablahum/foodstore.git
cd foodstore
```
#### 2. Set up environment
```
cp .env.example .env
```
Then write your database credentials
#### 3. Install dependencies
Client (Frontend):
```
cd client
npm install
npm start
```

Client (Backend):
```
cd server
npm install
npm run dev
```

## 🖼️ Screenshots
<details>
  <summary>A glimpse of screenshots of the apps</summary>

  ### Home page
  ![home](https://github.com/ablahum/foodstore/blob/main/server/public/assets/home.png)
  ![cart](https://github.com/ablahum/foodstore/blob/main/server/public/assets/cart.png)
  ### Profile page
  ![profile](https://github.com/ablahum/foodstore/blob/main/server/public/assets/profile.png)
  ### Checkout page
  ![checkout](https://github.com/ablahum/foodstore/blob/main/server/public/assets/checkout.png)
  ![checkout-modal](https://github.com/ablahum/foodstore/blob/main/server/public/assets/checkout-modal.png)
  ### Invoice page
  ![profile](https://github.com/ablahum/foodstore/blob/main/server/public/assets/invoice.png)
  ### Order history page
  ![profile](https://github.com/ablahum/foodstore/blob/main/server/public/assets/order-history.png)
  ### Login page
  ![profile](https://github.com/ablahum/foodstore/blob/main/server/public/assets/login.png)
  ### Register page
  ![profile](https://github.com/ablahum/foodstore/blob/main/server/public/assets/register.png)
</details>

## 📌 Notes
- This project is currently not open for contributions.
- Built as a portfolio project to demonstrate fullstack development using React + Express.
- No license applied yet.

## 📬 Contact
If you have any questions or feedback, feel free to reach out:

- **Email**: ablahum@proton.me
- **Website**: https://tama-dev.vercel.app
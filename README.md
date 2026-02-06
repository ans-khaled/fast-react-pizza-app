<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# 🍕 Fast React Pizza App

A simple and modern pizza ordering application built with **React**, where users can order one or more pizzas easily without creating an account.

The application focuses on clean architecture, feature-based structure, and modern React patterns using **React Router** and **Redux Toolkit**.

---

## 📌 Project Overview

The company already provides a backend API, and the goal of this project is to build the **front-end (visible part)** of the application.

Users can:
- Browse a dynamic pizza menu fetched from an API
- Add multiple pizzas to a cart
- Place an order with basic information
- Track their order using a unique order ID
- Mark orders as **priority** (with extra cost)

---

## 🧠 Application Planning

### 1️⃣ Requirements & Features

- No authentication or login required
- Users only enter their **name** before using the app
- Pizza menu is **dynamic** and fetched from an API
- Users can add/remove pizzas to/from cart ✅
- Order requires:
  - Name
  - Phone number
  - Address
- Optional **GPS location** for easier delivery
- Priority order option (+20% of cart price)
- Orders are sent via **POST request**
- Payment is **on delivery**
- Each order has a **unique ID**
- Users can mark an order as priority **after placing it**

---

## 🧩 Feature Categories

- **User**
- **Menu**
- **Cart**
- **Order**

---

## 📄 Pages

1. Home  
2. Menu  
3. Cart  
4. Create New Order  
5. Order Lookup  

---

## 🛠️ Technologies Used

| Purpose | Technology |
|------|-----------|
| Framework | React |
| Routing & Data Fetching | React Router |
| Styling | Tailwind CSS |
| Global UI State | Redux Toolkit |
| Async Logic | Redux Thunks |
| Remote State | React Router Loaders & Actions |

---

## 🗂️ Project Structure (Feature-Based)

>>>>>>> eda0f1fce02548dca804c632916a8f72f47495cc

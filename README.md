# 💌 Saraha App – Anonymous Messaging Platform

Welcome to **Saraha App**, a secure and anonymous feedback platform inspired by the concept of candid expression. Built with **Node.js**, **Express**, and **MongoDB**, Saraha allows users to send and receive anonymous messages without revealing their identity.

---

## 🚀 Features

- 🔐 **User Authentication** – Register and log in securely.
- 📨 **Send/Receive Anonymous Messages** – Anyone with your profile link can send you anonymous messages.
- 📬 **Inbox Management** – View all received messages in a clean, user-friendly format.
- 📡 **RESTful API** – Built with clear, testable endpoints and proper error handling.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT
- **Email Service:** Nodemailer
- **API Docs & Testing:** Postman
- **Environment Config:** dotenv

---

## 📂 Project Structure

📦 Saraha

┣📂config/ #environment setup

┣📂src

┃ ┣ 📂DB /# Database  setup and Mongoose schemas

┃ ┣ 📂middlewares /# Global error handler and  auth

┃ ┣ 📂modules /#  Express routes

┃ ┣ 📂service/ # Email service

┃ ┣ 📂utilities /# Reusable utilities

┃ ┗ 📜app.controller.js # Route handlers

┗ 📜index.js #App entry point

---

## ⚙️ Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/NayeraGad/saraha_app.git
cd saraha_app
```
### 2. Install dependencies

```bash
npm install
```
### 3. Configure environment variables
Create a .env file based on .env.example:
```
PORT=
URI_ONLINE=
SALT_ROUNDS=
SECRET_KEY=
SIGNATURE_CONFIRMATION=
SIGNATURE_UNFREEZE=
SIGNATURE_Token_ADMIN=
SIGNATURE_Token_USER="
EMAIL=
PASSWORD=
```
### 4. Start the server
``` 
npm start 
```

---

## 🌐 Deployment Info
The backend is hosted on Vercel.

⚠️ Note: Due to Vercel limitations for serverless functions:
Email sending may be slow or unreliable.

---

## 📬 Postman API Documentation
You can test all the endpoints via Postman:  

[![Run in Postman](https://run.pstmn.io/button.svg)](https://documenter.getpostman.com/view/36251048/2sAYQamrHb)

---

## 🧠 Ideas for Improvement
- Add rate limiting for anonymous messages
- Enable WebSocket support for real-time notifications
- Implement message moderation tools
- Add support for frontend UI (React or Next.js)


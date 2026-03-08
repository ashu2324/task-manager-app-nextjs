# Task Manager Dashboard

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State%20Management-purple?logo=redux)
![Material UI](https://img.shields.io/badge/Material%20UI-Component%20Library-blue?logo=mui)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Utility%20CSS-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Types-blue?logo=typescript)

A modern **Task Management Dashboard** built with **Next.js, Redux Toolkit, Material UI, and Tailwind CSS**.

This application allows users to **create projects, manage tasks, track progress, and organize workflows efficiently.**

---

## 🌐 Live Demo

You can try the deployed application here:

👉 **https://task-manager-app-nextjs-ivory.vercel.app/**

---

## 🚀 Features

- User Authentication (Sign Up / Login)
- JWT-based authentication
- Create and manage projects
- Add multiple tasks to a project
- Update task status (Todo / In Progress / Done)
- Edit and delete tasks
- Expandable project view using Accordion
- Dashboard statistics overview
- Responsive UI
- Redux Toolkit global state management
- Clean reusable component architecture

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript

### State Management
- Redux Toolkit

### UI & Styling
- Material UI
- Tailwind CSS

### Backend API
- Next.js API Routes

### Data Storage
- In-memory / local storage (as per assignment requirements)

---

### ⚙️ Setup Instructions

Follow the steps below to run the project locally.

1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/task-manager-app-nextjs.git

Navigate into the project directory:

cd task-manager-app-nextjs
2️⃣ Install Dependencies

Install all required packages using:

npm install

or

yarn install
3️⃣ Run the Development Server

Start the application:

npm run dev

The application will run on:

http://localhost:3000

Open the browser and navigate to the above URL.

---

### 📂 Folder Structure

The project follows a modular and scalable structure using the Next.js App Router architecture.

task-manager-app-nextjs

│

├── app

│   ├── api

│   │   ├── auth

│   │   │   ├── login

│   │   │   └── signup

│   │   ├── projects

│   │   └── tasks

│   │

│   ├── dashboard

│   ├── login

│   ├── signup

│   └── not-found

│

├── components

│   ├── ProjectCard.tsx

│   ├── TaskCard.tsx

│   ├── TaskDialog.tsx

│   ├── CreateProjectDialog.tsx

│   └── StatsCard.tsx

│

├── redux

│   ├── store.ts

│   └── slices

│       ├── projectSlice.ts

│       ├── taskSlice.ts

│       └── authSlice.ts

│

├── hooks

│   └── useAuth.ts

│

├── types

│   └── index.ts

│

├── utils

│   └── storage.ts

│

├── public

│

└── README.md

---

### 📜 Available Scripts

Run the development server:

> npm run dev

Build the project:

> npm run build

Start the production build:

> npm start

Run ESLint:

> npm run lint

---

### 📌 Notes

* Authentication is implemented using JWT stored in localStorage.

* Redux Toolkit is used for global state management of projects and tasks.

* The application uses Next.js API routes as a lightweight backend layer.

* Data is stored using in-memory storage/local utilities, as required for the assignment.

---

### 👨‍💻 Author

Developed as part of a technical assignment demonstrating modern Next.js, Redux Toolkit, and scalable frontend architecture.

---

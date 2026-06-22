# MediBridge Frontend

A modern healthcare appointment booking frontend built with **Next.js**, **Tailwind CSS**, and **TanStack Query**.

---

## 🚀 Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Hook Form
- Zod
- NextAuth (Authentication)

---

## 📦 Features

- Patient & Doctor authentication
- Browse doctors and specialties
- Book appointments
- View appointment history
- Responsive UI for all devices
- Protected routes (role-based access)

---

## 🛠️ Installation

```bash
git clone <frontend-repo-url>
cd frontend
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

---

## 🧑‍💻 Run Development Server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
src/
 ├── app/
 ├── components/
 ├── features/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── styles/
 └── utils/
```

---

## 🔐 Authentication

Uses NextAuth for:

- Login
- Session management
- Protected routes

---

## 📡 API Integration

All API requests are handled using TanStack Query with a centralized API service layer.

---

## 🧪 Linting

```bash
npm run lint
```

---

## 📄 License

MIT

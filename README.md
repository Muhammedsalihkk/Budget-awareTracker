# Budget Tracker – MERN Stack  
A clean and responsive budget tracking application that helps users manage categories, monthly budgets, and expenses with reports and secure authentication.

---

## Live Demo (Hosted on Free Services)
- **Frontend (Vercel):** https://budget-awaretracker.vercel.app  
- **Backend API (Render):** https://budget-awaretracker.onrender.com  

---

## Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- TailwindCSS
- Axios
- Formik + Yup
- Ant Design Components

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Joi Validation

---

## Features
- User Registration & Login (JWT-based)
- Manage Categories
- Create & Edit Monthly Budgets
- View Category-based Budgets
- Delete Budgets & Categories
- Responsive UI (Mobile-first)
- Protected Routes

---

## Installation (Run Locally)

### Clone the repository
git clone https://github.com/Muhammedsalihkk/Budget-awareTracker.git

shell
Copy code

### Setup Frontend
cd budget-aware-client
npm install
npm run dev

shell
Copy code

### Setup Backend
cd budget-aware-server
npm install
npm run dev

yaml
Copy code

---

## Backend `.env`
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

shell
Copy code

## Frontend `.env` (Vite)
VITE_API_BASE_URL=http://localhost:5000/api
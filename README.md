# Imaze – Media Management Platform

A full-stack web application for secure image and video management with user authentication, cloud storage integration, and a modern responsive UI.

---

## Features

- **User Authentication** – Secure signup, login, and logout with JWT tokens and password encryption
- **Media Upload** – Upload and store images and videos with Cloudinary integration
- **Media Management** – View, organize, and delete your uploaded media files
- **User Profiles** – Custom avatars and account settings
- **Real-time UI** – Responsive design with toast notifications and loading states
- **Secure Access** – Protected routes and token-based authorization

---

## Tech Stack

### Frontend
- **React 19** 
- **Vite**
- **Redux Toolkit** 
- **Tailwind CSS** 
- **React Router** 

### Backend
- **Hono** 
- **Bun** 
- **MongoDB** 
- **Mongoose**
- **Cloudinary**
- **JWT** 


### DevOps & Build
- **Turbo** 
- **TypeScript**

---

## Project Structure

```
imaze/
├── client/                    # React frontend 
│   ├── src/
│   │   ├── pages/            # Login, Signup, Dashboard, Image Viewer
│   │   ├── components/       # UI components and layouts
│   │   ├── feature/          # Redux slices (auth state)
│   │   ├── hooks/            # Custom hooks (API calls)
│   │   ├── services/         # Cloudinary integration
│   │   └── app/              # Redux store configuration
│   └── package.json
├── server/                    # Hono + Bun backend
│   ├── src/
│   │   ├── controllers/      # Business logic for auth, data, settings
│   │   ├── routes/           # API endpoints
│   │   ├── models/           # MongoDB schemas (User, Image, Video)
│   │   ├── middleware/       # Auth token verification
│   │   ├── services/         # Cloudinary operations
│   │   ├── config/           # Database and Cloudinary config
│   │   └── utils/            # JWT token generation
│   └── package.json
├── shared/                    # Shared utilities 
└── turbo.json                # Monorepo configuration
```

---

## Quick Start

### Prerequisites
- Bun 1.2.4+
- MongoDB instance 
- Cloudinary account

### Installation

```bash
# Clone and navigate
cd imaze

# Install dependencies (Bun or npm)
bun install
# OR
npm install

# Configure environment variables
## Environment Variables

```env
# Server
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/imaze
JWT_SECRET=your_secret_key_min_32_chars
CLOUDINARY_NAME=cloudinary_account_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client (Vite)
VITE_CLOUDINARY_CLOUD_NAME=cloudinary_cloud_name
```

---

### Running Locally

```bash
# Start both client and server
bun run  dev

# OR individually
bun run dev:client  # Frontend on http://localhost:5173
bun run dev:server  # Backend on http://localhost:3000
```


## Screenshots & Demo

### Login Page
[Add screenshot here]

### Dashboard (Media Gallery)
[Add screenshot here]

### Image Viewer Modal
[Add screenshot here]

### User Settings
[Add screenshot here]

### Demo Video
[Embed or link demo video here showing upload, view, delete flow]

---


## API Endpoints

### Authentication
- `POST /auth/signup` – Register new user with avatar upload
- `POST /auth/login` – User login with credentials
- `GET /auth/logout` – Logout (requires auth token)
- `GET /auth/me` – Get current user profile (requires auth token)

### Media Management
- `POST /api/upload` – Upload image/video (requires auth token)
- `POST /api/fetch` – Retrieve user's media collection (requires auth token)
- `POST /api/delete` – Delete media by ID (requires auth token)

### User Settings
- `GET /settings` – Manage account preferences

---

## Security Features

- **Password Encryption** – Bcryptjs hashing with salt rounds
- **JWT Tokens** – Secure, httpOnly cookies for authentication
- **Protected Routes** – Frontend route guards and backend middleware
- **CORS Configuration** – Restricted to frontend origin
- **Token Expiration** – 24-hour token validity
- **Input Validation** – Required field checks before processing




**Built by Anand**

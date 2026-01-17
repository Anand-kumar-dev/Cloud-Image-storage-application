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
<img width="1363" height="644" alt="image" src="https://github.com/user-attachments/assets/9b55a35d-e68c-49f4-b6c0-0108f5bcae68" />

### Signup Page
<img width="1366" height="642" alt="image" src="https://github.com/user-attachments/assets/5cab3d04-f3a4-4f73-ae66-0940f15afc9b" />

### Dashboard (Media Gallery)
<img width="1346" height="636" alt="image" src="https://github.com/user-attachments/assets/7ef59121-6d4b-4788-bd5d-91229145734c" />
<img width="1346" height="615" alt="image" src="https://github.com/user-attachments/assets/966d4789-ff3a-4b55-82ef-c8ed3dfa64d3" />

### Image Viewer Modal
<img width="1362" height="607" alt="image" src="https://github.com/user-attachments/assets/69ce6464-f1da-41ce-bd89-d23cf84b1097" />

### User Settings
<img width="1365" height="630" alt="image" src="https://github.com/user-attachments/assets/d2ccf490-dd79-4a9b-8f51-96df48717b97" />

### Demo Video
https://github.com/user-attachments/assets/e176794a-c09e-4920-b380-3ee5017d243c

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

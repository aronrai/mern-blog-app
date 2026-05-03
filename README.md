# 📝 Blogspot: A Full-Stack MERN Platform

**Blogspot** is a high-performance, community-driven blogging platform designed for seamless storytelling. It bridges the gap between a sleek, modern reader experience and a robust content management system for creators.

## ✨ Key Features

- **Secure Authentication:** Stateless user sessions using **JWT** and secure password hashing.
- **Media Management:** Cloud-integrated image hosting via **Cloudinary** for lightning-fast asset delivery.
- **Dynamic UX:** **Infinite scroll** and optimized pagination for a fluid content discovery experience.
- **Data Integrity:** Strict server-side schema validation using **Joi** to ensure reliable API interactions.
- **Modern Design:** A "Modern & Clean" responsive UI built with **Tailwind CSS**.
- **Global State:** Lightweight, reactive frontend state management powered by **Zustand**.

## 🛠️ Technical Stack

| Layer        | Technologies                                     |
| ------------ | ------------------------------------------------ |
| **Frontend** | React, Tailwind CSS, Zustand, React Helmet Async |
| **Backend**  | Node.js, Express.js, Joi Validation              |
| **Database** | MongoDB with Mongoose ODM                        |
| **Storage**  | Cloudinary API                                   |

## ⚙️ Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/aronrai/mern-blog-app.git
cd mern-blog-app

# Install Backend & Frontend dependencies
cd server && npm install
cd client && npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory and populate the following:

```env
# Server Config
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret_key

# Cloudinary Config
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Client Config
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Launch

```bash
cd server && node app
cd client && npm run dev
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

**Developed with precision by [Aron Rai](https://github.com/aronrai)**

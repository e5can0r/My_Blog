# 📝 MyBlog

A modern and minimalist blogging platform built with **React**, **Appwrite**, and **Tailwind CSS**. Users can create, read, update, and delete blog posts — all in a clean, responsive UI.


---

## 🚀 Features

### Core Features
- 🔐 User Authentication (Signup/Login/Logout)
- 📰 Post CRUD (Create, Read, Update, Delete)
- 📸 Image upload with featured image preview
- 🧠 Rich Text Editor for post content
- 🧩 Responsive layout using Tailwind CSS
- 📦 Fully integrated with Appwrite for backend
- ✅ Protected routes with route guards
- ⚙️ CI-ready, structured project for scalability

### ✨ Enhanced Features (New!)
- 🔍 **Real-time Search** - Filter posts by title and content instantly
- 📅 **Rich Post Cards** - Author avatars, publish dates, reading time estimates
- ⚡ **Smart Loading States** - Professional skeleton screens and animations
- 🔔 **Toast Notifications** - Success, error, warning, and info messages
- 📱 **Social Sharing** - Share posts on Twitter, Facebook, LinkedIn
- 📊 **Post Analytics** - Reading time calculation and metadata display
- 🖱️ **Interactive Elements** - Hover animations, loading spinners
- 📋 **Copy Link Feature** - One-click link copying to clipboard
- 🎭 **Empty States** - Helpful guidance when no content exists
- 🔄 **Error Handling** - Graceful error states with user feedback

---

## 🛠️ Tech Stack

| Tech         | Usage                                |
|--------------|---------------------------------------|
| **React**    | Frontend UI                          |
| **Redux**    | Global state management (auth, etc.) |
| **Appwrite** | Authentication, Database, Storage    |
| **Tailwind** | Styling and responsive layout        |
| **React Router** | Client-side routing              |
| **Vite**     | Fast build & dev server              |

---

## 🧑‍💻 Getting Started
### 1. Clone the Repository


```bash
git clone https://github.com/your-username/cleanblog.git
cd cleanblog 
```

### 2.Install Dependencies
```bash
npm install
```

### 3.Configure Appwrite
- Setup an Appwrite project
- Create:
    Users
    Database with a collection posts
    Storage Bucket for images
- Update your Appwrite config in /src/appwrite/configuration.js
```js
const PROJECT_ID = 'your-project-id';
const DATABASE_ID = 'your-database-id';
const COLLECTION_ID = 'your-collection-id';
const BUCKET_ID = 'your-bucket-id';
```

### 4.Run the App
```bash
npm run dev
```


## 📁 Project Structure
```bash
src/
├── appwrite/           # Appwrite service handlers
├── components/         # Reusable UI components
│   ├── Search.jsx      # 🔍 Search functionality
│   ├── Toast.jsx       # 🔔 Notification system
│   ├── LoadingSkeleton.jsx # ⚡ Loading animations
│   ├── PostCard.jsx    # 📅 Enhanced post previews
│   └── Button.jsx      # 🎨 Multi-variant buttons
├── pages/              # Route pages (enhanced with new features)
├── store/              # Redux slices
├── utils/              # 🛠️ Helper functions
│   └── helpers.js      # Date formatting, validation, etc.
├── main.jsx            # Entry point
├── App.jsx             # Root component
└── index.css           # Tailwind + global styles
```



## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the **MIT License**.


# 📝 MyBlog

A modern and minimalist blogging platform built with **React**, **Appwrite**, and **Tailwind CSS**. Users can create, read, update, and delete blog posts — all in a clean, responsive UI.


---

## 🚀 Features

- 🔐 User Authentication (Signup/Login/Logout)
- 📰 Post CRUD (Create, Read, Update, Delete)
- 📸 Image upload with featured image preview
- 🧠 Rich Text Editor for post content
- 🧩 Responsive layout using Tailwind CSS
- 📦 Fully integrated with Appwrite for backend
- ✅ Protected routes with route guards
- ⚙️ CI-ready, structured project for scalability

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

## Project Structure
```bash
src/
├── appwrite/           # Appwrite service handlers
├── components/         # Reusable UI components
├── pages/              # Route pages
├── store/              # Redux slices
├── main.jsx            # Entry point
├── App.jsx             # Root component
└── index.css           # Tailwind + global styles
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the **MIT License**.  


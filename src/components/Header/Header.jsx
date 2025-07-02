import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const location = useLocation();


  return (
<header className="bg-slate-200 border-b-4 border-black shadow-md">
      <Container>
        <nav className="flex items-center justify-between py-5">
            {/* Logo and Title */}
          
            <Link to="/" className="flex items-center space-x-3">
            {/* Icon */}
            <svg className="w-[48px] h-[48px] text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M15.514 3.293a1 1 0 0 0-1.415 0L12.151 5.24a.93.93 0 0 1 .056.052l6.5 6.5a.97.97 0 0 1 .052.056L20.707 9.9a1 1 0 0 0 0-1.415l-5.193-5.193ZM7.004 8.27l3.892-1.46 6.293 6.293-1.46 3.893a1 1 0 0 1-.603.591l-9.494 3.355a1 1 0 0 1-.98-.18l6.452-6.453a1 1 0 0 0-1.414-1.414l-6.453 6.452a1 1 0 0 1-.18-.98l3.355-9.494a1 1 0 0 1 .591-.603Z" clip-rule="evenodd"/>
            </svg>
            {/* Title + Tagline */}
            <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-gray-800 tracking-wide">MyBlog</span>
            <span className="text-sm text-gray-500 -mt-1">Write. Share. Inspire.</span>
            </div>
            </Link>


          {/* Navigation Links */}
          <ul className="flex items-center gap-4 text-gray-700">
            {navItems.map((item) =>
            item.active ? (
            <li key={item.name}>
            <button
            onClick={() => navigate(item.slug)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 font-medium ${
            location.pathname === item.slug
            ? "bg-indigo-600 text-white shadow-md"
            : "hover:bg-indigo-100"
          }`}
        >
          {item.name}
        </button>
      </li>
    ) : null
  )}
  {authStatus && (
    <li>
      <LogoutBtn />
    </li>
  )}
</ul>

        </nav>
      </Container>
    </header>
  );
}

export default Header;

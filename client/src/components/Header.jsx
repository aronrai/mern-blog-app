import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuthStore from "../store/userAuthStore";

const Header = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const user = useAuthStore((state) => state.user);
  const userLoading = useAuthStore((state) => state.userLoading);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const { pathname } = useLocation();
  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);
  return (
    <header className="flex justify-between items-center h-16 bg-white mx-4 sm:mx-8 md:mx-16 border-b border-gray-200 sticky top-0 z-100">
      <div className="text-2xl font-heading font-bold">Blogspot</div>
      <nav>
        <ul className="text-sm text-gray-700 hidden md:flex items-center gap-4">
          <li className="flex flex-col group">
            <Link
              to="/"
              className={`hover:text-black transition-colors border-b-2 ${currentPage === "/" ? "border-blue-500 text-black" : "border-transparent"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`hover:text-black transition-colors border-b-2 ${currentPage === "/about" ? "border-blue-500 text-black" : "border-transparent"}`}
            >
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/my-blogs"
                  className={`hover:text-black transition-colors border-b-2 ${currentPage === "/my-blogs" ? "border-blue-500 text-black" : "border-transparent"}`}
                >
                  My Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/write-blog"
                  className={`hover:text-black transition-colors border-b-2 ${currentPage === "/write-blog" ? "border-blue-500 text-black" : "border-transparent"}`}
                >
                  Write Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className={`hover:text-black transition-colors border-b-2 ${currentPage === "/profile" ? "border-blue-500 text-black" : "border-transparent"}`}
                >
                  Profile
                </Link>
              </li>
            </>
          ) : userLoading ? null : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`hover:text-black transition-colors border-b-2 ${currentPage === "/login" ? "border-blue-500 text-black" : "border-transparent"}`}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={`hover:text-black transition-colors border-b-2 ${currentPage === "/signup" ? "border-blue-500 text-black" : "border-transparent"}`}
                >
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul
          className={`md:hidden fixed text-sm bg-gray-100 h-screen w-[65vw] pl-4 flex flex-col gap-2 top-0 ${isOpen ? "right-0" : "-right-[65vw]"} transition-all duration-150 ease-in`}
        >
          <li className="h-16 flex justify-end items-center mr-4">
            <button
              className="w-6 flex flex-col gap-1 md:hidden"
              onClick={toggleMenu}
            >
              <span className="w-full h-0.5 bg-black"></span>
              <span className="w-[50%] h-0.5 bg-black ml-auto"></span>
              <span className="w-full h-0.5 bg-black"></span>
            </button>
          </li>
          <li>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>
              About
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/my-blogs" onClick={toggleMenu}>
                  My Blogs
                </Link>
              </li>
              <li>
                <Link to="/write-blog" onClick={toggleMenu}>
                  Write Blog
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={toggleMenu}>
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={toggleMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" onClick={toggleMenu}>
                  Get Started
                </Link>
              </li>
            </>
          )}
        </ul>
        <button
          className="w-6 flex flex-col gap-1 md:hidden"
          onClick={toggleMenu}
        >
          <span className="w-full h-0.5 bg-black"></span>
          <span className="w-[50%] h-0.5 bg-black"></span>
          <span className="w-full h-0.5 bg-black"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;

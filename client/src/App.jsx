import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MyBlogs from "./pages/MyBlogs";
import WriteBlog from "./pages/WriteBlog";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import useBlogStore from "./store/useBlogStore";
import useAuthStore from "./store/userAuthStore";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Blog from "./pages/Blog";
import About from "./pages/About";
import SCrollToTop from "./components/ScrollToTop";
import VerifyAccount from "./pages/VerifyAccount";
import EditBlog from "./pages/EditBlog";

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const userLoading = useAuthStore((state) => state.userLoading);
  const page = useBlogStore((state) => state.page);
  const fetchBlogs = useBlogStore((state) => state.fetchBlogs);
  const blogsLoading = useBlogStore((state) => state.blogsLoading);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs, page]);
  if (userLoading || blogsLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 font-serif tracking-widest uppercase text-sm animate-pulse">
          Loading...
        </p>
      </div>
    );
  }
  return (
    <>
      <SCrollToTop />
      <Header />
      {
        <main className="overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs/:slug" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/verify/:verification-token"
              element={<VerifyAccount />}
            />
            <Route element={<ProtectedRoutes />}>
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/write-blog" element={<WriteBlog />} />
              <Route path="/edit-blog/:slug" element={<EditBlog />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      }
      <footer className="h-8 flex justify-center items-center tracking-wide">
        <p className="text-sm">&copy;{new Date().getFullYear()} Aron Rai.</p>
      </footer>
    </>
  );
};

export default App;

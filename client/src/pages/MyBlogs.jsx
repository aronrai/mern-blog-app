import useBlogStore from "../store/useBlogStore";
import BlogCard from "../components/BlogCard";
import { useEffect } from "react";
import useAuthStore from "../store/userAuthStore";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyBlogs = () => {
  const myBlogs = useBlogStore((state) => state.myBlogs);
  const myBlogsLoading = useBlogStore((state) => state.myBlogsLoading);
  const fetchMyBlogs = useBlogStore((state) => state.fetchMyBlogs);
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    fetchMyBlogs();
  }, [fetchMyBlogs, myBlogs]);
  return (
    <section className="px-4 sm:px-16 md:px-20 lg:px-32 max-w-300 mx-auto py-16 flex flex-col gap-12 min-h-[calc(100vh-96px)]">
      <Helmet>
        <title>Blogspot &bull; My Blogs</title>
      </Helmet>
      {myBlogsLoading ? (
        <div className="text-center my-auto">
          <p className="text-gray-500 font-serif tracking-widest uppercase text-sm animate-pulse">
            Loading...
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-heading font-bold">
            {myBlogs.length === 0
              ? "You haven't written any blogs"
              : "My Blogs"}
          </h1>
          {myBlogs.length === 0 && (
            <button className="w-fit">
              <Link
                to="/write-blog"
                className="text-sm text-blue-500 font-medium underline cursor-pointer"
              >
                Start wtriting...
              </Link>
            </button>
          )}
          <div className="flex flex-col gap-12">
            {myBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} user={user} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MyBlogs;

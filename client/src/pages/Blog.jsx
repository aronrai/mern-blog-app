import { Link, useParams } from "react-router-dom";
import useBlogStore from "../store/useBlogStore";
import formatDate from "../utils/formatDate";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect } from "react";

const Blog = () => {
  const { slug } = useParams();
  const fetchBlog = useBlogStore((state) => state.fetchBlog);
  const allBlogs = useBlogStore((state) => state.allBlogs);
  const singleBlog = useBlogStore((state) => state.singleBlog);
  const singleBlogLoading = useBlogStore((state) => state.singleBlogLoading);
  useEffect(() => {
    fetchBlog(slug);
  }, [fetchBlog, slug]);
  let blog = allBlogs.find((blog) => blog.slug === slug) || singleBlog;
  if (singleBlogLoading) {
    return (
      <section className="flex justify-center items-center min-h-[calc(100vh-96px)]">
        <p className="text-gray-500 font-heading tracking-widest uppercase text-sm animate-pulse">
          Loading...
        </p>
      </section>
    );
  }
  if (!blog) {
    return (
      <section className="px-4 sm:px-8 md:px-16 py-16 flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-96px)]">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <p className="text-sm text-gray-700">
          Go back to home.{" "}
          <Link to="/" className="text-black underline">
            Home
          </Link>
        </p>
      </section>
    );
  }
  return (
    <section className="px-4 sm:px-8 md:px-32 lg:px-48 py-16 flex flex-col gap-8 min-h-[calc(100vh-96px)]">
      <Link to="/">
        <button>
          <IoMdArrowRoundBack className="text-xl cursor-pointer" />
        </button>
      </Link>
      <h3 className="text-4xl font-heading font-bold">{blog.title}</h3>
      <p className="text-sm">
        {formatDate(blog.createdAt)} &bull; {blog.read} min read
      </p>
      <p className="flex items-center gap-2">
        {blog.tags.map((tag) => (
          <span
            className="text-sm text-gray-700 bg-gray-200 rounded-full px-2 py-0.5"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </p>
      <img
        src={blog.imageUrl}
        alt={`${blog.title} image.`}
        className="w-full aspect-video object-cover object-center"
      />
      <div
        dangerouslySetInnerHTML={{ __html: blog.content }}
        className="[&_p]:text-sm [&_p]:text-gray-600 [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading **:wrap-break-word flex flex-col gap-4 w-full"
      />
      <p>~ {blog.authorId.name}</p>
    </section>
  );
};

export default Blog;

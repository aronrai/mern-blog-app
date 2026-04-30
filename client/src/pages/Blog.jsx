import { Link, useParams } from "react-router-dom";
import useBlogStore from "../store/useBlogStore";
import formatDate from "../utils/formatDate";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Loading from "../components/Loading";

const Blog = () => {
  const { slug } = useParams();
  const allBlogs = useBlogStore((state) => state.allBlogs);
  const [blog, setBlog] = useState(allBlogs.find((blog) => blog.slug === slug));
  const [loading, setLoading] = useState(!blog);

  useEffect(() => {
    if (!blog) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/blogs/${slug}`);
          const data = response.data;
          setBlog(data.data);
        } catch (err) {
          console.error(`Error: ${err.response.data.message}`);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [slug, blog]);

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-[calc(100vh-96px)]">
        <Loading />
      </section>
    );
  }

  if (!blog && loading === false) {
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
      <h1 className="text-4xl font-heading font-bold">{blog.title}</h1>
      <p className="text-md font-heading">
        {formatDate(blog.createdAt)} &bull; {blog.read} min read
      </p>
      <p className="flex items-center gap-2">
        {blog.tags.map((tag) => (
          <span
            className="text-sm font-heading bg-gray-200 rounded-full px-2 py-0.5"
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
        className="
          prose **:wrap-break-word max-w-none
          prose-p:text-sm
          prose-li:text-sm
          prose-em:text-xl prose-em:font-montez
          prose-strong:text-sm prose-strong:font-bold
          prose-a:text-sm prose-a:text-blue-500
          prose-headings:font-heading prose-headings:font-bold
          prose-h1:text-3xl
          prose-h2:text-2xl
          prose-h3:text-xl
        "
      />
      <p className="text-md font-heading">~ {blog.authorId.name}</p>
    </section>
  );
};

export default Blog;

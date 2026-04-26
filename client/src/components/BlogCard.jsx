import { Link, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import useBlogStore from "../store/useBlogStore";

const BlogCard = ({ blog, user }) => {
  const {
    title,
    content,
    tags,
    imageUrl,
    authorId,
    createdAt,
    read,
    slug,
    _id,
  } = blog;
  const deleteBlog = useBlogStore((state) => state.deleteBlog);
  const deleting = useBlogStore((state) => state.deleting);
  const deletingId = useBlogStore((state) => state.deletingId);
  const navigate = useNavigate();
  if (user) {
    return (
      <section className="flex flex-col justify-between sm:flex-row gap-4 sm:border-b border-gray-300 pb-8">
        <div className="flex flex-col gap-2 group">
          <p className="flex items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </p>
          <h3 className="text-2xl font-heading font-bold group-hover:underline transition-all duration-150 ease-in-out">
            {title}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: content.slice(0, 200) }}
            className="text-sm text-gray-600"
          />
          <p className="text-sm font-medium">
            {authorId.name} &bull; {formatDate(createdAt)} &bull; {read} min
            read
          </p>
          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                className="text-sm text-white bg-black px-2 py-0.5 rounded-2xl shadow-[0_2px_4px_black] hover:shadow-[0_4px_8px_#333] hover:-translate-y-0.5 cursor-pointer transition-all duration-150 ease-in-out"
                onClick={() => navigate(`/write-blog/${slug}?update=true`)}
              >
                Edit
              </button>
              <button
                className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-2xl shadow-[0_2px_4px_black] hover:shadow-[0_4px_8px_#333] hover:-translate-y-0.5 active:shadow-none active:translate-y-0 cursor-pointer transition-all duration-150 ease-in-out disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-[0_2px_4px_black] disabled:active:shadow-[0_2px_4px_black]"
                onClick={() => deleteBlog(_id)}
                disabled={deleting && deletingId === _id}
              >
                {deleting && deletingId === _id ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
        <img
          src={imageUrl}
          alt={`${title} image`}
          className="w-full sm:w-30 aspect-video my-auto sm:rounded-sm"
        />
        {user && (
          <div className="flex items-center gap-2 sm:hidden mt-1">
            <button
              className="text-sm text-white bg-black px-2 py-0.5 rounded-2xl shadow-[0_2px_4px_black] hover:shadow-[0_4px_8px_#333] hover:-translate-y-0.5 cursor-pointer transition-all duration-150 ease-in-out"
              onClick={() => navigate(`/write-blog/${slug}?update=true`)}
            >
              Edit
            </button>
            <button
              className="text-sm text-white bg-red-600 px-2 py-0.5 rounded-2xl shadow-[0_2px_4px_black] hover:shadow-[0_4px_8px_#333] hover:-translate-y-0.5 active:shadow-none active:translate-y-0 cursor-pointer transition-all duration-150 ease-in-out disabled:bg-gray-400 disabled:hover:translate-y-0 disabled:hover:shadow-[0_2px_4px_black] disabled:active:shadow-[0_2px_4px_black]"
              onClick={() => deleteBlog(_id)}
              disabled={deleting && deletingId === _id}
            >
              {deleting && deletingId === _id ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </section>
    );
  }
  return (
    <Link to={`/blogs/${slug}`}>
      <section className="flex flex-col justify-between sm:flex-row gap-4 sm:border-b border-gray-300 pb-8">
        <div className="flex flex-col gap-2 group">
          <p className="flex items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </p>
          <h3 className="text-2xl font-heading font-bold group-hover:underline transition-all duration-150 ease-in-out">
            {title}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: content.slice(0, 200) }}
            className="text-sm text-gray-600"
          />
          <p className="text-sm font-medium">
            {authorId.name} &bull; {formatDate(createdAt)} &bull; {read} min
            read
          </p>
        </div>
        <img
          src={imageUrl}
          alt={`${title} image`}
          className="w-full sm:w-30 aspect-video my-auto sm:rounded-sm"
        />
      </section>
    </Link>
  );
};

export default BlogCard;

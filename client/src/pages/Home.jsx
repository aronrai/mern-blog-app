import useBlogStore from "../store/useBlogStore";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const allBlogs = useBlogStore((state) => state.allBlogs);
  const allBlogsLoading = useBlogStore((state) => state.allBlogsLoading);
  const pageIncrement = useBlogStore((state) => state.pageIncrement);
  const hasMore = useBlogStore((state) => state.hasMore);
  return (
    <section className="px-4 sm:px-16 md:px-20 lg:px-32 max-w-300 mx-auto py-16 flex flex-col gap-12 min-h-[calc(100vh-96px)]">
      <h1 className="text-5xl md:text-7xl font-heading font-black">
        Stay curious<span className="text-blue-500">.</span>
      </h1>
      <p className="text-xl sm:text-2xl font-montez">
        The world is full of stories waiting to be told. Grab a coffee, stay a
        while, and find something that sparks your imagination.
      </p>
      {allBlogs.length === 0 && allBlogsLoading ? (
        <div className="text-center">
          <p className="text-gray-500 font-heading tracking-widest uppercase text-sm animate-pulse">
            Loading...
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {allBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
      {hasMore && (
        <button
          className="text-sm text-center font-medium cursor-pointer"
          onClick={pageIncrement}
        >
          Load more...
        </button>
      )}
    </section>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { SiVerizon } from "react-icons/si";
import Editor from "../components/Editor";
import useBlogStore from "../store/useBlogStore";
import { Helmet } from "react-helmet-async";
import { useParams, useSearchParams } from "react-router-dom";

const WriteBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "Write here...",
    tags: "",
    image: null,
  });

  const handleBlogDataChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (files && files.length > 0) {
        setBlogData((b) => ({ ...b, [name]: files[0] }));
      }
    } else {
      setBlogData((b) => ({ ...b, [name]: value }));
    }
  };

  const handleQuillChange = (value) => {
    setBlogData((b) => ({ ...b, content: value }));
    console.log(blogData);
  };
  useEffect(() => {
    console.log(blogData);
  });

  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  console.log(slug);
  console.log("Update", searchParams.get("update") === "true");

  const publishing = useBlogStore((state) => state.publishing);
  const publishError = useBlogStore((state) => state.publishError);
  const publishMessage = useBlogStore((state) => state.publishMessage);
  const publishBlog = useBlogStore((state) => state.publishBlog);
  const setPublishError = useBlogStore((state) => state.setPublishError);
  const setPublishMessage = useBlogStore((state) => state.setPublishMessage);
  // const fetchBlog = useBlogStore((state) => state.fetchBlog);
  useEffect(() => {
    if (publishError) {
      const timer = setTimeout(() => {
        setPublishError(null);
      }, 3000);
      return () => clearInterval(timer);
    }
    if (publishMessage) {
      const timer = setTimeout(() => {
        setPublishMessage(null);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [publishError, setPublishError, publishMessage, setPublishMessage]);
  return (
    <section className="px-4 sm:px-8 md:px-32 lg:px-48 py-16 flex flex-col gap-8 min-h-[calc(100vh-96px)]">
      <Helmet>
        <title>Blogspot &bull; Write</title>
      </Helmet>
      <h1 className="text-4xl font-heading font-bold mb-4">
        What's on your mind?
      </h1>
      <p className="text-lg md:text-2xl font-montez">
        Start writing your story below. Your ideas deserve to be seen.
      </p>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-heading font-bold">
          Title
        </label>
        <input
          type="text"
          placeholder="title"
          name="title"
          id="title"
          required
          className="text-sm px-4 py-2 outline-0 rounded-2xl border border-blue-500/50"
          value={blogData.title}
          onChange={handleBlogDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="text-lg font-heading font-bold">
          Content
        </label>
        <div className="text-sm px-4 py-2 outline-0 rounded-2xl border border-blue-500/50">
          <Editor value={blogData.content} onChange={handleQuillChange} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="text-lg font-heading font-bold">
          Tags
        </label>
        <input
          type="text"
          placeholder="tags seperated by ,"
          name="tags"
          id="tags"
          className="text-sm px-4 py-2 outline-0 rounded-2xl border border-blue-500/50"
          value={blogData.tags}
          onChange={handleBlogDataChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="image"
          className="text-lg font-heading font-bold flex items-center gap-1"
        >
          Image {blogData.image && <SiVerizon className="text-green-500" />}
        </label>
        <input
          type="file"
          placeholder="title"
          name="image"
          id="image"
          className="text-sm px-4 py-2 outline-0 rounded-2xl border border-blue-500/50 w-fit"
          onChange={handleBlogDataChange}
        />
      </div>
      {publishError && (
        <div className="text-sm text-red-600">
          <p>{publishError}</p>
        </div>
      )}
      {publishMessage && (
        <div className="text-sm text-blue-500">
          <p>{publishMessage}</p>
        </div>
      )}
      <button
        className="text-sm text-white bg-black rounded-2xl px-4 py-2 mr-auto hover:bg-black/80 active:bg-black transition-all duration-150 ease-in-out cursor-pointer shadow-[0px_3px_3px_black] disabled:bg-black/90 disabled:active:bg-black/90"
        onClick={() => publishBlog(blogData)}
        disabled={publishing}
      >
        {publishing ? "Publishing..." : "Publish"}
      </button>
    </section>
  );
};

export default WriteBlog;

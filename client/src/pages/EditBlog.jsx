import { useEffect, useState } from "react";
import { SiVerizon } from "react-icons/si";
import Editor from "../components/Editor";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import Button from "../components/Button";

const EditBlog = () => {
  const { slug } = useParams();

  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    tags: "",
    image: null,
    _id: "",
  });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${slug}`);
        const data = response.data;
        setBlogData({
          title: data.data.title,
          content: data.data.content,
          tags: data.data.tags,
          image: "",
          _id: data.data._id,
        });
      } catch (err) {
        console.error(`Error: ${err.response.data.message}`);
      }
    };
    fetchBlog();
  }, [slug]);

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
  };

  const updateBlog = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("content", blogData.content);
      formData.append("tags", blogData.tags);
      if (blogData.image) {
        formData.append("image", blogData.image);
      }
      setUpdating(true);
      const response = await api.put(`/blogs/${blogData._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      setError(false);
      setMessage(data.message);
      setBlogData({
        title: "",
        content: "",
        tags: "",
        image: "",
      });
    } catch (err) {
      setError(true);
      setMessage(err.response.data.message);
      console.error(`Error: ${err.response.data.message}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <section className="px-4 sm:px-8 md:px-32 lg:px-48 py-16 flex flex-col gap-8 min-h-[calc(100vh-96px)]">
      <Helmet>
        <title>Blogspot &bull; Write</title>
      </Helmet>
      <h1 className="text-4xl font-heading font-bold mb-4">Refine Your Post</h1>
      <p className="text-xl sm:text-2xl font-montez">
        Fine-tune your message and perfect your story before sharing it with the
        world again.
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
      {message && (
        <p className={`text-sm ${error ? "text-red-600" : "text-blue-500"}`}>
          {message}
        </p>
      )}
      <Button
        button={updating ? "Updating..." : "Update"}
        onclick={updateBlog}
        disabled={updating}
      />
    </section>
  );
};
export default EditBlog;

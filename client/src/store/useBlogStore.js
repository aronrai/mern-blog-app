import { create } from "zustand";
import api from "../api/axiosInstance";

const useBlogStore = create((set, get) => ({
  page: 1,
  singleBlog: null,
  allBlogs: [],
  myBlogs: [],
  singleBlogLoading: true,
  allBlogsLoading: true,
  myBlogsLoading: true,
  singleBlogError: null,
  allBlogsError: null,
  myBlogsError: null,
  deleteBlogError: null,
  hasMore: null,
  publishError: null,
  publishMessage: null,
  publishing: false,
  deleting: null,
  deletingId: null,
  pageIncrement: () => set((state) => ({ page: state.page + 1 })),
  setPublishError: (error) => set({ publishError: error }),
  setPublishMessage: (message) => set({ publishMessage: message }),
  fetchBlog: async (slug) => {
    try {
      const response = await api.get(`/blogs/${slug}`);
      const data = response.data;
      if (!data.success) {
        console.error(`Error: ${data.message}`);
        set({ singleBlogError: data.message });
      }
      set({ singleBlog: data.data });
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
      set({ singleBlogError: err.response.data.message });
    } finally {
      set({ singleBlogLoading: false });
    }
  },
  fetchBlogs: async () => {
    try {
      const { page } = get();
      const response = await api.get(`/blogs?page=${page}`);
      const data = response.data;
      if (!data.success) {
        set({ allBlogsError: data.message });
      }
      set((state) => ({ allBlogs: [...state.allBlogs, ...data.data] }));
      set({ hasMore: data.hasMore });
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
      set({ allBlogsError: err.response.data.message });
    } finally {
      set({ allBlogsLoading: false });
    }
  },
  fetchMyBlogs: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/blogs/my-blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (!data.success) {
        set({ myBlogsError: data.message });
      }
      set({ myBlogs: data.data });
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
      set({ myBlogsError: err.response.data.message });
    } finally {
      set({ myBlogsLoading: false });
    }
  },
  publishBlog: async ({ title, content, tags, image }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      if (image) {
        formData.append("image", image);
      }
      const token = localStorage.getItem("token");
      set({ publishing: true });
      const response = await api.post("/blogs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (!data.success) {
        set({ publishError: data.message });
      }
      set({ publishMessage: data.message });
    } catch (err) {
      console.error(err.response.data.message);
      set({ publishError: err.response.data.message });
    } finally {
      set({ publishing: false });
    }
  },
  deleteBlog: async (id) => {
    try {
      const token = localStorage.getItem("token");
      set({ deleting: true });
      set({ deletingId: id });
      const response = await api.delete(`blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      if (!data.success) {
        alert(data.message);
        set({ deleteBlogError: data.message });
      }
      alert(data.message);
    } catch (err) {
      alert(err.response.data.message);
      set({ deleteBlogError: err.response.data.message });
      console.error(err.response.data.message);
    } finally {
      set({ deleting: false });
      set({ deletingId: null });
    }
  },
}));

export default useBlogStore;

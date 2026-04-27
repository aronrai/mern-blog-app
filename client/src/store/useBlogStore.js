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
  deleting: null,
  deletingId: null,
  pageIncrement: () => set((state) => ({ page: state.page + 1 })),
  setPublishError: (error) => set({ publishError: error }),
  setPublishMessage: (message) => set({ publishMessage: message }),
  fetchBlog: async (slug) => {
    try {
      set({ singleBlog: null });
      set({ singleBlogLoading: true });
      const response = await api.get(`/blogs/${slug}`);
      const data = response.data;
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
      set({ myBlogs: data.data });
    } catch (err) {
      console.error(`Error: ${err.response.data.message}`);
      set({ myBlogsError: err.response.data.message });
    } finally {
      set({ myBlogsLoading: false });
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

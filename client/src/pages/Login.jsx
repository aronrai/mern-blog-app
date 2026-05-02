import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import useAuthStore from "../store/userAuthStore";
import { Helmet } from "react-helmet-async";
import Button from "../components/Button";

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();
  const handleFormDataChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoggingIn(true);
      const response = await api.post("/users/login", formData);
      const data = response.data;
      console.log(data);
      localStorage.setItem("token", data.token);
      setFormData({
        email: "",
        password: "",
      });
      setErrors(null);
      setUser(data.data);
      navigate("/");
    } catch (err) {
      setErrors(err.response.data.message);
      console.log(err.response.data);
    } finally {
      setLoggingIn(false);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-96px)] p-4 sm:px-8 md:px-16">
      <Helmet>
        <title>Blogspot &bull; Login</title>
      </Helmet>
      <h1 className="text-2xl font-heading font-bold">Log in to Blogspot</h1>
      {errors && <p className="text-sm text-red-500">{errors}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="email" className="text-md font-heading font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="name@example.com"
            name="email"
            id="email"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-[0_0_2px] shadow-blue-500/50 rounded-sm"
            value={formData.email}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="password"
            className="text-md font-heading font-medium"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-[0_0_2px] shadow-blue-500/50 rounded-sm"
            value={formData.password}
            onChange={handleFormDataChange}
          />
        </div>
        <button
          className={`text-md text-white font-heading ${loggingIn ? "bg-black/85" : "bg-black hover:bg-black/85 active:bg-black"} px-4 py-1.5 outline-0 rounded-sm cursor-pointer`}
          disabled={loggingIn}
        >
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          SignUp
        </Link>
      </p>
    </section>
  );
};

export default Login;

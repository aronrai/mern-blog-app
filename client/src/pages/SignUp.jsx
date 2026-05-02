import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    console.log(formData);
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password, confirmPassword } = formData;
      if (
        name.length === 0 ||
        email.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0 ||
        password !== confirmPassword
      )
        throw new Error("Passwords did not match.");
      setSigningUp(true);
      const response = await api.post("/users/signup", formData);
      const data = response.data;
      setError(false);
      setMessage(data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.message || err.message);
    } finally {
      setSigningUp(false);
    }
  };
  return (
    <section className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-96px)] p-4 sm:px-8 md:px-16">
      <Helmet>
        <title>Blogspot &bull; Signup</title>
      </Helmet>
      <h1 className="text-2xl font-heading font-bold">Create an account</h1>
      {message && (
        <p className={`text-sm ${error ? "text-red-500" : "text-blue-500"}`}>
          {message}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 w-full max-w-75"
      >
        <div className="flex flex-col gap-0.5">
          <label htmlFor="name" className="text-md font-heading font-medium">
            Name
          </label>
          <input
            type="name"
            placeholder="Jone Doe"
            name="name"
            id="name"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-[0_0_2px] shadow-blue-500/50 rounded-sm"
            value={formData.name}
            onChange={handleFormDataChange}
          />
        </div>
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
        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="confirmPassword"
            className="text-md font-heading font-medium"
          >
            Confirm password
          </label>
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-[0_0_2px] shadow-blue-500/50 rounded-sm"
            value={formData.confirmPassword}
            onChange={handleFormDataChange}
          />
        </div>
        <button
          className={`text-md text-white font-heading ${signingUp ? "bg-black/85" : "bg-black hover:bg-black/85 active:bg-black"} px-4 py-1.5 outline-0 rounded-sm cursor-pointer`}
          disabled={signingUp}
        >
          {signingUp ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default SignUp;

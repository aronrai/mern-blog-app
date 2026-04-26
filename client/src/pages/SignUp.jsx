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
  const [emailMessage, setEmailMessage] = useState(null);
  const [errors, setErrors] = useState(null);
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
        confirmPassword.length === 0
      )
        throw new Error("Please fill all the details");
      setSigningUp(true);
      const response = await api.post("/users/signup", formData);
      const data = response.data;
      setErrors(null);
      setEmailMessage(data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setErrors(err.response.data.message);
      console.log(err.response.data);
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
      {emailMessage && <p className="text-sm text-blue-500">{emailMessage}</p>}
      {errors && <p className="text-sm text-red-500">{errors}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-screen max-w-75"
      >
        <div className="flex justify-between items-center">
          <label htmlFor="name" className="text-md font-heading font-medium">
            Name
          </label>
          <input
            type="name"
            placeholder="Jone Doe"
            name="name"
            id="name"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-sm shadow-blue-500/50 rounded-lg"
            value={formData.name}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <input
            type="email"
            placeholder="name@example.com"
            name="email"
            id="email"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-sm shadow-blue-500/50 rounded-lg"
            value={formData.email}
            onChange={handleFormDataChange}
          />
          <label htmlFor="email" className="text-md font-heading font-medium">
            Email
          </label>
        </div>
        <div className="flex justify-between items-center">
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
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-sm shadow-blue-500/50 rounded-lg"
            value={formData.password}
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex justify-between items-center">
          <input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            id="confirmPassword"
            required
            className="text-sm px-4 py-1.5 outline-0 border border-blue-500/50 focus:shadow-sm shadow-blue-500/50 rounded-lg"
            value={formData.confirmPassword}
            onChange={handleFormDataChange}
          />
          <label
            htmlFor="confirmPassword"
            className="text-md font-heading font-medium"
          >
            Confirm
          </label>
        </div>
        <button
          className="text-md text-white font-heading bg-black hover:bg-black/90 active:bg-black px-4 py-1.5 outline-0 border rounded-lg cursor-pointer disabled:bg-black/85"
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import useAuthStore from "../store/userAuthStore";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const { name, email, createdAt } = user;
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-96px)] p-4 sm:px-8 md:px-16">
      <Helmet>
        <title>Blogspot &bull; Profile</title>
      </Helmet>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-heading font-bold border-b border-gray-200 pb-1 flex justify-between items-center">
          My Account
        </h1>
        <p className="text-sm">Name: {name}</p>
        <p className="text-sm">Email: {email}</p>
        <p className="text-sm">Joined On: {formatDate(createdAt)}</p>
        {toast ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm">Logout from Blogspot?</p>
            <div className="flex items-center gap-4">
              <button
                className="text-sm text-red-600 font-heading font-bold cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  navigate("/login");
                }}
              >
                Logout
              </button>
              <button
                className="text-sm font-heading font-bold cursor-pointer"
                onClick={() => setToast(false)}
              >
                Stay LoggedIn
              </button>
            </div>
          </div>
        ) : (
          <button
            className="text-sm text-red-600 font-heading font-bold mr-auto cursor-pointer"
            onClick={() => setToast(true)}
          >
            Logout
          </button>
        )}
      </div>
    </section>
  );
};

export default Profile;

import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userAuthStore";

const ProtectedRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const userLoading = useAuthStore((state) => state.userLoading);
  if (userLoading) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex justify-center items-center">
        <p className="text-gray-500 font-serif tracking-widest uppercase text-sm animate-pulse">
          Loading...
        </p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;

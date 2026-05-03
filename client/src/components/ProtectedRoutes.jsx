import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/userAuthStore";
import Loading from "./Loading";

const ProtectedRoutes = () => {
  const user = useAuthStore((state) => state.user);
  const userLoading = useAuthStore((state) => state.userLoading);
  if (userLoading) {
    return (
      <div className="min-h-[calc(100vh-96px)] flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;

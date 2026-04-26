import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";

const VerifyAccount = () => {
  const token = useParams();
  const verificationToken = token["verification-token"];
  console.log(verificationToken);
  const [verifying, setVeifying] = useState(true);
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const handleVerifyAccount = async () => {
      try {
        // setVeifying(true);
        const response = await api.get(`/users/verify/${verificationToken}`);
        const data = response.data;
        if (!data.success) {
          console.error(data.message);
          setMessage(data.message);
          setErr(true);
        }
        setMessage(data.message);
        setErr(false);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        setMessage(err.response.data.message);
        setErr(true);
      } finally {
        setVeifying(false);
      }
    };
    handleVerifyAccount();
  }, [verificationToken]);
  return (
    <section className="flex justify-center px-4 py-16 sm:px-8 md:px-32 lg:px-48 items-center min-h-[calc(100vh-96px)]">
      {verifying ? (
        <p className="text-sm text-gray-500 tracking-wide animate-bounce">
          Verifying your account, Please Wait...
        </p>
      ) : (
        <p
          className={`text-md ${err ? "text-red-500" : "text-blue-500"} tracking-wide`}
        >
          {message}
        </p>
      )}
    </section>
  );
};

export default VerifyAccount;

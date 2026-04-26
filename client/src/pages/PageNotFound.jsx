import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <section className="px-4 sm:px-8 md:px-16 py-16 flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-96px)]">
      <Helmet>
        <title>Blogspot &bull; 404</title>
      </Helmet>
      <h1 className="text-2xl font-bold">404, this page doesn't exist!</h1>
      <p className="text-sm text-gray-700">
        Go back to home.{" "}
        <Link to="/" className="text-black underline">
          Home
        </Link>
      </p>
    </section>
  );
};

export default PageNotFound;

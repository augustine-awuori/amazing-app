import { Link } from "react-router-dom";

const NotLoggedInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto p-8  rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-4">
          You're not logged in
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Please log in to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="btn btn-primary py-2 px-4 text-white rounded-lg hover:bg-primary-dark"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="btn btn-secondary py-2 px-4 text-white rounded-lg hover:bg-secondary-dark"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedInPage;

import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-neutral text-center text-white p-4">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">
        You've stumbled into the digital equivalent of a black hole
      </p>
      <p className="text-lg text-gray-400 mb-8">
        Looks like the page you're after isn't here.
        <br />
        Might be a broken link or a typo. Let's fix it!
      </p>
      <button
        className="btn btn-outline btn-primary"
        onClick={() => navigate("/")}
      >
        Go Back Home
      </button>
    </section>
  );
};

export default NotFoundPage;

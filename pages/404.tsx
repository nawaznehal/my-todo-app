import { useRouter } from 'next/router';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/'); // Redirects user to the homepage
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="text-lg text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;

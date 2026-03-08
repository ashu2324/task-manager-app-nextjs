export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>

      <p className="text-gray-600 mb-6">Page not found</p>

      <a href="/dashboard" className="text-blue-600 underline">
        Go Back
      </a>
    </div>
  );
}

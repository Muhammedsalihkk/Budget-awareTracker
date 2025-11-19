const ServerErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Server Error</h1>
      <p className="text-gray-600 text-lg max-w-md">
        Something went wrong on our end.  
        Please try again after some time.
      </p>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Reload
      </button>
    </div>
  );
};

export default ServerErrorPage;

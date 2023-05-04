import { useState } from "react";

const Homepage = () => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    // Handle search logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">The WWW Corp</h1>
      <h2 className="text-2xl mb-4">Search for branch</h2>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter Address or Place"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-cyan-500"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <div className="flex justify-center mt-4">
          <button
            className={`px-10 py-2 bg-cyan-500 text-white font-bold rounded focus:outline-none ${
              !location && "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSearch}
            disabled={!location} //Need to change
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

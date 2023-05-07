import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { getBranchList } from "../fetchers/getBranchList";
import { idToColor } from "../utils/idToColor";
import Map from "../components/Map.jsx";

const MapPage = () => {
  const [branches, setBranches] = useState([]);
  const location = useLocation();

  const selectedPlace = new URLSearchParams(location.search).get("location");

  const { data, error, refetch } = useQuery(["branches"], getBranchList, {
    staleTime: 5000,
  });

  useEffect(() => {
    if (data) {
      setBranches(data);
    }
  }, [data]);

  return (
    <div className="flex h-screen">
      <div className="lg:w-1/4 md:w-1/3 w-1/2 p-4 h-full overflow-y-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">The WWW Corp</h1>
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search for branch"
            className="w-full px-4 py-2 border border-gray-300 rounded-l shadow-sm focus:outline-none focus:border-cyan-500"
          />
          <button className="px-4 py-2 bg-cyan-500 text-white font-bold rounded-r focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
        </div>
        <ul className="list-none p-0">
          {branches.length > 0 &&
            branches.map((branch, index) => (
              <li
                key={branch.id}
                className="py-3 border-b border-gray-300 hover:bg-gray-200"
              >
                <div className="flex items-center">
                  <div
                    className="mx-3 font-bold text-lg h-8 w-8 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: idToColor(branch.id) }}
                  >
                    {index + 1}
                  </div>
                  <div className="w-full">
                    <h2 className="font-bold">{branch.attributes.address}</h2>
                    <p>Distance: 15 km</p>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="lg:w-3/4 md:w-2/3 w-1/2">
        <Map location={selectedPlace} />
      </div>
    </div>
  );
};

export default MapPage;

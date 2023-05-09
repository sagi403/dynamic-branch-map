import PropTypes from "prop-types";
import { idToColor } from "../utils/idToColor";
import { memo } from "react";

const BranchList = ({ visibleMarkers, setSelectedMarker, distances }) => {
  if (!visibleMarkers || visibleMarkers.length === 0) return;

  return visibleMarkers.map((branch, index) => (
    <li
      key={branch.id}
      className="py-3 border-b border-gray-300 hover:bg-gray-200 cursor-pointer"
      onClick={() => setSelectedMarker(branch)}
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
          <p>Distance: {distances[index]}</p>
        </div>
      </div>
    </li>
  ));
};

BranchList.propTypes = {
  visibleMarkers: PropTypes.array,
  setSelectedMarker: PropTypes.func,
  distances: PropTypes.array,
};

const MemoizedBranchList = memo(BranchList);
export default MemoizedBranchList;

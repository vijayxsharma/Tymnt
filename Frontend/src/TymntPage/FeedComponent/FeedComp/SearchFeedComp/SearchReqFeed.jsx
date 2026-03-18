import { IoSearchOutline } from "react-icons/io5";
import "./searchFeed.css";
import {
  searchReqAccToCategory,
  searchReqAccToDesc,
} from "../../../../Utility/FeedSlice";
import { useDispatch } from "react-redux";
const SearchReqFeed = () => {
  const dispatch = useDispatch();
  const categories = [
    "All",
    "Emotional",
    "Assignment",
    "Household",
    "Delivery",
    "Food",
    "Skilled",
    "Cloths",
    "Queueing",
  ];
  return (
    <div className="tasks-container">
      <div className="search-box">
        <IoSearchOutline className="search-icon" />
        <input
          type="text"
          placeholder="Search requests..."
          onChange={(e) => dispatch(searchReqAccToDesc(e.target.value))}
        />
      </div>

      <div className="category-list">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => dispatch(searchReqAccToCategory(category))}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchReqFeed;

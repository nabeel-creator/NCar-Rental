import { useDispatch, useSelector } from "react-redux";
import {
  setSearchText,
  setFilter,
  resetFilters,
} from "./CatSlice/carslice.jsx";
import { Search, Calendar, CheckCircle, ChevronRight } from "lucide-react";
import { toggleIsOpen } from "./toggleSlice/toggleslice.jsx";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { searchText, filters } = useSelector((state) => state.car);
  const isOpen = useSelector((state) => state.toggle.isOpen);
  
  const handleToggle = () => {
    dispatch(toggleIsOpen());
  };
  
  return (
    <aside
      className={`${
        isOpen ? "w-80" : "w-16"
      } bg-black/60 backdrop-blur-xl border-r border-lime-500/20 transition-[width] duration-200 ease-out relative flex-shrink-0`}
    >
      {/* Collapsed State - Just Icon */}
      <div 
        className={`${isOpen ? "hidden" : "flex"} items-start mt-10 justify-center h-full cursor-pointer`}
        onClick={handleToggle}
      >
        <ChevronRight className="text-lime-400" size={25} />
      </div>

      
      <div className={`${isOpen ? "block" : "hidden"} p-6 space-y-6 h-full overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-lime-400">Filters</h2>
          <button 
            onClick={handleToggle}
            className="text-gray-400 hover:text-lime-400 transition-colors"
          >
            <ChevronRight className="rotate-180" size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Search className="inline mr-2" size={16} />
            Search Cars
          </label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            placeholder="Search by name..."
            className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white placeholder-gray-500"
          />
        </div>

        {/* Year Filter */}
        <div onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <Calendar className="inline mr-2" size={16} />
            Year
          </label>
          <select
            value={filters.year}
            className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white"
            onChange={(e) =>
              dispatch(setFilter({ key: "year", value: e.target.value }))
            }
          >
            <option value="all">All Years</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div onClick={(e) => e.stopPropagation()}>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            <CheckCircle className="inline mr-2" size={16} />
            Availability
          </label>
          <select
            value={filters.availability}
            className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white"
            onChange={(e) =>
              dispatch(
                setFilter({ key: "availability", value: e.target.value })
              )
            }
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="not-available">Not Available</option>
          </select>
        </div>

        {/* Reset Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(resetFilters());
          }}
          className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 rounded-lg transition-all"
          style={{ boxShadow: "0 0 20px rgba(132, 204, 22, 0.3)" }}
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

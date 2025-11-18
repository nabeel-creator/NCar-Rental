import { useState, useEffect } from "react";
import api from "./api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar.jsx";

const Body = () => {
  const [cars, setCars] = useState([]);
  const { searchText, filters } = useSelector((state) => state.car);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars/list");
        setCars(response.data);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };
    fetchCars();
  }, []);

  const filtercars = cars.filter((car) => {
    const matchesSearchText = car.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesAvailability =
      filters.availability === "all"
        ? true
        : filters.availability === "available"
        ? car.available
        : !car.available;
    const matchesYear =
      filters.year === "all" ? true : car.year.toString() === filters.year;
    return matchesSearchText && matchesAvailability && matchesYear;
  });

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex">
      {/* Background Pattern */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(132, 204, 22, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(132, 204, 22, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      ></div>

      {/* Decorative Blobs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl pointer-events-none"></div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 relative overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-3xl font-bold text-white">All Cars</h3>
          </div>
          <div className="text-gray-400 text-sm">
            {filtercars.length} {filtercars.length === 1 ? "car" : "cars"} found
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtercars.map((car) => (
            <Link to={`/cars/${car.id}`} key={car.id}>
              <div className="group bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg overflow-hidden hover:border-lime-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      car.images?.length
                        ? car.images[0].image.startsWith("http")
                          ? car.images[0].image
                          : `http://127.0.0.1:8000${car.images[0].image}`
                        : "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400"
                    }
                    alt={car.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    {car.Active ? (
                      <span className="bg-lime-500/90 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="bg-red-500/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-lg font-bold text-white mb-1 truncate">
                    {car.name} - {car.model}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">Year: {car.year}</p>

                  {/* Features */}
                  {car.features && car.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {car.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="inline-block bg-lime-500/20 border border-lime-500/30 text-lime-400 text-xs px-2 py-1 rounded"
                          title={feat}
                        >
                          {feat}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className="inline-block bg-gray-700/50 text-gray-400 text-xs px-2 py-1 rounded">
                          +{car.features.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filtercars.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-500 text-center">
              <svg
                className="w-24 h-24 mx-auto mb-4 opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xl font-semibold text-gray-400 mb-2">No cars found</p>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Body;
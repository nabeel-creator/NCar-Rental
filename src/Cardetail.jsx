import React from "react";
import api from "./api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Calendar } from "lucide-react";
import img from "./assets/sasha-pleshco-WPIO9sFnahk-unsplash.jpg";

const Cardetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [rentalData, setRentalData] = useState({
    start_date: "",
    end_date: "",
  });
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    comment: "",
    rating: "5",
  });

  useEffect(() => {
    if (car?.showroom) {
      api
        .get(`/cars/showroom/${car.showroom}/reviews/?car_id=${car.id}`)
        .then((res) => setReviews(res.data))
        .catch((err) => console.log(err));
    }
  }, [car]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await api.get(`/cars/id/${id}/`);
        setCar(response.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-xl font-semibold text-lime-400">Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await api.post(
        `/cars/showroom/${car.showroom}/reviews-create/`,
        {
          ...formData,
          car: car.id,
        }
      );
      setReviews((prev) => [...prev, response.data]);
      setFormData({
        comment: "",
        rating: "5",
      });
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "fill-lime-400 text-lime-400" : "text-gray-600"}
      />
    ));
  };

  const calculateDays = () => {
    if (!rentalData.start_date || !rentalData.end_date) return 0;
    const start = new Date(rentalData.start_date);
    const end = new Date(rentalData.end_date);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const totalPrice = calculateDays() * car.price;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background img*/}

      <div
        className="fixed inset-0 opacity-60 blur-sm "
        style={{
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundImage: `url(${img})`,
        }}
      ></div>

      {/* Decorative Blobs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="h-23 bg-zinc-900"></div>
      {/* Hero Section with Image */}
      <div className="relative w-full h-96">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <img
          src={
            car.images?.length
              ? car.images[0].image.startsWith("http")
                ? car.images[0].image
                : `${import.meta.env.VITE_API_URL}${car.images[0].image}`
              : "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"
          }
          alt={`${car.name} ${car.model}`}
          className="w-full h-full object-cover opacity-89"
        />
        <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md border border-lime-500/30 text-white px-6 py-3 rounded-lg">
          <div className="text-sm font-medium text-lime-400">Starting at</div>
          <div
            className="text-4xl font-bold text-lime-400"
            style={{ textShadow: "0 0 20px rgba(132, 204, 22, 0.5)" }}
          >
            Rs {car.price}
          </div>
          <div className="text-sm text-gray-300">Per Day</div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white">
                {car.name} - {car.model}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {renderStars(Math.round(averageRating))}
                </div>
                <span className="text-sm text-gray-400">
                  {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </span>
                <span className="text-sm text-lime-400">• {car.year}</span>
              </div>
            </div>
            {/* Features & Specifications */}
            {car.features && car.features.length > 0 && (
              <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-lime-400">
                  Features & Specifications
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {car.features.map((feature, index) => (
                    <div
                      key={index}
                      className="bg-black/60 border border-lime-500/30 rounded-lg p-3 hover:border-lime-500/50 transition-all hover:shadow-lg hover:shadow-lime-500/10"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 bg-lime-400 rounded-full flex-shrink-0"
                          style={{
                            boxShadow: "0 0 8px rgba(132, 204, 22, 0.6)",
                          }}
                        ></div>
                        <span className="text-sm font-medium text-gray-200">
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3 text-lime-400">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Reviews Section */}
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-lime-400">
                Customer Reviews ({reviews.length})
              </h2>

              {reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No reviews yet. Be the first to review!
                </p>
              ) : (
                <div className="space-y-4 mb-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-lime-500/10 pb-4 last:border-0"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-lime-500/20 border border-lime-500/30 text-lime-400 font-semibold flex-shrink-0">
                          {(
                            (review.user || "?").toString().trim().charAt(0) ||
                            "?"
                          ).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">
                              {review.user}
                            </span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Review Form */}
              <div className="border-t border-lime-500/20 pt-6">
                <h3 className="text-lg font-semibold mb-4 text-lime-400">
                  Write a Review
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Rating
                    </label>
                    <select
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white"
                    >
                      <option value="5">5 - Excellent</option>
                      <option value="4">4 - Very Good</option>
                      <option value="3">3 - Good</option>
                      <option value="2">2 - Fair</option>
                      <option value="1">1 - Poor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                      placeholder="Share your experience with this car..."
                      className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none min-h-24 resize-none text-white placeholder-gray-500"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-2.5 rounded-lg font-medium transition-all"
                    style={{ boxShadow: "0 0 20px rgba(132, 204, 22, 0.3)" }}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Book This Car
              </h2>

              <div className="mb-6 p-4 bg-lime-500/10 border border-lime-500/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Daily Rate</div>
                <div
                  className="text-3xl font-bold text-lime-400"
                  style={{ textShadow: "0 0 15px rgba(132, 204, 22, 0.4)" }}
                >
                  Rs {car.price}
                </div>
                <div className="text-sm text-gray-500">per day</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <Calendar className="inline mr-1" size={16} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={rentalData.start_date}
                    onChange={(e) =>
                      setRentalData({
                        ...rentalData,
                        start_date: e.target.value,
                      })
                    }
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    <Calendar className="inline mr-1" size={16} />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={rentalData.end_date}
                    onChange={(e) =>
                      setRentalData({ ...rentalData, end_date: e.target.value })
                    }
                    className="w-full bg-black/60 border border-lime-500/30 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-lime-500 focus:border-lime-500 outline-none text-white"
                    min={
                      rentalData.start_date ||
                      new Date().toISOString().split("T")[0]
                    }
                  />
                </div>
              </div>

              {calculateDays() > 0 && (
                <div className="mb-6 p-4 bg-black/40 border border-lime-500/20 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration</span>
                    <span className="font-semibold text-white">
                      {calculateDays()} days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Daily rate</span>
                    <span className="font-semibold text-white">
                      Rs {car.price}
                    </span>
                  </div>
                  <div className="border-t border-lime-500/20 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-white">Total</span>
                      <span
                        className="text-xl font-bold text-lime-400"
                        style={{
                          textShadow: "0 0 15px rgba(132, 204, 22, 0.4)",
                        }}
                      >
                        Rs {totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  if (!rentalData.start_date || !rentalData.end_date) {
                    alert("Please select start and end dates");
                    return;
                  }
                  navigate(
                    `/rent/confirm/${car.id}?start=${rentalData.start_date}&end=${rentalData.end_date}`
                  );
                }}
                className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3.5 rounded-lg transition-all"
                style={{ boxShadow: "0 0 25px rgba(132, 204, 22, 0.4)" }}
              >
                Proceed to Booking
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 24 hours before pickup
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardetail;

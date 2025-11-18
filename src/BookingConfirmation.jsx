import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import api from "./api";
import { useState, useEffect } from "react";
import { Calendar, CheckCircle, ArrowLeft } from "lucide-react";

const BookingConfirm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const start = params.get("start");
  const end = params.get("end");
  const [car, setCar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/cars/id/${id}/`).then((res) => setCar(res.data));
  }, [id]);

  const calculateDays = () => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await api.post(`/cars/booking/create/`, {
        car: id,
        start_date: start,
        end_date: end,
      });
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-xl font-semibold text-lime-400">Loading...</div>
      </div>
    );
  }

  const days = calculateDays();
  const totalPrice = days * car.price;

  return (
    <div className="min-h-screen bg-black relative overflow-hidden py-8 px-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#84cc16" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Decorative Blobs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-lime-500 rounded-full opacity-10 blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-lime-400 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Details
          </button>
          <h1 className="text-3xl font-bold text-white">Confirm Your Booking</h1>
          <p className="text-gray-400 mt-2">Review your rental details before confirming</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Car Details Card */}
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <img
                  src={
                    car.images?.length
                      ? car.images[0].image.startsWith("http")
                        ? car.images[0].image
                        : `http://127.0.0.1:8000${car.images[0].image}`
                      : "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"
                  }
                  alt={`${car.name} ${car.model}`}
                  className="w-full sm:w-48 h-48 object-cover opacity-80"
                />
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {car.name} - {car.model}
                      </h2>
                      <p className="text-gray-400 mt-1">{car.year}</p>
                    </div>
                    <div className="bg-lime-500/20 border border-lime-500/30 text-lime-400 px-3 py-1 rounded-full text-sm font-semibold">
                      Rs {car.price}/day
                    </div>
                  </div>
                  {car.description && (
                    <p className="text-gray-400 text-sm mt-3 line-clamp-2">{car.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Rental Details Card */}
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-lime-400 mb-4 flex items-center">
                <Calendar className="mr-2" size={24} />
                Rental Details
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-32 text-gray-400 font-medium">Pick-up</div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{formatDate(start)}</div>
                    <div className="text-sm text-gray-500 mt-1">10:00 AM</div>
                  </div>
                </div>

                <div className="border-l-2 border-lime-500 h-8 ml-16" style={{boxShadow: '0 0 10px rgba(132, 204, 22, 0.3)'}}></div>

                <div className="flex items-start">
                  <div className="w-32 text-gray-400 font-medium">Drop-off</div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{formatDate(end)}</div>
                    <div className="text-sm text-gray-500 mt-1">10:00 AM</div>
                  </div>
                </div>

                <div className="border-t border-lime-500/20 pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 font-medium">Total Duration</div>
                    <div className="font-semibold text-white text-lg">
                      {days} {days === 1 ? "Day" : "Days"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-lime-500/5 backdrop-blur-md border border-lime-500/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-lime-400 mb-3">Important Information</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-lime-400" />
                  <span>Valid driver's license required at pick-up</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-lime-400" />
                  <span>Fuel tank should be returned at the same level</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-lime-400" />
                  <span>Free cancellation up to 24 hours before pick-up</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-lime-400" />
                  <span>Late returns may incur additional charges</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-black/40 backdrop-blur-md border border-lime-500/20 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Daily Rate</span>
                  <span className="font-semibold text-white">Rs {car.price}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Number of Days</span>
                  <span className="font-semibold text-white">{days}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold text-white">Rs {totalPrice}</span>
                </div>

                <div className="border-t border-lime-500/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Amount</span>
                    <span className="text-2xl font-bold text-lime-400" style={{textShadow: '0 0 15px rgba(132, 204, 22, 0.5)'}}>
                      Rs {totalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">All taxes and fees included</p>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-lg font-semibold transition-all ${
                  isSubmitting
                    ? "bg-gray-700 cursor-not-allowed text-gray-400"
                    : "bg-lime-500 hover:bg-lime-600 text-black"
                }`}
                style={!isSubmitting ? {boxShadow: '0 0 25px rgba(132, 204, 22, 0.4)'} : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm Booking"
                )}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By confirming, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirm;
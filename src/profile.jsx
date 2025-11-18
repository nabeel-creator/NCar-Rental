import React, { useEffect, useState } from "react";
import api from "./api";
import { ACCESS_TOKEN } from "./constans";
import { Mail, Phone, MapPin, Calendar, DollarSign, Car, CheckCircle, Clock, XCircle } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndBookings = async () => {
      try {
        const access = localStorage.getItem(ACCESS_TOKEN);
        if (!access) return;

        // fetch user info
        const userRes = await api.get("/user/view/");
        setUser(userRes.data);

        // fetch bookings
        const bookingRes = await api.get("/cars/booking/my/");
        setBookings(bookingRes.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400 min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse">Loading your profile...</div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle size={16} className="text-green-500" />;
      case "pending":
        return <Clock size={16} className="text-yellow-500" />;
      case "completed":
        return <CheckCircle size={16} className="text-lime-500" />;
      default:
        return <XCircle size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen text-white bg-zinc-950 p-6">
        <div className="h-22"></div>
      <div className="max-w-5xl mx-auto">
        {/* User Profile Card */}
        {user && (
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 border-2 border-lime-500 rounded-xl p-8 mb-10 shadow-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Avatar */}
              <div className="w-32 h-32 flex items-center justify-center rounded-full bg-lime-500 text-gray-900 font-bold text-5xl shadow-lg ring-4 ring-lime-500/30 flex-shrink-0">
                {((user.username || "?").toString().trim().charAt(0) || "?").toUpperCase()}
              </div>

              {/* User Details */}
              <div className="flex-1">
                <h1 className="text-4xl font-black text-white mb-1">
                  {user.username}
                </h1>
                <p className="text-lime-500 font-semibold mb-4">Member Account</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-lg border border-gray-700">
                    <Mail size={20} className="text-lime-500" />
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm font-medium text-white">{user.email}</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-lg border border-gray-700">
                      <Phone size={20} className="text-lime-500" />
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm font-medium text-white">{user.phone}</p>
                      </div>
                    </div>
                  )}

                  {user.location && (
                    <div className="flex items-center gap-3 bg-zinc-900 p-3 rounded-lg border border-gray-700">
                      <MapPin size={20} className="text-lime-500" />
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-sm font-medium text-white">{user.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 bg-zinc-900/10 p-3 rounded-lg border border-lime-500/30">
                    <Car size={20} className="text-lime-500" />
                    <div>
                      <p className="text-xs text-lime-400 font-semibold">Total Rentals</p>
                      <p className="text-2xl font-black text-lime-500">{bookings.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rentals Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-lime-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-white">My Rentals</h2>
            <span className="ml-auto bg-lime-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
              {bookings.length}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
              <Car size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-300 text-lg font-semibold mb-2">
                No rentals yet
              </p>
              <p className="text-gray-500">
                Start your adventure and book a car today!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 hover:shadow-xl hover:shadow-lime-500/10 transition-all duration-300 hover:border-lime-500 group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-lime-500 transition-colors">
                        {booking.car_name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(booking.status)}
                        <span
                          className={`text-xs font-bold uppercase tracking-wide ${
                            booking.status === "active"
                              ? "text-green-500"
                              : booking.status === "pending"
                              ? "text-yellow-500"
                              : booking.status === "completed"
                              ? "text-lime-500"
                              : "text-gray-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-gray-700 to-transparent mb-4"></div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    {/* Start Date */}
                    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <Calendar size={20} className="text-lime-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 font-semibold">FROM</p>
                        <p className="text-sm font-black text-white">
                          {new Date(booking.start_date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* End Date */}
                    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <Calendar size={20} className="text-lime-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 font-semibold">TO</p>
                        <p className="text-sm font-black text-white">
                          {new Date(booking.end_date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    {booking.total_price && (
                      <div className="flex items-center gap-4 p-2 rounded-lg bg-lime-500/10 border border-lime-500/30">
                        <DollarSign size={20} className="text-lime-500 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs text-lime-400 font-semibold">TOTAL COST</p>
                          <p className="text-lg font-black text-lime-500">
                            Rs {booking.total_price}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
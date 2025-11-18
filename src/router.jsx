import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./protectedRoute.jsx";  
import Login from "./login.jsx";
import Regester from "./regester.jsx";
import Notfound from "./notfound.jsx";
import BookingConfirm from "./BookingConfirmation.jsx";
import Cardetail from "./Cardetail.jsx";
import UserProfile from "./profile.jsx";
import Landing from "./landing.jsx";
import Header from "./Header1.jsx";
import Footer from "./footer.jsx";
import ContactPage from "./contact.jsx";

function RegesterandLogout(){
  localStorage.clear();
  return (<Regester />);
}

const RootLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const AuthLayout = () => (
  <Outlet />
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cars/:id",
        element: <ProtectedRoute><Cardetail /></ProtectedRoute>,
      },
      {
        path: "/rent/confirm/:id",
        element: <ProtectedRoute><BookingConfirm /></ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute> <UserProfile /></ProtectedRoute>,
      },
       {
        path: "/contact",
        element: <ProtectedRoute> <ContactPage /></ProtectedRoute>,
      },
      {
        path: "*",
        element: <Notfound />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegesterandLogout />,
      },
    ],
  },
]);

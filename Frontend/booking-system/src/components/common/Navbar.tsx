import useIsAdmin from "@/hooks/useIsAdmin";
import { Link } from "react-router";

const Navbar = () => {
  const isAdmin = useIsAdmin();
  console.log(isAdmin);
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Event Booking
          </Link>

          <div className="flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-gray-900">
              Events
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            )}

            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link to="/register" className="text-gray-600 hover:text-gray-900">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

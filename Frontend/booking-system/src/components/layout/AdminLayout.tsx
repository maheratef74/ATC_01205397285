import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router";
import {
    FaCalendarAlt,
    FaTicketAlt,
    FaChevronLeft,
    FaChevronRight,
    FaSun,
    FaMoon,
    FaSignOutAlt
} from "react-icons/fa";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

const menuItems = [
    { icon: FaCalendarAlt, label: "Events", path: "/admin/events" },
    { icon: FaTicketAlt, label: "Bookings", path: "/admin/bookings" },
];

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

    const handleLogout = () => {
        // TODO: Add your logout logic here
        // For example: clear tokens, cookies, etc.
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Theme Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-10 right-10 z-50 cursor-pointer"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
                {theme === "light" ? (
                    <FaMoon className="h-5 w-5" />
                ) : (
                    <FaSun className="h-5 w-5" />
                )}
            </Button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b">
                        <h1 className="text-2xl font-bold text-primary">Booking System</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted"
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-semibold">A</span>
                            </div>
                            <div>
                                <p className="font-medium">Admin User</p>
                                <p className="text-sm text-muted-foreground">admin@example.com</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                            onClick={handleLogout}
                        >
                            <FaSignOutAlt className="w-4 h-4" />
                            Logout
                        </Button>
                    </div>
                </div>

                {/* Sidebar Toggle */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute cursor-pointer -right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors"
                >
                    {isSidebarOpen ? (
                        <FaChevronLeft className="w-6 h-6" />
                    ) : (
                        <FaChevronRight className="w-6 h-6" />
                    )}
                </button>
            </aside>

            {/* Main Content */}
            <main
                className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0"
                    }`}
            >
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
} 
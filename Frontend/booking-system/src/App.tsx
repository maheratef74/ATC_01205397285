import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import Login from "./pages/Login";
import MainLayout from "./components/layout/MainLayout";
import Signup from "./pages/Signup";
import { Provider } from "react-redux";
import { store } from "./store";
import Bookings from "./pages/Bookings";
import EventDetails from "./pages/EventDetails";
import Booked from "./components/Booked";
import Events from "./pages/Events";

import Providers from "./providers/Providers";
import AdminPage from "./pages/AdminPage";
import AdminEventForm from "./pages/AdminEventForm";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Signup />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/event/:id",
        element: <EventDetails />,
      },
      {
        path: "/booked",
        element: <Booked />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/event/new",
        element: <AdminEventForm />,
      },
      {
        path: "/admin/event/:id",
        element: <AdminEventForm />,
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Providers>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
                borderRadius: "var(--radius)",
                padding: "16px",
                border: "2px solid var(--border)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
              },
              success: {
                icon: "✓",
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderLeft: "4px solid var(--primary)",
                },
              },
              error: {
                icon: "×",
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderLeft: "4px solid var(--destructive)",
                },
              },
              loading: {
                icon: "⟳",
                style: {
                  background: "var(--background)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                  borderLeft: "4px solid var(--primary)",
                },
              },
            }}
          />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </Providers>
      </ThemeProvider>
    </Provider>
  );
}

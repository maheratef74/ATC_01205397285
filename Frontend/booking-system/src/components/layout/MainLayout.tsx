import { Outlet } from "react-router";
import { Header } from "../common/Header";
import Footer from "../common/Footer";
import { useTheme } from "../theme-provider";
import { motion } from "framer-motion";
import clsx from "clsx";

// Star component from HeroSection
const Star = ({
  delay,
  size,
  x,
  y,
  theme,
}: {
  delay: number;
  size: number;
  x: number;
  y: number;
  theme: string;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.5, 1] }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="absolute"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
      top: `${y}%`,
      background: `${
        theme === "dark"
          ? "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 70%)"
          : "radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 80%)"
      }`,
      boxShadow: "0 0 10px rgba(255,255,255,0.5)",
      pointerEvents: "none",
    }}
  />
);

export default function MainLayout() {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* Star background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animated stars background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <Star
              key={i}
              delay={i * 0.1}
              size={Math.random() * 4 + 2}
              x={Math.random() * 100}
              y={Math.random() * 100}
              theme={theme}
            />
          ))}
        </div>
        {/* Main spotlight */}
        <div
          className={clsx(
            "absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] opacity-50 blur-3xl",
            theme === "dark"
              ? "from-primary/10 via-primary/5 to-transparent"
              : "from-black/10 via-black/5 to-transparent"
          )}
        />

        {/* Secondary ambient lights */}
        <div
          className={clsx(
            "absolute top-0 left-1/4 w-[60vw] h-[50vh] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2",
            theme === "dark" ? "bg-primary/5" : "bg-black/5"
          )}
        />

        <div
          className={clsx(
            "absolute bottom-0 right-1/4 w-[50vw] h-[50vh] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2",
            theme === "dark" ? "bg-primary/5" : "bg-black/5"
          )}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <div className="mt-[89.2px]">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

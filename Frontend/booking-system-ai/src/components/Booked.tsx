import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Booked() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 mb-6">
        <FaCheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        You successfully booked a seat.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button variant="outline" onClick={() => navigate("/bookings")}>
          View My Bookings
        </Button>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    </motion.div>
  );
}

export default Booked;

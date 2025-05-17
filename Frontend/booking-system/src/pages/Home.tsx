import NewsletterSection from "../components/home/NewsletterSection";
import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import CategorySectionV from "@/components/home/CategorySectionV";
import UpcomingTickets from "@/components/events/UpcomingTickets";





const Home = () => {



    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen w-screen pt-[72px]"
        >
            <HeroSection />

            <div className="container mx-auto px-4 py-16 space-y-24">

                {/* Categories Section */}
                <CategorySectionV />

                {/* <EventCardList events={events} /> */}
                <UpcomingTickets />
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl" />
                    <NewsletterSection />
                </div>
            </div>
        </motion.div>
    );
};

export default Home;

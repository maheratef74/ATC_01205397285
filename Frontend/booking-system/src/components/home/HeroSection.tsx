import { motion } from "framer-motion"
import { Button } from "../ui/button"
import ImageSlider from "./ImageSlider"
import { Link } from "react-router";


const FloatingLabel = ({ text, delay, x, y }: { text: string; delay: number; x: number; y: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0.7, 1, 0.7],
            y: [y, y - 20, y],
            x: [x, x + 10, x]
        }}
        transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="absolute bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-border/50"
        style={{
            left: `${x}%`,
            top: `${y}%`,
        }}
    >
        {text}
    </motion.div>
)



const HeroSection = () => {

    return (
        <section className="relative flex items-center justify-center min-h-[calc(100vh-100px)] overflow-hidden ">


            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    {/* Left column - Text content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8 relative"
                    >
                        {/* Decorative elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="absolute -right-8 top-1/2 w-24 h-24 rounded-full bg-primary/5 blur-2xl"
                        />

                        <div className="space-y-6 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                            >
                                ✨ Discover Amazing Events
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-5xl md:text-7xl font-bold tracking-tight"
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-primary inline-block"
                                >
                                    Find Your
                                </motion.span>
                                <br />
                                <motion.span
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-foreground inline-block"
                                >
                                    Perfect Event
                                </motion.span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="text-xl text-muted-foreground"
                            >
                                Discover and book tickets for amazing events happening around you
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="flex gap-4 pt-4"
                            >
                                <Link to="/events">
                                    <Button className="h-12 px-8 relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <span className="relative">Get Started</span>
                                    </Button>
                                </Link>
                            </motion.div>


                        </div>
                    </motion.div>

                    {/* Right column - Image Slider */}
                    <ImageSlider />
                </div>
            </div>

            {/* Floating Labels */}
            <FloatingLabel text="🎵 Live Music" delay={0.2} x={20} y={10} />
            <FloatingLabel text="🎭 Theater" delay={0.4} x={70} y={15} />
            <FloatingLabel text="🎪 Festivals" delay={0.6} x={40} y={-2} />
            <FloatingLabel text="🎨 Art Shows" delay={0.8} x={30} y={85} />
            <FloatingLabel text="🎬 Movies" delay={1.0} x={60} y={90} />
            <FloatingLabel text="🎤 Concerts" delay={1.2} x={80} y={85} />
            <FloatingLabel text="🎮 Gaming" delay={1.4} x={-2} y={30} />
            <FloatingLabel text="🎪 Circus" delay={1.6} x={10} y={70} />
        </section>
    )
}

export default HeroSection 
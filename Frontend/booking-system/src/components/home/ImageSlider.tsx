import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useTheme } from "../theme-provider"
import clsx from "clsx"

const images = [
    {
        src: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=60",
        alt: "Live Music Event",
        label: "🎵 Live Music"
    },
    {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=60",
        alt: "Theater Performance",
        label: "🎭 Theater"
    },
    {
        src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=60",
        alt: "Music Festival",
        label: "🎪 Festivals"
    },
    {
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
        alt: "Art Exhibition",
        label: "🎨 Art Shows"
    },
    {
        src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60",
        alt: "Movie Premiere",
        label: "🎬 Movies"
    },
    {
        src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=60",
        alt: "Gaming Tournament",
        label: "🎮 Gaming"
    },
    {
        src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=60",
        alt: "Circus Performance",
        label: "🎪 Circus"
    },
    {
        src: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
        alt: "Jazz Concert",
        label: "🎵 Jazz"
    }
]

const ImageSlider = () => {
    const { theme } = useTheme()
    const [currentImage, setCurrentImage] = useState(0)

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % images.length)
    }

    useEffect(() => {
        const timer = setInterval(handleNext, 5000)
        return () => clearInterval(timer)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
        >
            <div className="relative w-[100%] max-h-[450px] aspect-[4/3] overflow-hidden">
                {/* Images Container */}
                <div className="relative w-full h-full">
                    {images.map((image, index) => {
                        const isCurrent = index === currentImage
                        const isNext = index === (currentImage + 1) % images.length
                        const isPrev = index === (currentImage - 1 + images.length) % images.length
                        const isVisible = isCurrent || isNext || isPrev

                        if (!isVisible) return null

                        return (
                            <motion.div
                                key={index}
                                initial={false}
                                animate={{
                                    x: isCurrent ? 0 : isNext ? '95%' : isPrev ? '-95%' : 0,
                                    scale: isCurrent ? 1 : 0.85,
                                    opacity: isCurrent ? 1 : 0.6,
                                    zIndex: isCurrent ? 3 : isNext || isPrev ? 2 : 1,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                                className="absolute inset-0"
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="object-cover w-full h-full rounded-2xl shadow-2xl"
                                    />
                                    <div className={clsx(
                                        'absolute inset-0 bg-gradient-to-t rounded-2xl',
                                        theme === 'dark'
                                            ? 'from-background/90 via-background/30 to-transparent'
                                            : 'from-background/80 via-background/20 to-transparent'
                                    )} />


                                    {/* Image Label */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: isCurrent ? 1 : 0,
                                            y: isCurrent ? 0 : 20
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${theme === 'dark'
                                            ? 'bg-background/90 text-foreground'
                                            : 'bg-background/80 text-foreground'
                                            } backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium shadow-lg border border-border/50`}
                                    >
                                        {image.label}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    {images.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentImage(index)}
                            className={clsx(
                                'w-2 h-2 rounded-full transition-all duration-300',
                                currentImage === index
                                    ? 'bg-primary w-6'
                                    : theme === 'dark'
                                        ? 'bg-primary/30 hover:bg-primary/50'
                                        : 'bg-primary/40 hover:bg-primary/60'
                            )}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                    className={clsx(
                        'absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full ',
                        theme === 'dark'
                            ? 'bg-background/90 text-foreground'
                            : 'bg-background/80 text-foreground',
                        'backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 hover:bg-background/90 z-10'
                    )}
                >
                    ←
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    className={clsx(
                        'absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full',
                        theme === 'dark'
                            ? 'bg-background/90 text-foreground'
                            : 'bg-background/80 text-foreground',
                        'backdrop-blur-sm flex items-center justify-center shadow-lg border border-border/50 hover:bg-background/90 z-10'
                    )}
                >
                    →
                </motion.button>
            </div>
        </motion.div>
    )
}

export default ImageSlider 
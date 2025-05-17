import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

const NewsletterSection = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-3xl font-bold mb-4">
                        Stay Updated with Latest Events
                    </h2>
                    <p className="text-muted-foreground">
                        Subscribe to our newsletter and never miss out on exciting events
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                >
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1"
                    />
                    <Button className="whitespace-nowrap">
                        Subscribe Now
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center text-sm text-muted-foreground mt-4"
                >
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </motion.p>
            </div>
        </section>
    )
}

export default NewsletterSection 
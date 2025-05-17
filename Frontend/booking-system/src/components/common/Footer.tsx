import { NavLink } from "react-router"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const Footer = () => {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">EventBook</h3>
                        <p className="text-muted-foreground">
                            Book your favorite events with ease. Discover and experience the best events in your area.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Facebook className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Instagram className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    About Us
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/events"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    Events
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    Contact
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Legal</h4>
                        <ul className="space-y-2">
                            <li>
                                <NavLink
                                    to="/privacy"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    Privacy Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/terms"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    Terms of Service
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/faq"
                                    className={({ isActive }) =>
                                        cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            isActive && "text-primary font-medium"
                                        )
                                    }
                                >
                                    FAQ
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold">Newsletter</h4>
                        <p className="text-muted-foreground">
                            Subscribe to our newsletter for the latest updates and offers.
                        </p>
                        <form className="flex space-x-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="max-w-[200px]"
                            />
                            <Button type="submit">Subscribe</Button>
                        </form>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 border-t pt-8 text-center">
                    <p className="text-muted-foreground">
                        &copy; {new Date().getFullYear()} EventBook. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer 
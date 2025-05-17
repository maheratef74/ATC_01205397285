import { Button } from "@/components/ui/button"
import { NavLink } from "react-router"
import { Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
            <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center">
                <div className="space-y-2">
                    <h1 className="text-9xl font-bold text-primary">404</h1>
                    <h2 className="text-3xl font-semibold tracking-tight">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>
                <NavLink to="/">
                    <Button size="lg" className="gap-2">
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Button>
                </NavLink>
            </div>
        </div>
    )
}
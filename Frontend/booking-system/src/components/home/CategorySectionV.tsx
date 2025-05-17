import clsx from "clsx";
import { useTheme } from "../theme-provider";
import { useCategoryCounts } from "@/hooks/useCategories";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";

interface Category {
    name: string;
    image: string;
    tag: string;
    tagColor: string;
    description: string;
}

// Dummy data for UI elements
const categoryDetails: Record<string, Category> = {
    "Conference": {
        name: "Conference",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60",
        tag: "Professional",
        tagColor: "bg-blue-500",
        description: "Join industry leaders and experts in professional conferences."
    },
    "Concert": {
        name: "Concert",
        image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop&q=60",
        tag: "Live",
        tagColor: "bg-purple-500",
        description: "Experience amazing live music performances."
    },
    "Workshop": {
        name: "Workshop",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60",
        tag: "Hands-on",
        tagColor: "bg-green-500",
        description: "Learn new skills through interactive workshops."
    },
    "Seminar": {
        name: "Seminar",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=800&auto=format&fit=crop&q=60",
        tag: "Educational",
        tagColor: "bg-yellow-500",
        description: "Expand your knowledge through expert-led seminars."
    },
    "Festival": {
        name: "Festival",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&auto=format&fit=crop&q=60",
        tag: "Celebration",
        tagColor: "bg-pink-500",
        description: "Celebrate culture and entertainment at vibrant festivals."
    },
    "Sports": {
        name: "Sports",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60",
        tag: "Active",
        tagColor: "bg-orange-500",
        description: "Engage in exciting sports events and competitions."
    },
    "Theater": {
        name: "Theater",
        image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&auto=format&fit=crop&q=60",
        tag: "Arts",
        tagColor: "bg-red-500",
        description: "Enjoy captivating theatrical performances."
    },
    "Exhibition": {
        name: "Exhibition",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60",
        tag: "Art",
        tagColor: "bg-indigo-500",
        description: "Explore creative exhibitions and displays."
    },
    "Meetup": {
        name: "Meetup",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=60",
        tag: "Social",
        tagColor: "bg-teal-500",
        description: "Connect with like-minded people at meetups."
    },
    "Webinar": {
        name: "Webinar",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop&q=60",
        tag: "Online",
        tagColor: "bg-cyan-500",
        description: "Join informative webinars from anywhere."
    }
};

function CategorySectionV() {
    const { theme } = useTheme();
    const { data: categoryCounts, isLoading } = useCategoryCounts();

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className={clsx(
                    "text-3xl md:text-4xl font-extrabold mb-10 text-center",
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}>
                    Browse Event Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="rounded-xl overflow-hidden">
                            <Skeleton className="h-48 w-full" />
                            <div className="p-6 space-y-4">
                                <Skeleton className="h-8 w-3/4" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                                <div className="flex justify-between items-center">
                                    <Skeleton className="h-6 w-24" />
                                    <Skeleton className="h-10 w-32" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (categoryCounts?.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className={clsx(
                    "text-3xl md:text-4xl font-extrabold mb-10 text-center",
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                )}>
                    No categories found
                </h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className={clsx(
                "text-3xl md:text-4xl font-extrabold mb-10 text-center",
                theme === 'dark' ? 'text-white' : 'text-gray-900'
            )}>
                Browse Event Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryCounts?.map((categoryCount) => {
                    const details = categoryDetails[categoryCount.category];
                    if (!details) return null;

                    return (
                        <div
                            key={categoryCount.category}
                            className={clsx(
                                'group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
                                theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm'
                            )}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={details.image}
                                    alt={details.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={clsx(
                                        "text-2xl font-bold transition-transform duration-300 group-hover:scale-105",
                                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                                    )}>
                                        {details.name}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${details.tagColor} text-white`}>
                                        {details.tag}
                                    </span>
                                </div>

                                <p className={clsx(
                                    "mb-4",
                                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                                )}>
                                    {details.description}
                                </p>

                                <div className="flex  items-center justify-between">
                                    <div className={clsx(
                                        "flex items-center gap-2",
                                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                                    )}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{categoryCount.count} Events</span>
                                    </div>


                                    <Link
                                        to={`/events?category=${categoryCount.category}`}
                                        className={clsx(
                                            "cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95",
                                            theme === 'dark'
                                                ? 'bg-white/10 hover:bg-white/20 text-white'
                                                : 'bg-gray-900/10 hover:bg-gray-900/20 text-gray-900'
                                        )}
                                    >
                                        View Events →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CategorySectionV;
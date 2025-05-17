import { useSearchParams } from "react-router";
import EventList from "@/components/events/EventList";

const categoryLabels = {
    Conference: "Conference",
    Workshop: "Workshop",
    Seminar: "Seminar",
    Concert: "Concert",
    Exhibition: "Exhibition",
    Festival: "Festival",
    Sports: "Sports",
    Theater: "Theater",
    Meetup: "Meetup",
    Webinar: "Webinar"
};

function Events() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");

    return (
        <div className="container mx-auto px-4 py-8 my-20">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">
                    {category ? categoryLabels[category as keyof typeof categoryLabels] : "All"} Events
                </h1>
                <p className="text-muted-foreground">
                    Discover and book amazing {category ? categoryLabels[category as keyof typeof categoryLabels].toLowerCase() : ""} events
                </p>
            </div>

            <EventList
                pageSize={6}
                showPagination={true}
            />
        </div>
    );
}

export default Events;
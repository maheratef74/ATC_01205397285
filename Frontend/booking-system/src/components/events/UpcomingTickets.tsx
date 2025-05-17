import EventList from "./EventList";

function UpcomingTickets() {
    return (
        <EventList
            title="Upcoming Events"
            pageSize={3}
            showPagination={false}
        />
    );
}

export default UpcomingTickets; 
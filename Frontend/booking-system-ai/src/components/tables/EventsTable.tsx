"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEventsOld } from "@/hooks/useEvents";
import { useState } from "react";
import { ECategory, EventStatus, type Event } from "@/services/events";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TextTruncate from "../TextTruncate";
import { useNavigate } from "react-router";
export default function EventsTable() {
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const { events, isLoading, error, totalPages, deleteEvent } = useEventsOld({
    pageNumber,
    pageSize,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading events</p>;

  return (
    <div className="space-y-4 overflow-x-auto">
      <Button onClick={() => navigate("/admin/event/new")}>Add Event</Button>
      <Table className="z">
        <TableCaption>A list of pending conference events.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Organizer</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Tickets Booked</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event: Event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">{event.eventName}</TableCell>
              <TableCell>
                <TextTruncate text={event.description}></TextTruncate>
              </TableCell>
              <TableCell>{ECategory[event.category]}</TableCell>
              <TableCell>
                {new Date(event.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(event.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{event.venue}</TableCell>
              <TableCell>${event.price}</TableCell>
              <TableCell>{event.organizer}</TableCell>
              <TableCell>{event.capacity}</TableCell>
              <TableCell>{event.ticketsBooked}</TableCell>

              <TableCell>{EventStatus[event.eventStatus]}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="z-50">
                    <Button className="cursor-pointer">:</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate(`/admin/event/${event.id}`)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        deleteEvent.mutate(event.id);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <Button
          variant="outline"
          disabled={pageNumber === 1}
          onClick={() => setPageNumber((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {pageNumber} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={pageNumber === totalPages}
          onClick={() => setPageNumber((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

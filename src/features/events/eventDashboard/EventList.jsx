import React from "react";
import EventListItem from "./EventListItem";

const EventList = ({ events, onSelectEvent, onDeleteEvent }) => {
  return (
    <>
      {events.map((event) => (
        <EventListItem
          key={event.id}
          event={event}
          onSelectEvent={onSelectEvent}
          onDeleteEvent={onDeleteEvent}
        />
      ))}
    </>
  );
};

export default EventList;

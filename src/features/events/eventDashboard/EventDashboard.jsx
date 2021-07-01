import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);

  return (
    <Grid>
      <Grid.Column width={10}>
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>Event filters</Grid.Column>
    </Grid>
  );
};

export default EventDashboard;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { listenToEventsFromFirestore } from "../../../app/firestore/fireStoreService";
import useFirestoreCollection from "../../../app/hooks/useFireStoreCollection";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { listenToEvents } from "../eventActions";
import EventFilters from "./EventFilters";
import EventList from "./EventList";
// import EventListItemPlaceholder from "./EventListItemPlaceholder";

const EventDashboard = () => {
  const { events } = useSelector((state) => state.event);
  const { loading } = useSelector((state) => state.async);
  const dispatch = useDispatch();
  const [predicate, setPredicate] = useState(
    new Map([
      ['startDate', new Date()],
      ['filter', 'all'],
    ])
  );

  function handleSetPredicate(key, value){
    setPredicate(new Map(predicate.set(key, value)));
  }


  useFirestoreCollection({
    query: () => listenToEventsFromFirestore(predicate),
    data: (events) => dispatch(listenToEvents(events)),
    deps: [dispatch, predicate],
  });
  
  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && <LoadingComponent />}
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters predicate={predicate} setPredicate={handleSetPredicate} loading={loading}/>
      </Grid.Column>
    </Grid>
  );
};

export default EventDashboard;

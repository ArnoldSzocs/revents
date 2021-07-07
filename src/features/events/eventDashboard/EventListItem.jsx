import React from "react";
import { Link } from "react-router-dom";
import {
  Segment,
  Item,
  Icon,
  List,
  ItemImage,
  Button,
} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {format} from 'date-fns';
import { deleteEventInFirestore } from "../../../app/firestore/fireStoreService";

const EventListItem = ({ event }) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <ItemImage size='tiny' circular src={event.hostPhotoURL} />
            <Item.Content>
              <Item.Header content={event.title}/>
              <span style={{fontSize:14, marginLeft:10}}>Added on {format(event.updatedAt, 'MMMM d yyyy h:mm a')}</span>
              <Item.Description>Hosted by <Link to={`/profile/${event.hostUid}`}>{event.hostedBy}</Link> </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {format(event.date, 'MMMM d yyyy h:mm a')}
          <Icon name='marker' style={{marginLeft:20}} /> {event.venue}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
          {event.attendees.map((attendee) => (
            <EventListAttendee key={attendee.id} attendee={attendee} />
          ))}
        </List>
      </Segment>
      <Segment clearing>
        <div>
          {event.description}
          <Button
            onClick={() => deleteEventInFirestore(event.id)}
            color='red'
            floated='right'
            content='Delete'
          />
          <Button
            as={Link}
            to={`/events/${event.id}`}
            color='teal'
            floated='right'
            content='View'
          />
        </div>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;

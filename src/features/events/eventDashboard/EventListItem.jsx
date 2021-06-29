import React from "react";
import { Segment, Item, Icon, List, ItemImage, Button } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
const EventListItem = ({event}) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <ItemImage
                size='tiny'
                circular
              src={event.hostPhotoURL}
             
            />
            <Item.Content>
              <Item.Header content={event.title} />
              <Item.Description>Hosted by {event.hostedBy}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock' /> {event.date}
          <Icon name='marker' /> {event.veneu}
        </span>
      </Segment>
      <Segment secondary>
        <List horizontal>
            {event.attendees.map((attendee) => <EventListAttendee attendee={attendee}/>)}
        </List>
      </Segment>
      <Segment clearing>
          <div>
             {event.description}
             <Button color='teal' floated='right' content='View'/>
          </div>
      </Segment>
    </Segment.Group>
  );
};

export default EventListItem;
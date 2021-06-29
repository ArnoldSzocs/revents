import cuid from "cuid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";

const EventForm = ({
  setFormOpen,
  onCreateEvent,
  selectedEvent,
  onUpdateEvent,
}) => {
  const initialFormValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    veneu: "",
    date: "",
  };

  const [values, setValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = () => {
    selectedEvent
      ? onUpdateEvent({ ...selectedEvent, ...values })
      : onCreateEvent({
          ...values,
          id: cuid(),
          hostedBy: "Bob",
          hostPhotoURL: "/assets/user.png",
          attendees: [],
        });
        setFormOpen(false);
  };

  return (
    <Segment clearing>
      <Form onSubmit={submitHandler}>
        <Form.Field>
          <input
            type='text'
            name='title'
            value={values.title}
            onChange={handleInputChange}
            placeholder='Event title'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='category'
            value={values.category}
            onChange={handleInputChange}
            placeholder='Category'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='description'
            value={values.description}
            onChange={handleInputChange}
            placeholder='Description'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='city'
            value={values.city}
            onChange={handleInputChange}
            placeholder='City'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='text'
            name='veneu'
            value={values.veneu}
            onChange={handleInputChange}
            placeholder='Veneu'
          />
        </Form.Field>
        <Form.Field>
          <input
            type='date'
            name='date'
            value={values.date}
            onChange={handleInputChange}
            placeholder='Date'
          />
        </Form.Field>
        <Button
          type='submit'
          floated='right'
          positive
          content='Submit'
        ></Button>
        <Button
          as={Link} to={`/manage/`}
          type='submit'
          floated='right'
          content='Cancel'
        ></Button>
      </Form>
    </Segment>
  );
};

export default EventForm;

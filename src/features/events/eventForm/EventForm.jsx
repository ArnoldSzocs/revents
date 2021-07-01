import cuid from "cuid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const EventForm = ({ match, history }) => {
  const dipatch = useDispatch();

  const selectedEvent = useSelector((state) =>
    state.event.events.find((event) => event.id === match.params.id)
  );
  const initialFormValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    city: Yup.string().required(),
    description: Yup.string().required(),
    category: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dipatch(updateEvent({ ...selectedEvent, ...values }))
            : dipatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  hostPhotoURL: "/assets/user.png",
                  attendees: [],
                })
              );
          history.push("/events");
        }}
      >
        {({isSubmitting, dirty, isValid})=> (<Form className='ui form'>
          <Header sub color='teal' content='Event Details' />
          <MyTextInput name='title' placeholder='Event Title' />
          <MySelectInput
            name='category'
            placeholder='Category'
            options={categoryData}
          />
          <MyTextArea name='description' placeholder='Description' rows={3} />
          <Header sub color='teal' content='Event Location Details' />
          <MyTextInput name='city' placeholder='City' />
          <MyTextInput name='venue' placeholder='Venue' />
          <MyDateInput
            name='date'
            placeholderText='Event date'
            timeFormat='HH:mm'
            showTimeSelect
            timeCaption='time'
            dateFormat='MMMM d yyyy h:mm a'
          />
          <Button
            type='submit'
            loading={isSubmitting}
            disabled={!isValid || !dirty || isSubmitting}
            floated='right'
            positive
            content='Submit'
          ></Button>
          <Button
            as={Link}
            to={`/events`}
            type='submit'
            disabled={isSubmitting}
            floated='right'
            content='Cancel'
          ></Button>
        </Form>)

        }
        
      </Formik>
    </Segment>
  );
};

export default EventForm;

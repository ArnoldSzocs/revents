import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import {  listenToEvents,  } from "../eventActions";
import { Formik, Form } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import * as Yup from "yup";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryData } from "../../../app/api/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import useFirestoreDoc from "../../../app/hooks/useFirestoreDoc";
import { addEventToFirestore, listenToEventFromFirestore, updateEventInFirestore } from "../../../app/firestore/fireStoreService";
// import LoadingComponentent from "../../../app/layout/LoadingComponent";
import { toast } from "react-toastify";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();

  const selectedEvent = useSelector((state) =>
    state.event.events.find((event) => event.id === match.params.id)
  );

  const { loading, error } = useSelector((state) => state.async);

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

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventFromFirestore(match.params.id),
    data: (event) => dispatch(listenToEvents([event])),
    deps: [match.params.id],
  });

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) return <Redirect to='/error' />;

  return (
    <Segment clearing>
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={ async (values, { setSubmitting }) => {

          try {
            selectedEvent
              ? await updateEventInFirestore(values)
              : await addEventToFirestore(values);
              setSubmitting(false);
            history.push("/events");
          } catch (error) {
            toast.error(error.message);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
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
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default EventForm;

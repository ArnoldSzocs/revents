import {
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  LISTEN_TO_EVENT_CHAT,
  UPDATE_EVENT,
} from "./eventConstants";

export const listenToEvents = (events) => {
  return {
    type: FETCH_EVENT,
    payload: events,
  };
};

export const createEvent = (event) => {
  return {
    type: CREATE_EVENT,
    payload: event,
  };
};

export const updateEvent = (event) => {
  return {
    type: UPDATE_EVENT,
    payload: event,
  };
};

export const deleteEvent = (eventId) => {
  return {
    type: DELETE_EVENT,
    payload: eventId,
  };
};

export const listenToEventChat = (comments) => {
  return {
    type: LISTEN_TO_EVENT_CHAT,
    payload: comments
  }
}

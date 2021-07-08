import {
  CLEAR_COMMENTS,
  CREATE_EVENT,
  DELETE_EVENT,
  FETCH_EVENT,
  LISTEN_TO_EVENT_CHAT,
  UPDATE_EVENT,
} from "./eventConstants";

const initialEventState = {
  events: [],
  comments: [],
};

export const eventReducer = (state = initialEventState, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case UPDATE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload.id),
          action.payload,
        ],
      };
    case DELETE_EVENT:
      return {
        ...state,
        events: [
          ...state.events.filter((event) => event.id !== action.payload),
        ],
      };

    case FETCH_EVENT:
      return {
        ...state,
        events: action.payload,
      };

    case LISTEN_TO_EVENT_CHAT:
      return {
        ...state,
        comments: action.payload,
      };

      case CLEAR_COMMENTS:
        return {
          ...state,
          comments: []
        };

    default:
      return state;
  }
};

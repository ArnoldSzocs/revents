import { sampleData } from "../../app/api/sampleData";
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./eventConstants";

const initialEventState = {
  events: sampleData,
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
    default:
      return state;
  }
};

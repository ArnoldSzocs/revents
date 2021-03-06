import {
  LISTEN_TO_CURRENT_USER_PROFILE,
  LISTEN_TO_SELECTED_USER_PROFILE,
  LISTEN_TO_USER_EVENTS,
  LISTEN_TO_USER_PHOTOS,
} from "./profileConstants";

const initialState = {
  currentUserProfile: null,
  selectedUserProfile: null,
  photos: [],
  profileEvents: [],
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTEN_TO_CURRENT_USER_PROFILE:
      return {
        ...state,
        currentUserProfile: action.payload,
      };

    case LISTEN_TO_SELECTED_USER_PROFILE:
      return {
        ...state,
        selectedUserProfile: action.payload,
      };

    case LISTEN_TO_USER_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };

      case LISTEN_TO_USER_EVENTS:
        return {
          ...state,
          profileEvents: action.payload
        }
    default:
      return state;
  }
};

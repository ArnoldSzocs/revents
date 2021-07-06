import {
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";

export const fetchDummyData = (todoNumber) => {
  return (dispatch) => {
    dispatch(asyncActionStart());
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoNumber}`)
      .then((response) => {
        if (!response.ok) {
            
          throw new Error(response.status + ' - Something went wrong');
        }
       return response.json();
      })
      .then((json) => {
          console.log(json);
        dispatch(asyncActionFinish());
      }).catch((error) => {
        dispatch(asyncActionError(error.message));
      });
  };
};

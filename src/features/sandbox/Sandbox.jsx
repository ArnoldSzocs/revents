import React from "react";
import { Button } from "semantic-ui-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncActionFinish,
  asyncActionStart,
} from "../../app/async/asyncReducer";
import { delay } from "../../app/common/util/util";
import EventListItemPlaceholder from "../events/eventDashboard/EventListItemPlaceholder";
import { fetchDummyData } from "./sandboxActions";
import { useRef } from "react";
const Sandbox = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.async);
  const todoRef = useRef();
  if(error){
    toast.error(error);
  }
  

  return (
    <div>
      <Button onClick={() => toast.success("Success")} color='teal'>
        Show Toast
      </Button>
      <Button
        onClick={async () => {
          dispatch(asyncActionStart());
          await delay(2000);
          dispatch(asyncActionFinish());
          console.log("dsd");
        }}
        color='teal'
      >
        Loading
      </Button>
      <input type='number' name='todo' ref={todoRef}/>
      <Button onClick={() => dispatch(fetchDummyData(todoRef.current.value))}>Fetch dummy data</Button>
      {loading && (
        <div>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
        </div>
      )}
    </div>
  );
};

export default Sandbox;

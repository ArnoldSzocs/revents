import React from "react";
import EventDashboard from "../../features/events/eventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import { Container } from "semantic-ui-react";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/events/eventDetailed/EventDetailedPage";
import EventForm from "../../features/events/eventForm/EventForm";
import ModalManager from "../common/modals/ModalManager";
import { ToastContainer } from "react-toastify";
import Sandbox from "../../features/sandbox/Sandbox";
import ErrorComponent from "../common/errors/ErrorComponent";
import AccountPage from "../../features/auth/AccountPage";
import { useSelector } from "react-redux";
import ProfilePage from "../../features/profiles/profilePage/ProfilePage";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { key } = useLocation();

  const {initialized} = useSelector(state => state.async);

  if(!initialized){
    return <LoadingComponent />
  }
  return (
    <>
      <ModalManager />
      <ToastContainer position="bottom-right" hideProgressBar/>
      <Route exact path='/' component={HomePage} />
      <Route path={"/(.+)"}>
        <NavBar />
        <Container className='main'>
          <Route exact path='/events' component={EventDashboard} />
          <Route path='/events/:id' component={EventDetailedPage} />
          <Route
            path={["/create-event", "/manage/:id"]}
            component={EventForm}
            key={key}
          />
          <Route path='/profile/:id' component={ProfilePage}/>
          <Route path='/account' component={AccountPage}/>
          <Route path='/sandbox' component={Sandbox}/>
          <Route path='/error' component={ErrorComponent}/>
          
        </Container>
      </Route>
    </>
  );
}

export default App;

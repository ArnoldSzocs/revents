import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar = ({ setFormOpen }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const history = useHistory();

  const signOutHandler = () => {
    setAuthenticated(false);
    history.push("/");
  };

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} exact to='/' header>
          <img src='/assets/logo.png' alt='logo' style={{ marginRight: 15 }} />
          Re-vents
        </Menu.Item>
        <Menu.Item as={NavLink} to='/events' name='Events' />
        {authenticated && (
          <Menu.Item as={NavLink} to='/create-event'>
            <Button positive inverted content='Create Event'></Button>
          </Menu.Item>
        )}

        {authenticated ? (
          <SignedInMenu signOut={signOutHandler} />
        ) : (
          <SignedOutMenu setAuthenticated={setAuthenticated} />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;

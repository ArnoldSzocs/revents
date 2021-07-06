import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

const NavBar = () => {
 
  const {authenticated} = useSelector(state => state.auth);

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
          <Menu.Item as={NavLink} to='/sandbox' name='Sandbox' />

        {authenticated ? (
          <SignedInMenu  />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
};

export default NavBar;

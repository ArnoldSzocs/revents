import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { signOutFromFirebase } from "../../app/firestore/firebaseService";

const SignedInMenu = () => {
  const history = useHistory();
  const { currentUserProfile } = useSelector((state) => state.profile);


  async function handleSignOutUser() {
    try {
      signOutFromFirebase();
      history.push("/");
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={currentUserProfile.photoURL || "/assets/user.png"}
      />
      <Dropdown pointing='top left' text={currentUserProfile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/create-event'
            text='Create Event'
            icon='plus'
          />
          <Dropdown.Item as={Link} to={`/profile/${currentUserProfile.id}`} text='My profile' icon='user' />
          <Dropdown.Item
            as={Link}
            to='/account'
            text='Account'
            icon='settings'
          />
          <Dropdown.Item
            text='Sign out'
            icon='power'
            onClick={handleSignOutUser}
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;

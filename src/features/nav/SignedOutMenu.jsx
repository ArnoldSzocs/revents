import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

const SignedOutMenu = ({setAuthenticated}) => {
    return (
        <Menu.Item position="right">
          <Button basic inverted content='Login' onClick={() => setAuthenticated(true)} ></Button>
          <Button
            basic
            inverted
            content='Register'
            
            style={{ marginLeft: "0.5em" }}
          ></Button>
        </Menu.Item>
    )
}

export default SignedOutMenu

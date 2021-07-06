import React from 'react'
import { Header, Menu } from 'semantic-ui-react';
import Calendar from 'react-calendar';

const EventFilters = () => {
    return (
        <>
            <Menu vertical size="large" style={{width: '100%'}}>
                <Header icon="filter" attached color="teal" content="Filters" />
                <Menu.Item content="All events" />
                <Menu.Item content="Is going" />
                <Menu.Item content="a sdsd" />
            </Menu>
            <Header icon="calendar" attached color="teal" content="Select date" />
            <Calendar />
        </>
    )
}

export default EventFilters

import React from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

const EventForm = ({setFormOpen}) => {
    return (
       <Segment clearing>
           <Form>
               <Form.Field>
                   <input type="text" placeholder="Event title" />
               </Form.Field>
               <Form.Field>
                   <input type="text" placeholder="Category" />
               </Form.Field>
               <Form.Field>
                   <input type="text" placeholder="Description" />
               </Form.Field>
               <Form.Field>
                   <input type="text" placeholder="City" />
               </Form.Field>
               <Form.Field>
                   <input type="text" placeholder="Veneu" />
               </Form.Field>
               <Form.Field>
                   <input type="date" placeholder="Date" />
               </Form.Field>
               <Button type="submit" floated="right" positive content="Submit"></Button>
               <Button onClick={() => setFormOpen(false) } type="submit" floated="right" content="Cancel"></Button>
           </Form>
       </Segment>
    )
}

export default EventForm

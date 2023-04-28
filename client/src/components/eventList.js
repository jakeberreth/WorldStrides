import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
 
const buttonStyle =
{
 marginRight: "10px"
}

const Event = (props) => ( 
 <tr>
   <td>{props.event.institution}</td>
   <td>{props.event.city}</td>
   <td>{props.event.state}</td>
   <td>{props.event.type}</td>
   <td>{props.event.eventPriority}</td> 
   <td>{props.event.startDate}</td>
   <td>{props.event.endDate}</td>
   <td>
     <Link style={buttonStyle} className="btn btn-warning" to={`/editEvent/${props.event._id}`}>Edit</Link>
     <button style={buttonStyle} className="btn btn-danger"
       onClick={() => {
         props.deleteEvent(props.event._id)
       }}
     >
      Delete
     </button> 
   </td>
 </tr>
)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default function EventList() {
  //states
  const [events, setEvents] = useState([])
 
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`https://worldstrides-backend.onrender.com/event/`)
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }
  
      const events = await response.json()
      setEvents(events)
    }
  
    getEvents()
  
    return
  }, [events.length])

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  async function deleteEvent(id) {
    await fetch(`https://worldstrides-backend.onrender.com/event/${id}`, {
      method: "DELETE"
    })
    const newEvents = events.filter((el) => el._id !== id)
    setEvents(newEvents)
  }
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function eventList() {
    return events.map((event) => {
      console.log(events)
      return (
        <Event
          event={event}
          deleteEvent={() => deleteEvent(event._id)}
          key={event._id}
          availability={event.availability}
        />
      )
    })
  }
  
  //styles
  const eventListStyle = 
  {
    marginLeft: "10px"
  }

  const tableStyle =
  {
    marginLeft: "10px",
    marginTop: "10px",
    marginRight: "10px"
  }

  return (
    <div class="p-3 mb-2 bg-secondary text-white">
      <br></br>
      <h3 style={eventListStyle}>Event List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>City</th>
            <th>State</th>
            <th>Type</th>
            <th>Priority</th>
            {/* <th>Event Available</th> */}
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
    </div>
  )
}
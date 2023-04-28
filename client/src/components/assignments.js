import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { getDistance } from 'geolib'

const Event = (props) => (
  <tr>
    <td>{props.event.institution}</td>
    <td>{props.event.state}</td>
    <td>{props.event.type}</td>
    <td>{props.event.eventPriority}</td>
    <td>{props.event.startDate}</td>
    <td>{props.event.endDate}</td>
    <td>{props.event.assignment}</td>
  </tr>
)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default function Assignments() {
  //states
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [rank , setRank] = useState(1)

  //navigate
  const navigate = useNavigate()

  //get events
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

  //get users
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`https://worldstrides-backend.onrender.com/user/`)

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`
        window.alert(message)
        return
      }

      const users = await response.json()
      setUsers(users)
    }

    getUsers()

    return
  }, [users.length])

  //render event list
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function eventList() {
    return events.map((event) => {
      return (
        <Event
          event={event}
          key={event._id}
          availability={event.availability}
        />
      )
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const updateRank = (event) =>
  {
    if (event.target.value === "Availability, Proximity")
    {
      setRank(1)
    }
    else
    {
      setRank(2)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function checkAlmaMater(tempEvents, i, tempUsers)
  {
    for(let j = 0; j < tempUsers.length; ++j)
    {
      if(tempUsers[j].almaMater !== tempEvents[i].institution)
      {
        tempUsers.splice(j, 1)
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function checkProximity(tempEvents, i, tempUsers)
  { 
    var minDistance = getDistance(
      { latitude: tempEvents[i].latitude, longitude: tempEvents[i].longitude },
      { latitude: tempUsers[0].latitude, longitude: tempUsers[0].longitude })
    var minIndex = 0
    var distance = 0

    for(let j = 0; j < tempUsers.length; ++j)
    {
      distance = getDistance(
        { latitude: tempEvents[i].latitude, longitude: tempEvents[i].longitude },
        { latitude: tempUsers[j].latitude, longitude: tempUsers[j].longitude })

      if (distance < minDistance)
      {
        minDistance = distance
        minIndex = j
      }
    }

    return minIndex
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  function checkAvailability(tempEvents, i, tempUsers)
  {
    var eventEndArrFull = tempEvents[i].endDate.split(" ")
    var eventEndArr = eventEndArrFull[0].split("/")
    var eventEndDay = eventEndArr[1]
    var eventEndYear = eventEndArr[2]

    var eventStartArrFull = tempEvents[i].startDate.split(" ")
    var eventStartArr = eventStartArrFull[0].split("/")
    var eventStartMonth = eventStartArr[0]
    var eventStartDay = eventStartArr[1]
    var eventStartYear = eventStartArr[2]

    for (var j = 0; j < tempUsers.length; ++j) {
      var length = tempUsers[j].length

      for (let k = 0; k < length; ++k) {
        var userStartArr = tempUsers[j].date[k].startDate.split("-")
        var userStartYear = userStartArr[0]
        var userStartMonth = userStartArr[1]
        var userStartDay = userStartArr[2]

        var userEndArr = tempUsers[j].date[k].endDate.split("-")
        var userEndYear = userEndArr[0]
        var userEndMonth = userEndArr[1]
        var userEndDay = userEndArr[2]

        if 
        (
            (userEndMonth < eventStartMonth && userEndYear > eventEndYear) ||
            (userStartMonth > eventStartMonth &&
              userStartYear < eventStartYear) ||
            userStartMonth === eventStartMonth
        ) 
        {
          if 
          (
              userStartMonth === userEndMonth &&
              (userStartDay > eventEndDay ||
                (userEndDay < eventStartDay && userEndDay < eventStartDay))
          ) 
          {
            continue
          }
        } 
        else
        {
          tempUsers.splice(j, 1)
        }
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  function swap(users, xp, yp)
  {
    var temp = users[xp]
    users[xp] = users[yp]
    users[yp] = temp
  }

  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  function sortUsers(users, n)
  {
    var i, j

    for(i = 0; i < n-1; ++i)
    {
      for(j= 0; j < n-i-1; ++j)
      {
        if(users[j].assignmentCount < users[j+1].assignmentCount)
        {
          swap(users, j, j+1)
        }
      }
    }
  }

  //assign staff to events
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  function assign() {
    var tempEvents = events
    var usersPool = users
    var minIndex = 0

    sortUsers(usersPool, usersPool.length)

    //prioritize matches by availability, then proximity
    if(rank === 1)
    {
      for(let i = 0; i < tempEvents.length; ++i)
      {
        tempEvents[i].assignment = "Not Assigned"

        //remove users with an assignment count of 0
        for(let j = 0; j < usersPool.length; ++j)
        {
          if(usersPool[j].assignmentCount === 0)
          {
            usersPool.splice(j, 1)
          }
        }

        checkAvailability(tempEvents, i, usersPool)
        console.log("AFTER AVAILABILITY CHECK")
        console.log(usersPool)

        // minIndex = checkProximity(tempEvents, i, usersPool)
        // usersPool[minIndex].assignmentCount--
        // console.log("AFTER PROXIMITY CHECK")
        // console.log("MATCH", usersPool[minIndex])

        let highest = 0
        let max = 0
        let highest2 = 0
        for(let a = 0; a < usersPool.length; ++a)
        {
          if (usersPool[a].assignmentCount > max)
          {
            highest = a
            max = usersPool[a].assignmentCount
          }
        }

        tempEvents[i].assignment = usersPool[highest].name
        usersPool[highest].assignmentCount--
        update(tempEvents[i], tempEvents[i]._id)
      }
      navigate("/assignments")
    }  
    console.log(rank)

    //prioritize matches by availability, alma mater, then proximity
    if(rank === 2)
    {
      for(let i = 0; i < tempEvents.length; ++i)
      {
        tempEvents[i].assignment = "Not Assigned"

        //remove users with an assignment count of 0
        for(let j = 0; j < usersPool.length; ++j)
        {
          if(usersPool[j].assignmentCount === 0)
          {
            usersPool.splice(j, 1)
          }
        }

        checkAvailability(tempEvents, i, usersPool)
        console.log("AFTER AVAILABILITY CHECK")
        console.log(usersPool)

        checkAlmaMater(tempEvents, i, usersPool)
        console.log("AFTER ALMA MATER CHECK")
        console.log(usersPool)

        let highest = 0
        let max = 0
        let highest2 = 0
        for(let a = 0; a < usersPool.length; ++a)
        {
          if (usersPool[a].assignmentCount > max)
          {
            highest2 = a
            max = usersPool[a].assignmentCount
          }
        }

        // minIndex = checkProximity(tempEvents, i, usersPool)
        // usersPool[minIndex].assignmentCount--
        // console.log("AFTER PROXIMITY CHECK")
        // console.log("MATCH", usersPool[minIndex])

        //tempEvents[i].assignment = usersPool[minIndex].name

        tempEvents[i].assignment = usersPool[highest2].name
        usersPool[highest2].assignmentCount--
        update(tempEvents[i], tempEvents[i]._id)
      }
      navigate("/assignments")
    }
  }
      
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////// 
  async function update(event, id) {
    const editedPerson = {
      eventPriority: event.eventPriority,
      institution:   event.institution,
      city:          event.city,
      latitude:      event.latitude,
      longitude:     event.longitude,
      state:         event.state,
      type:          event.type,
      startDate:     event.startDate,
      endDate:       event.endDate,
      available:     event.available,
      assignment:    event.assignment,
    }

    await fetch(`https://worldstrides-backend.onrender.com/updateEvent/${id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

    //styles
    const formStyle = {
      marginLeft: "10px",
      width: "500px",
    }

    const buttonStyle = {
      marginLeft: "10px",
    }
  
    const eventListStyle = {
      marginLeft: "10px",
    }
  
    const tableStyle = {
      marginLeft: "10px",
      marginTop: "10px",
      marginRight: "10px",
    }

  return (
    <div>
      <br></br>
      <div className="form-group">
          <label style={buttonStyle} htmlFor="eventPriority">Rank Attribute Priorities</label>
          <div></div>
          <select style={formStyle} 
            className="form-control"
            onChange={(e) => updateRank(e)}
          >
            <option>Availability</option>
            <option>Availability, Alma Mater</option>
          </select>
        </div>
        <br></br>
      <div className="form-group" style={buttonStyle} onClick={assign}>
        <input type="button" value="Assign" className="btn btn-primary" />
      </div>
      <br></br>
      <h3 style={eventListStyle}>Event List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Institution</th>
            <th>State</th>
            <th>Event Type</th>
            <th>Event Priority</th>
            <th>Start Date/Time</th>
            <th>End Date/Time</th>
            <th>Assignment</th>
          </tr>
        </thead>
        <tbody>{eventList()}</tbody>
      </table>
      <br></br>
      <br></br>
    </div>
  )
}
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import Records from "./school.json"

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
]
  
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default function EditEvent() {
  //states
  const [form, setForm] = useState({
    eventPriority: "",
    city:          "",
    latitude:      0,
    longitude:     0,
    state:         "",
    type:          "",
    institution:   "",
    startDate:     "",
    endDate:       "",
    assignment:    ""
  })

  const [startDateString, setStartDateString] = useState("")
  const [endDateString, setEndDateString] = useState("")

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const params = useParams()
  const navigate = useNavigate()
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString()
      const response = await fetch(`https://worldstrides-backend.onrender.com/event/${params.id.toString()}`)

      if (!response.ok) {
        const message = `Hello An error has occurred: ${response.statusText}`
        window.alert(message)
        return
      }
  
      const profile = await response.json()
      if (!profile) {
        window.alert(`Record with id ${id} not found`)
        navigate("/")
        return
      }

      setForm(profile)

      setStartDate(profile.startDate)
      setEndDate(profile.endDate)
      setStartDateString(profile.startDate)
      setEndDateString(profile.endDate)
    }
  
    fetchData()
  
    return
  }, [params.id, navigate])
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  async function onSubmit(e) {
    e.preventDefault()

    form.startDate = startDateString
    form.endDate = endDateString

    const editedPerson = {
      eventPriority: form.eventPriority,
      institution:   form.institution,
      city:          form.city,
      latitude:      form.latitude,
      state:         form.state,
      type:          form.type,
      startDate:     form.startDate,
      endDate:       form.endDate,
      assignment:    form.assignment
    }
  
    await fetch(`https://worldstrides-backend.onrender.com/updateEvent/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    })
  
    navigate("/eventList")
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleStartChange = (event) => {
    var arr = event.target.value.split('-')
    var arr2 = arr[2].split('T')
    var str = arr[1] + "/" + arr2[0] + "/" + arr[0] + " " + arr2[1]

    setStartDateString(str)

    setStartDate(startDateString)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleEndChange = (event) => {
    var arr = event.target.value.split('-')
    var arr2 = arr[2].split('T')
    var str = arr[1] + "/" + arr2[0] + "/" + arr[0] + " " + arr2[1]

    setEndDateString(str)

    setEndDate(endDateString)
  }

  //styles
  const formStyle = 
  {    
    marginLeft: "50px",
    marginRight: "50px"
  }

  const titleStyle = 
  {
  marginLeft: "50px"
  }

  return (
    <div>
      <br></br>
    <h3 style={titleStyle}>Edit Event</h3>
    <form style={formStyle} onSubmit={onSubmit}>
      <br></br>
      <label htmlFor="institution">Institution</label>
      <div className="form-group">
      <div></div>
          <input list = "form-control" placeholder= {form.institution} className="form-control" onChange={(e) => updateForm({institution:e.target.value})}/>
          <div></div>
          <datalist id = "form-control" value = {form.institution}>
          <option></option>
          {
            Records.map((op) => <option>{op.institution}</option>)
          }
          </datalist>
      </div>
      <br></br>
      <div className="form-group" size = "30" placeholder="Search">
          <label htmlFor="state">City</label>
          <div></div>
          <input type="text" className="form-control" value = {form.city} onChange = {(e)=>updateForm({city:e.target.value})}></input>
        </div>

        <br></br>
      <div className="form-group" size = "30" placeholder="Search">
          <label htmlFor="state">State</label>
          <div></div>
          <select className = "form-control" value = {form.state} onChange = {(e)=>updateForm({state:e.target.value})}>
            <div></div>
            <option></option>
            {states.map((op)=><option>{op}</option>)}
          </select>
        </div>

        <br></br>
      <div className="form-group">
          <label htmlFor="type">Event Type</label>
          <select className = "form-control" value = {form.type} onChange = {(e) => updateForm({type: e.target.value})}>
                <option></option>
                <option>Fair</option>
                <option>B2C</option>
                <option>B2B</option>
          </select>
        </div>
        <br></br>
        <div className="form-group"> 
        <label htmlFor="eventPriority">Event Priority</label>
        <div></div>
        <select className = "form-control" value={form.eventPriority} onChange={(e)=>updateForm( {eventPriority : e.target.value})}>
          <option></option>
          <option>
            Must Attend
          </option>
          <option>
            Should Attend
          </option>
          <option>
            Can Attend
          </option>
        </select>     
        </div>
        <br></br>
      <br></br>
      <div className="form-group">
        <label htmlFor="state">Start Date/Time</label>
        <input 
                type="datetime-local"
                className="form-control"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => handleStartChange(e)}
                />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="endDate">End Date/Time</label>
        <input 
                type="datetime-local"
                className="form-control"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => handleEndChange(e)}
                />
      </div>
      <br></br>
      <div className="form-group">
        <input
          type="submit"
          value="Update Event"
        />
      </div>
      <br></br>
      <br></br>
    </form>
  </div>
  )
}
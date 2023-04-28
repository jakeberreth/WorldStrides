import React, { useState, Fragment, useEffect } from "react"
import { useNavigate } from "react-router"
import Records from "./school.json"
import Geocode from "react-geocode"

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
export default function CreateUser() {
  //states
  const [form, setForm] = useState({
    name:           "",
    password:       "",
    almaMater:      "",
    date:           [],
    type:           "",
    city:           "",
    latitude:       0,
    longitude:      0,
    state:          "",
    assignmentCount: 0,
  })

  const [inputFields, setInputFields] = useState([
    { startDate: "", endDate: "" },
  ])

  var result = false

  //navigate
  const navigate = useNavigate()

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function getCoordinatesFromCity(city, state)
  {
    updateForm({city: city})

    Geocode.setLanguage("en")
    Geocode.setRegion("us")
    Geocode.setLocationType("ROOFTOP")
    Geocode.enableDebug()
    Geocode.setApiKey("AIzaSyCh6DCTPMGMSgcng-GO3Uy3c4f7KD_ypww")

    Geocode.fromAddress(
      city + ", " + state).then(
      (response) => {
        var location = response.results[0].geometry.location
        updateForm({latitude: location.lat})
        updateForm({longitude: location.lng})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  async function onSubmit(e) {
    e.preventDefault()

    form.date.push(...inputFields)

    const newPerson = { ...form }

    await fetch("https://worldstrides-backend.onrender.com/user/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error)
      return
    })

    if (namecheck() === false) {
      navigate("/createLogin")
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function namecheck() {
    for (let i = 0; i < form.name.length; i++) {
      if (
        form.name[i] === "!" ||
        form.name[i] === "#" ||
        form.name[i] === "$" ||
        form.name[i] === "%" ||
        form.name[i] === "^" ||
        form.name[i] === "-" ||
        form.name[i] === "&" ||
        form.name[i] === "*" ||
        form.name[i] === "(" ||
        form.name[i] === ")" ||
        form.name[i] === "~"
      ) {
        alert("Invalid username: Please do not include character in username")
        navigate("./..")
        result = true
      } else if (form.password.length > 15) {
        alert(
          "Invalid Password: Please type less than 15 character in password"
        )
        navigate("./..")
        result = true
        break
      } else {
        result = false
      }
    }

    for (let j = 0; j < form.password.length; j++) {
      if (
        form.password[j] === "A" ||
        form.password[j] === "B" ||
        form.password[j] === "C" ||
        form.password[j] === "D" ||
        form.password[j] === "E" ||
        form.password[j] === "F" ||
        form.password[j] === "G" ||
        form.password[j] === "H" ||
        form.password[j] === "I" ||
        form.password[j] === "J" ||
        form.password[j] === "K" ||
        form.password[j] === "L" ||
        form.password[j] === "M" ||
        form.password[j] === "N" ||
        form.password[j] === "O" ||
        form.password[j] === "P" ||
        form.password[j] === "Q" ||
        form.password[j] === "R" ||
        form.password[j] === "S" ||
        form.password[j] === "T" ||
        form.password[j] === "U" ||
        form.password[j] === "V" ||
        form.password[j] === "W" ||
        form.password[j] === "X" ||
        form.password[j] === "Y" ||
        form.password[j] === "N" ||
        form.password[j] === "Z"
      ) {
        result = false
        break
      } else {
        alert("Invalid Password: Please type at least one upper case letter")
        navigate("./..")
        result = true
        break
      }
    }

    return result
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleAddFields = () => {
    const values = [...inputFields]
    values.push({ startDate: "", endDate: "" })
    setInputFields(values)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleRemoveFields = (index) => {
    const values = [...inputFields]
    values.splice(index, 1)
    setInputFields(values)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleStartChange = (index, event) => {
    const values = [...inputFields]
    if (event.target.name === "startDate") {
      values[index].startDate = event.target.value
    } else {
      values[index].startDate = event.target.value
    }

    setInputFields(values)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const handleEndChange = (index, event) => {
    const values = [...inputFields]
    if (event.target.name === "endDate") {
      values[index].endDate = event.target.value
    } else {
      values[index].endDate = event.target.value
    }

    setInputFields(values)
  }

  //styles
  const formStyle = {
    marginLeft: "5%",
    width: "500px",
  }

  const titleStyle = {
    marginLeft: "5%",
  }

  const buttonStyle = {
    marginLeft: "10px",
  }

  const submitStyle = {
    marginBottom: "30px",
  }

  return (
    <div>
      <br></br>
      <h3 style={titleStyle}>Create New Account</h3>
      <br></br>
      <form style={formStyle} onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            required
            placeholder="First_Name Last_Name"
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            require
            type="password"
            className="form-control"
            placeholder="Type Your Password Here"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="almaMater">Alma Mater</label>
          <div></div>
          <input
            list="form-control"
            placeholder="Search"
            className="form-control"
            onChange={(e) => updateForm({ almaMater: e.target.value })}
          />
          <div></div>
          <datalist id="form-control" value={form.almaMater}>
            <option></option>
            {Records.map((op) => (
              <option>{op.institution}</option>
            ))}
          </datalist>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            required
            placeholder="City"
            type="text"
            className="form-control"
            id="city"
            value={form.city}
            onChange={(e) => getCoordinatesFromCity(e.target.value, form.state)}
          />
        </div>
        <br></br>
        <div className="form-group" size="30" placeholder="Search">
          <label htmlFor="state">State</label>
          <br></br>
          <div></div>
          <select
            className="form-control"
            value={form.state}
            onChange={(e) => updateForm({ state: e.target.value })}
          >
            <div></div>
            <option></option>
            {states.map((op) => (
              <option>{op}</option>
            ))}
          </select>
        </div>
        <br></br>
        <label htmlFor="date">
          Enter Dates and Times that you are NOT Available
        </label>
        <br></br>
        <br></br>
        <div className="form-group">
          {inputFields.map((inputField, index) => (
            <Fragment key={`${inputField}~${index}`}>
              <div className="form-group">
                <label>Start Date/Time</label>
                <br></br>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  name="startDate"
                  //value={inputField.datetime}
                  onChange={(event) => handleStartChange(index, event)}
                />
              </div>
              <br></br>
              <div className="form-group">
                <label>End Date/Time</label>
                <br></br>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  name="endDate"
                  //value={inputField.datetime}
                  onChange={(event) => handleEndChange(index, event)}
                />
              </div>
              <hr></hr>
              <br></br>
              <div className="form-group">
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => handleAddFields(index)}
                >
                  Add
                </button>

                <button
                  style={buttonStyle}
                  className="btn btn-warning"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  Remove
                </button>
                <br></br>
              </div>
              <br></br>
            </Fragment>
          ))}
        </div>
        <label>Account Type</label>
        <br></br>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              required
              className="form-check-input"
              type="radio"
              name="accountOptions"
              id="accountRegular"
              value="Regular"
              checked={form.type === "Regular"}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
            <label htmlFor="accountRegular" className="form-check-label">
              Regular
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="accountOptions"
              id="accountLead"
              value="Lead"
              checked={form.type === "Lead"}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
            <label htmlFor="accountLead" className="form-check-label">
              Lead
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="accountOptions"
              id="accountAdmin"
              value="Admin"
              checked={form.type === "Admin"}
              onChange={(e) => updateForm({ type: e.target.value })}
            />
            <label htmlFor="accountAdmin" className="form-check-label">
              Admin
            </label>
          </div>
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="assignmentCount">Assignment Count</label>
          <input
            required
            placeholder="Please do not put special character here"
            type="text"
            className="form-control"
            id="assignmentCount"
            value={form.assignmentCount}
            onChange={(e) => updateForm({ assignmentCount: e.target.value })}
          />
        </div>
        <br></br>
        <div className="form-group">
          <input
            style={submitStyle}
            type="submit"
            value="Create Account"
            className="btn btn-primary"
            onClick={namecheck}
          />
        </div>
      </form>
    </div>
  )
}
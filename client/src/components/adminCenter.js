import React, { useState } from "react"
import { useNavigate } from "react-router"
 
 ////////////////////////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////////////////////////
export default function AdminCenter() {
  //states
  const [form ] = useState({
    eventPriority: "",
    city:          "",
    state:         "",
    type:          "",
    institution:   "",
    startDate:     "",
    endDate:       "",
    assignment:    ""
  })

  const [file, setFile] = useState({
  name:     "",
  contents: ""
  })

  //use navigate
  const navigate = useNavigate()

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  const onSelectFile = e => 
  {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      setFile({name: file.name, contents: reader.result})
    }

    reader.onerror = () => {
      console.log("file error", reader.error)
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function runImportEvent()
  {
    var text = file.contents

    const lines = text.split('\n')

    var newInstitution   = ""
    var newCity          = ""
    var newState         = ""
    var newType          = ""
    var newStartDate     = ""
    var newEndDate       = ""
    var newAssignment    = ""
    var newEventPriority = ""

    for(let i = 0; i < lines.length; ++i)
    {
      var items        = lines[i].split(',')
      newInstitution   = items[0]
      newCity          = items[1]
      newState         = items[2]
      newType          = items[3]
      newStartDate     = items[4]
      newEndDate       = items[5]
      newEventPriority = items[6]
      newAssignment    = items[7]

      form.institution   = newInstitution
      form.city          = newCity
      form.state         = newState
      form.type          = newType
      form.startDate     = newStartDate
      form.endDate       = newEndDate
      form.eventPriority = newEventPriority
      form.assignment    = newAssignment

      fetch("http://localhost:2500/event/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).catch((error) => {
        window.alert(error)
        return
      })
    }
    navigate("/eventList")
  }

  //style
  const formStyle = 
  {    
    marginLeft: "5%",
    width: "500px"
  }

  const titleStyle = 
  {
  marginLeft: "5%",
  marginRight: "5%"
  }

  const buttonStyle = 
  {
  marginLeft: "5%",
  }

  return (
    <div>
      <br></br>
      <h3 style={titleStyle}>Import Events</h3>
        <div style={formStyle}>
          <br></br>
          <input
            type="file"
            onChange={onSelectFile}
          />
        </div>
        <br></br>
        <div className="form-group">
          <input style={buttonStyle}
            type="button"
            value="Import"
            className="btn btn-primary"
            onClick={runImportEvent}
          />
        </div>
    </div>
  )
}
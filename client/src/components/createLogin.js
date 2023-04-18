import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../App"

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default function CreateLogin() {
  //use context
  var { setCurrentUser } = useContext(UserContext)

  //states
  const [form, setForm] = useState({
    name: "",
    password: "",
  })

  const [users, setUsers] = useState([])

  //navigate
  const navigate = useNavigate()

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }

  useEffect(() => {
    async function getUsers() {
      const response = await fetch(`http://localhost:2500/user/`)

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

  const invalid = ["!", "#", "$", "%", "^", "-", " ", "&", "*", "(", ")", "~"]

  var i = 0

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  async function onSubmit(e) {
    var myUser
    e.preventDefault()

    var found = false

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === form.name && users[i].password === form.password) {
        found = true
        myUser = users[i]
        setCurrentUser(
          myUser.type +
            "-" +
            myUser.name +
            "-" +
            myUser.password +
            "-" +
            myUser._id
        )
        break
      } else if (users[i].name === invalid) {
        found = false
      } else {
        found = false
      }
    }
    if (found === true) {
      if (myUser.type === "Admin") {
        navigate("/staffList")
      } else {
        navigate("/eventList")
      }
    } else if (found === false && users.name === invalid) {
      navigate("/createUser")
      alert("You enter ivalid UserName or Password")
    } else if (found === false) {
      i++
      alert("Incorrect Username or Password. ")
      if (i === 5) {
        navigate("/createUser")
        alert(
          "You enter 5 times incorrect Username or Password\n please sign up again."
        )
      }
    }
  }

  //styles
  const formStyle = {
    marginLeft: "5%",
    width: "500px",
  }

  const titleStyle = {
    marginLeft: "5%",
    marginRight: "5%",
  }

  return (
    <div class="text-bg-dark p-3">
      <br></br>
      <h3 style={titleStyle}>Sign In</h3>
      <br></br>
      <form style={formStyle} onSubmit={onSubmit}>
        <div className="text-bg-dark p-3">
          <label htmlFor="name" style={{ color: "whitesmoke" }}>
            Full Name
          </label>
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
        <div className="text-bg-dark p-3">
          <label htmlFor="password" style={{ color: "whitesmoke" }}>
            Password
          </label>
          <input
            required
            placeholder="Type Your Password Here"
            type="password"
            className="form-control"
            id="password"
            value={form.password}
            onChange={(e) => updateForm({ password: e.target.value })}
          />
        </div>
        <br></br>
        <br></br>
        <div className="b">
          <input
            type="submit"
            value="Sign in"
            className="btn btn-outline-light"
            //style={{marginLeft:"20px"}}
          />
          <br></br>
          <br></br>


          {/* <input
          type = "submit"
          value = "Sign out"
          className="btn btn-primary btn-"
          style={{marginRight :"10px"}}
          navigate = "/" */}
        </div>
        <div class="text-center mb-3">
          <button type="button" class="btn btn-link btn-floating mx-1">
            <i class="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

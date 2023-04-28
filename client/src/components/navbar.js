import React from "react"
import { useState, useEffect, useContext } from "react"
import NavDropdown from "react-bootstrap/NavDropdown"
import "bootstrap/dist/css/bootstrap.css"
import { Navigate, NavLink } from "react-router-dom"
import { UserContext } from "../App"

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function Navbar() {
  //states
  const { currentUser, setCurrentUser } = useContext(UserContext)
  var userList = currentUser.split("-")

  const [users, setUsers] = useState([])
  const [userType, setUserType] = useState("")

  const [signedOut, setSignedOut] = useState(false)

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

  //styles
  const titleStyle = {
    marginLeft: "5%",
    fontSize: "30px",
    color: "black",
  };

  const styles = {
    buttonStyle: {
      right: "10px",
      color: "black",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  const menustyles = {
    buttonStyle: {
      right: "10px",
      color: "black",
      "&:hover": {
        textDecoration: "none",
        color: "black"
      },
    },
  };

  function refershPage() {
    window.location.reload(false);
    Navigate("./");
  }
  function showAlert() {
    alert("Successfully Sign out...");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <NavLink className="navbar-brand" to="/">
          <h1 class="navbar-brand" href="#" style={titleStyle}>
            WorldStrides
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {userList[0] == "Admin" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/assignments"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "Admin" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/staffList"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/eventList"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createUser"
                  style={styles.buttonStyle}
                >
                  Sign up
                </NavLink>
              </li>
            )}

            {(userList[0] == "Admin" || userList[0] == "Lead") && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createEvent"
                  style={styles.s}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to={`/editUser/${userList[3]}`}
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="assignments"
                  style={styles.buttonStyle}
                ></NavLink>
              </li>
            )}
            {userList[0] == "default" && (
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  to="/createLogin"
                  style={styles.buttonStyle}
                >
                  Sign in
                </NavLink>
              </li>
            )}
            {userList[0] != "default" && (
              <li className="nav-item">
                <NavDropdown
                  className="navbar navbar-dark"
                  style={styles.buttonStyle}
                  title="Events"
                  id="nav-dropdown"
                >

                  <NavDropdown.Item eventKey="3.3">
                    <NavLink
                      className="nav-link"
                      to={`/eventList`}
                      style={menustyles.buttonStyle}
                    >
                      Event List
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
            {userList[0] == "Admin" && (
              <li className="nav-item cactive">
                <NavDropdown
                  className="navbar navbar-dark"
                  to="/adminCenter"
                  style={styles.buttonStyle}
                  // onClick={refershPage}
                  title="Admin"
                  id="nav-dropdown"
                >
                  <NavDropdown.Item eventKey="4.1">
                    <NavLink
                      className="nav-link"
                      to="/adminCenter"
                      style={menustyles.buttonStyle}
                    >
                      Upload Events
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">
                    <NavLink
                      className="nav-link"
                      to="/assignments"
                      style={menustyles.buttonStyle}
                    >
                      Event Assignments
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">
                    <NavLink
                      className="nav-link"
                      to="/staffList"
                      style={menustyles.buttonStyle}
                    >
                      Staff List
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.4">
                    <NavLink
                      className="nav-link"
                      to="/createEvent"
                      style={menustyles.buttonStyle}
                    >
                      Create Event
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
            {userList[0] != "default" && (
              <li>
                <NavDropdown
                  className="navbar navbar-dark"
                  style={styles.buttonStyle}
                  title="Account"
                >
                  <NavDropdown.Item eventKey="3.1">
                    <NavLink
                      className="nav-link"
                      to={`/editUser/${userList[3]}`}
                      style={menustyles.buttonStyle}
                    >
                      My Account
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="5.3">
                    <NavLink
                      className="nav-link"
                      to="/createLogin"
                      style={menustyles.buttonStyle}
                      onClick={(err) => {
                        alert("Successfully Sign out your account.")
                      }}
                    >
                      Sign Out
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

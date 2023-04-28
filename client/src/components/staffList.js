import React, { useEffect, useState } from "react"

const buttonStyle = {
  marginRight: "10px",
}

const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.almaMater}</td>
    <td>{props.user.city}</td>
    <td>{props.user.state}</td>
    <td>{props.user.type}</td>
    <td>
      <button
        style={buttonStyle}
        className="btn btn-danger"
        onClick={() => {
          props.deleteUser(props.user._id)
        }}
      >
        Delete
      </button>
    </td>
  </tr>
)

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export default function UserList() {
  //states
  const [users, setUsers] = useState([])

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
  async function deleteUser(id) {
    await fetch(`https://worldstrides-backend.onrender.com/user/${id}`, {
      method: "DELETE",
    })
    const newUsers = users.filter((el) => el._id !== id)
    setUsers(newUsers)
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function userList() {
    return users.map((user) => {
      console.log("USERS")
      console.log(users)
      return (
        <User
          user={user}
          deleteUser={() => deleteUser(user._id)}
          key={user._id}
        />
      )
    })
  }

  //styles
  const userListStyle = {
    marginLeft: "10px",
  }

  const tableStyle = {
    marginLeft: "10px",
    marginTop: "10px",
    marginRight: "10px",
  }

  return (
    <div class="p-3 mb-2 bg-secondary text-white">
      <br></br>
      <h3 style={userListStyle}>Staff List</h3>
      <table style={tableStyle} className="table table-striped">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Alma Mater</th>
            <th>Current City</th>
            <th>Current State</th>
            <th>Account Type</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{userList()}</tbody>
      </table>
    </div>
  )
}
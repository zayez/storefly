import { useState } from 'react'
import { useEffect } from 'react'

const Profile = ({ firstName, lastName, email }) => {
  const [txtFirstName, setFirstName] = useState(firstName)
  const [txtLastName, setLastName] = useState(lastName)
  const [txtEmail, setEmail] = useState(email)
  useEffect(() => {}, [])
  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(
      update({
        firstName: txtFirstName,
        lastName: txtLastName,
        email: txtEmail,
      }),
    )
  }
  return (
    <div className="container">
      <div className="profile">
        <h2>Profile</h2>
        <form className="form">
          <div className="field">
            <div className="field-label">
              <label>First name:</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={txtFirstName}
                onChange={({ target }) => setFirstName(target?.value)}
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label">
              <label>Last name:</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={txtLastName}
                onChange={({ target }) => setLastName(target?.value)}
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label">
              <label>E-mail:</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={txtEmail}
                onChange={({ target }) => setEmail(target?.value)}
              />
            </div>
          </div>
          <button className="btn">Save</button>
        </form>
      </div>
    </div>
  )
}

export default Profile

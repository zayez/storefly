const UserItem = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
    </tr>
  )
}

const UsersList = ({ users }) => {
  return (
    <div className="users-list">
      <table className="table-basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersList

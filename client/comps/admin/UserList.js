import { useRouter } from 'next/router'

const UserItem = ({ user }) => {
  const router = useRouter()
  const handleItemClick = (e) => {
    e.preventDefault()
    router.push(`/admin/users/${user.id}`)
  }
  return (
    <tr onClick={handleItemClick}>
      <td>{user.id}</td>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
    </tr>
  )
}

const UserList = ({ users }) => {
  return (
    <div className="users-list">
      <table className="table-basic">
        <thead>
          <tr>
            <th>#</th>
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

export default UserList

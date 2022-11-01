import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IUsers from '../../../node_modules/feather-icons/dist/icons/users.svg'
import { adminLayout } from '../../../comps/Layout'
import UsersList from '../../../comps/UsersList'
import {
  fetchUsers,
  selectUser,
  selectUsers,
} from '../../../store/slices/usersSlice'

const Users = ({}) => {
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  return (
    <>
      <Head>
        <title>Storefly dashboard | Users </title>
      </Head>
      <div>
        <h1 className="heading">
          <IUsers /> <span>Users</span>
        </h1>
        <hr />

        {user.loading && <div>Loading...</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user.loading && users.length ? <UsersList users={users} /> : null}
      </div>
    </>
  )
}

Users.getLayout = adminLayout

export default Users

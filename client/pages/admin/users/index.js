import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminLayout } from '../../../comps/Layout'
import UsersList from '../../../comps/UsersList'
import {
  fetchUsers,
  selectUser,
  selectUsers,
} from '../../../store/slices/userSlice'

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
        <title>Storefly | Home </title>
      </Head>
      <div>
        <h1>Users</h1>
        {user.loading && <div>Loading...</div>}
        {!user.loading && user.error ? <div>Error: {user.error}</div> : null}
        {!user.loading && users.length ? <UsersList users={users} /> : null}
      </div>
    </>
  )
}

Users.getLayout = adminLayout

export default Users

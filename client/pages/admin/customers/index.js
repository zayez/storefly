import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Users as IUsers } from 'react-feather'
import { adminLayout } from '../../../comps/Layout'
import UserList from '../../../comps/admin/UserList'
import {
  fetchUsersByRole,
  selectUser,
  selectUsers,
} from '../../../store/slices/usersSlice'
import { CUSTOMER_ROLE } from '../../../types/Roles'

const Users = ({}) => {
  const user = useSelector(selectUser)
  const users = useSelector(selectUsers)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsersByRole(CUSTOMER_ROLE))
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
        {!user.loading && users.length ? <UserList users={users} /> : null}
      </div>
    </>
  )
}

Users.getLayout = adminLayout

export default Users

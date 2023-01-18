import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomerForm from '../../../comps/admin/CustomerForm'
import { adminLayout } from '../../../comps/Layout'
import { fetchUser, selectUsers } from '../../../store/slices/usersSlice'

const User = ({}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const customer = users.selectedUser
  const { id } = router.query

  useEffect(() => {
    if (id) dispatch(fetchUser(id))
  }, [])
  return (
    <>
      <Head>
        <title>Storefly dashboard - Order</title>
      </Head>
      <div className="container">
        <h1>Customer</h1>

        {users.selectedUser ? <CustomerForm {...customer} /> : null}
      </div>
    </>
  )
}

User.getLayout = adminLayout

export default User

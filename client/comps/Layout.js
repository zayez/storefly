import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const StoreLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

const isManager = (user) => {
  if (!user) return false
  const userRoles = user.roles
  return ['admin', 'editor'].some((role) => userRoles.includes(role))
}

const AdminLayout = ({ children }) => {
  const router = useRouter()
  const auth = useSelector(selectAuth)

  useEffect(() => {
    if (!auth.user) router.push('/')
  }, [])
  return (
    <div>
      <Sidebar />
      <div className="container-fluid">{children}</div>
    </div>
  )
}

const storeLayout = (page) => {
  return <StoreLayout>{page}</StoreLayout>
}

const adminLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export { storeLayout, adminLayout }

import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'

const Navbar = () => {
  const auth = useSelector(selectAuth)

  useEffect(() => {}, [])
  return (
    <nav className="navbar nav nav-left">
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        {isManager(auth.user) ? (
          <li>
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

const isManager = (user) => {
  if (!user) return false
  const userRoles = user.roles
  return ['admin', 'editor'].some((role) => userRoles.includes(role))
}

export default Navbar

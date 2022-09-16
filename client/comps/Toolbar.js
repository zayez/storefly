import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAuth } from '../store/slices/authSlice'
import ICart from '../node_modules/feather-icons/dist/icons/shopping-cart.svg'
import IUser from '../node_modules/feather-icons/dist/icons/user.svg'
import ILogout from '../node_modules/feather-icons/dist/icons/log-out.svg'
import ISearch from '../node_modules/feather-icons/dist/icons/search.svg'

const Profile = () => {
  return (
    <Link href="/profile">
      <a>
        <IUser />
      </a>
    </Link>
  )
}

const SignIn = () => {
  return (
    <Link href="/signin">
      <a>Sign in</a>
    </Link>
  )
}

const Account = ({ user }) => {
  if (user) return <Profile />
  return <SignIn />
}

const SignOut = () => {
  return (
    <li>
      <Link href="/signout">
        <a>
          <ILogout />
        </a>
      </Link>
    </li>
  )
}

const Toolbar = () => {
  const auth = useSelector(selectAuth)

  useEffect(() => {}, [auth.user])
  return (
    <nav className="navbar toolbar">
      <ul>
        <li>
          <Link href="/search">
            <a>
              <ISearch />
            </a>
          </Link>
        </li>
        <li>
          <Account user={auth.user} />
        </li>
        {auth.user ? <SignOut /> : null}
        <li>
          <Link href="/cart">
            <a>
              <ICart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Toolbar

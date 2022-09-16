import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, signOut } from '../store/slices/authSlice'
import ICart from '../node_modules/feather-icons/dist/icons/shopping-cart.svg'
import IUser from '../node_modules/feather-icons/dist/icons/user.svg'
import ILogout from '../node_modules/feather-icons/dist/icons/log-out.svg'
import ILogin from '../node_modules/feather-icons/dist/icons/log-in.svg'
import ISearch from '../node_modules/feather-icons/dist/icons/search.svg'

const Profile = () => {
  return (
    <Link href="/profile">
      <a className="toolbar-item">
        <IUser />
      </a>
    </Link>
  )
}

const SignIn = () => {
  return (
    <Link href="/signin">
      <a className="toolbar-item">
        <ILogin />
      </a>
    </Link>
  )
}

const Account = ({ user }) => {
  if (user) return <Profile />
  return <SignIn />
}

const SignOut = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  useEffect(() => {}, [auth])

  const handleSignOut = (event) => {
    event.preventDefault()
    dispatch(signOut())
  }
  return (
    <li>
      <a className="toolbar-item" onClick={handleSignOut}>
        <ILogout />
      </a>
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
            <a className="toolbar-item">
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
            <a className="toolbar-item">
              <ICart />
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Toolbar

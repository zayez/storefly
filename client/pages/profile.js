import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../comps/Profile'
import { selectAuth, signUser } from '../store/slices/authSlice'

const ProfileView = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  // const router = useRouter()

  useEffect(() => {
    if (!auth.user) {
      dispatch(signUser())
    }
  }, [])

  if (!auth.user) return
  const { firstName, lastName, email } = auth.user
  return <Profile firstName={firstName} lastName={lastName} email={email} />
}

export default ProfileView

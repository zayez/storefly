import { useState } from 'react'
import { useRouter } from 'next/router'
const SignIn = () => {
  const router = useRouter()
  const baseUrl = `/api`
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = `${baseUrl}/signin`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }
    const res = await fetch(url, requestOptions)
    if (res.status === 200) {
      router.push('/')
    } else {
      console.log('Failed to signin.')
    }
  }

  return (
    <div className="container">
      <div className="login">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <div className="field-label">
              <label>E-mail:</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target?.value)}
              />
            </div>
          </div>
          <div className="field">
            <div className="field-label">
              <label>Password:</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target?.value)}
              />
            </div>
          </div>
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  )
}

SignIn.getLayout = (page) => page

export default SignIn

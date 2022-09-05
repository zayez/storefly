import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>Oops..</h1>
      <h2>The page has not been found.</h2>
      <p>
        Go back to the{' '}
        <Link href="/">
          <a>Homepage</a>
        </Link>
        .
      </p>
    </div>
  )
}

export default NotFound

import Link from 'next/link'

const Navbar = () => {
  return <div></div>
}

const NavbarLeft = () => {
  return (
    <nav className="nav nav-left">
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
        <li>
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const NavbarRight = () => {
  return (
    <nav className="nav nav-right">
      <ul>
        <li>
          <Link href="/search">
            <a>Search</a>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </li>
        <li>
          <Link href="/cart">
            <a>Cart</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export { NavbarLeft, NavbarRight }

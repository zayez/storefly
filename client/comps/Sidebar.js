import Link from 'next/link'
import IHome from '../node_modules/feather-icons/dist/icons/home.svg'
import IUsers from '../node_modules/feather-icons/dist/icons/users.svg'
import ICategories from '../node_modules/feather-icons/dist/icons/grid.svg'
import IProducts from '../node_modules/feather-icons/dist/icons/package.svg'
import IOrders from '../node_modules/feather-icons/dist/icons/layers.svg'

const Sidebar = ({}) => {
  return (
    <nav className="sidebar">
      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <Link href="/admin">
            <a className="nav-link">
              <IHome />
              <span className="link-text">Dashboard</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link href="/admin/users">
            <a className="nav-link">
              <IUsers />
              <span className="link-text">Users</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link href="/admin/categories">
            <a className="nav-link">
              <ICategories />
              <span className="link-text">Categories</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link href="/admin/products">
            <a className="nav-link">
              <IProducts />
              <span className="link-text">Products</span>
            </a>
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link href="/admin/orders">
            <a className="nav-link">
              <IOrders />
              <span className="link-text">Orders</span>
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar

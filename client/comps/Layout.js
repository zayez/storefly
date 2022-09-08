import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

const StoreLayout = ({ children }) => {
  return (
    <div className="container">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

const AdminLayout = ({ children }) => {
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

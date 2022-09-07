import Header from './Header'
import Footer from './Footer'

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
  return <div className="container">{children}</div>
}

const storeLayout = (page) => {
  return <StoreLayout>{page}</StoreLayout>
}

const adminLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export { storeLayout, adminLayout }

import Head from 'next/head'
import { adminLayout } from '../../comps/Layout'
import IHome from '../../node_modules/feather-icons/dist/icons/home.svg'

const Index = () => {
  return (
    <>
      <Head>
        <title>Storefly dashboard </title>
      </Head>
      <div>
        <h1 className="heading">
          <IHome /> <span>Dashboard</span>
        </h1>
        <hr />
        <div className="dashboard"></div>
      </div>
    </>
  )
}

Index.getLayout = adminLayout

export default Index

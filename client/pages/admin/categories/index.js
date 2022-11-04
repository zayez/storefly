import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import ICategories from '../../../node_modules/feather-icons/dist/icons/grid.svg'
import { adminLayout } from '../../../comps/Layout'
import {
  destroy,
  fetchCategories,
  selectCategories,
} from '../../../store/slices/categoriesSlice'
import CategoriesList from '../../../comps/admin/CategoriesList'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Callout from '../../../comps/Callout'
import Modal from '../../../comps/Modal'

const Categories = () => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(null)
  const [selectedId, setSelectedId] = useState(0)
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleModalEnter = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const handleDelete = async () => {
    dispatch(destroy(selectedId))
  }

  const handleModalExit = () => {
    setShowModal(false)
  }

  const handleAddCategory = (e) => {
    e.preventDefault()
    router.push('/admin/categories/new')
  }
  return (
    <>
      <Head>
        <title>Storefly dashboard | Categories </title>
      </Head>
      <div className="container">
        <h1 className="heading">
          <div className="h">
            <ICategories /> <span>Categories</span>
          </div>
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add category
          </button>
        </h1>
        <hr />
        {!categories.loading && categories.message ? (
          <Callout message={message} />
        ) : null}
        {categories.loading && <div>Loading...</div>}
        {!categories.loading && categories.error ? (
          <div>Error: {categories.error}</div>
        ) : null}
        {!categories.loading && categories.categories.length ? (
          <CategoriesList
            categories={categories.categories}
            onDelete={handleModalEnter}
          />
        ) : null}
        <Modal
          title={`Delete category`}
          message={`This can't be undone.`}
          type="danger"
          actionName={`Delete`}
          onExit={handleModalExit}
          onConfirm={handleDelete}
          show={showModal}
        />
      </div>
    </>
  )
}

Categories.getLayout = adminLayout

export default Categories

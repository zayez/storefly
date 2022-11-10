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
import Modal from '../../../comps/Modal'

const Categories = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(null)
  const [selectedId, setSelectedId] = useState(0)
  const categories = useSelector(selectCategories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleAddCategory = (e) => {
    e.preventDefault()
    router.push('/admin/categories/new')
  }

  const handleDelete = async () => {
    dispatch(destroy(selectedId))
  }

  const handleModalEnter = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const handleModalExit = () => {
    setShowModal(false)
  }

  return (
    <>
      <Head>
        <title>Storefly dashboard | Categories </title>
      </Head>
      <div className="container">
        <div className="heading-spaced">
          <div className="heading">
            <ICategories /> <h1>Categories</h1>
          </div>
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add category
          </button>
        </div>
        <hr />
        {categories.loading && <div>Loading...</div>}
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

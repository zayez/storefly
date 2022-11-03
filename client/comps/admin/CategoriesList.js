import { useRouter } from 'next/router'
import IDelete from '../../node_modules/feather-icons/dist/icons/x-circle.svg'

const CategoryItem = ({ category, id, onDelete }) => {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/admin/categories/${id}`)
  }

  return (
    <tr>
      <td onClick={handleClick}>{category.id}</td>
      <td onClick={handleClick}>{category.title}</td>
      <td onClick={() => onDelete(id)}>
        <button className="btn-svg">
          <IDelete />
        </button>
      </td>
    </tr>
  )
}

const CategoriesList = ({ categories, onDelete }) => {
  return (
    <div className="categories-list">
      <table className="table-basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th className="delete-item">Remove</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryItem
              category={category}
              key={category.id}
              id={category.id}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList

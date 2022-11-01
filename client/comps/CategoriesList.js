import { useRouter } from 'next/router'

const CategoryItem = ({ category, id }) => {
  const router = useRouter()
  const handleClick = (e) => {
    e.preventDefault()
    router.push(`/admin/categories/${id}`)
  }
  return (
    <tr onClick={handleClick}>
      <td>{category.id}</td>
      <td>{category.title}</td>
    </tr>
  )
}

const CategoriesList = ({ categories }) => {
  return (
    <div className="categories-list">
      <table className="table-basic">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryItem
              category={category}
              key={category.id}
              id={category.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CategoriesList

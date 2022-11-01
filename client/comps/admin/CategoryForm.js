const CategoryForm = ({
  id,
  title,
  setTitle,
  handleSubmit,
  handleBackClick,
}) => {
  return (
    <div className="container category">
      <div className="category-card-details">
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            <div className="field-label">
              <label htmlFor="id">ID</label>
            </div>

            <div className="field-body">
              <input
                type="text"
                defaultValue={id}
                disabled={true}
                readOnly={true}
              />
            </div>
          </div>
          <div className="field">
            <div className="field-label">
              <label htmlFor="title">Title</label>
            </div>
            <div className="field-body">
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target?.value)}
              />
            </div>
          </div>
          <button className="btn" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn" onClick={handleBackClick}>
            Back
          </button>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm

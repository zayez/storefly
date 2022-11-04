const CategoryForm = ({
  id,
  title,
  setTitle,
  submitText = `Save`,
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

            <div className="field-control">
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
          <div className="buttons">
            <button className="btn" onClick={handleBackClick}>
              Back
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CategoryForm

const Toasty = ({ message }) => {
  if (message) return <div className="toasty">{message}</div>
  return <></>
}

const ErrorItem = ({ error }) => {
  return <li>{error} </li>
}
const ErrorsList = ({ errors }) => {
  return (
    <ul className="errors-list">
      {errors.map((error, i) => (
        <ErrorItem error={error} key={i} />
      ))}
    </ul>
  )
}

export const ToastyError = ({ error, errors }) => {
  return (
    <div className="toasty toasty-error">
      <div className="toasty-error-title">{error}</div>

      {errors ? <ErrorsList errors={errors} /> : null}
    </div>
  )
}

export default Toasty

const Callout = ({ message }) => {
  if (message) return <div className="callout">{message}</div>
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

export const CalloutError = ({ error, errors }) => {
  return (
    <div className="callout callout-error">
      <div className="callout-error-title">{error}</div>

      {errors ? <ErrorsList errors={errors} /> : null}
    </div>
  )
}

export default Callout

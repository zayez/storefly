const getType = (type) => {
  switch (type) {
    case 'info':
      return 'info'
    case 'error':
      return 'danger'
    case `warning`:
      return 'warning'
    default:
      return 'info'
  }
}

const Callout = ({ message, type = 'info' }) => {
  const calloutVisibility =
    message == null ? '' : message === '' ? 'hide' : 'show'
  const style = getType(type)
  return (
    <div className={`callout callout-${style} ${calloutVisibility}`}>
      {message}
    </div>
  )
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
    <div className="callout callout-danger show">
      <div className="callout-danger-title">{error}</div>

      {errors ? <ErrorsList errors={errors} /> : null}
    </div>
  )
}

export default Callout

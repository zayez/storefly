const Toasty = ({ message }) => {
  if (message) return <div className="toasty">{message}</div>
  return <></>
}

export default Toasty

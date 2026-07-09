function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner" />
        <p className="loading-text">{message}</p>
      </div>
    </div>
  )
}

export default LoadingSpinner

function PageWrapper({ children, className = '' }) {
  return (
    <div className={`page-wrapper animate-fade-in ${className}`}>
      {children}
    </div>
  )
}

export default PageWrapper

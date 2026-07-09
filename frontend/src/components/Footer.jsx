function Footer() {
  return (
    <footer className="footer mt-auto">
      <div className="container">
        <div className="text-center">
          <p className="mb-1">
            <span className="footer-brand">ShopEase</span>
          </p>
          <p className="mb-0 small">
            Built with React + Spring Boot Microservices on Azure Cloud
          </p>
          <p className="mb-0 small mt-2 opacity-75">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

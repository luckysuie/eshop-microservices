import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

function NotFound() {
  return (
    <PageWrapper>
      <div className="container not-found-container">
        <div>
          <div className="empty-state-icon">🔍</div>
          <h1 className="not-found-code">404</h1>
          <h3 className="fw-bold mb-3 animate-fade-in-up animate-delay-1">Page Not Found</h3>
          <p className="text-muted mb-4 animate-fade-in-up animate-delay-2">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn btn-primary-custom btn-lg px-5 animate-fade-in-up animate-delay-3">
            Go Home
          </Link>
        </div>
      </div>
    </PageWrapper>
  )
}

export default NotFound

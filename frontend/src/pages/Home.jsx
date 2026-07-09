import { Link } from 'react-router-dom'
import PageWrapper from '../components/PageWrapper'

function Home() {
  const features = [
    { icon: '🚀', title: 'Fast Delivery', desc: 'Get your orders delivered quickly and safely to your doorstep.' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Your payment information is always protected with encryption.' },
    { icon: '🌟', title: 'Quality Products', desc: 'Every product is carefully curated for the best quality.' },
  ]

  return (
    <PageWrapper>
      <section className="hero-section text-center">
        <div className="container hero-content">
          <div className="hero-float-icon">🛒</div>
          <h1 className="hero-title mb-3">Welcome to ShopEase</h1>
          <p className="hero-subtitle">
            Discover amazing products at great prices, delivered fast to your door.
          </p>
          <div className="hero-cta">
            <Link to="/products" className="btn btn-ghost-light btn-lg px-5">
              Shop Now →
            </Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="text-center mb-5 animate-fade-in-up">
            <h2 className="page-title">Why Choose ShopEase?</h2>
            <p className="page-subtitle">Everything you need for a seamless shopping experience</p>
          </div>
          <div className="row g-4">
            {features.map((feature, i) => (
              <div key={feature.title} className={`col-md-4 animate-fade-in-up animate-delay-${i + 1}`}>
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-cta">
        <div className="container text-center position-relative">
          <h3 className="fw-bold mb-2 animate-fade-in-up">Ready to start shopping?</h3>
          <p className="opacity-75 mb-4 animate-fade-in-up animate-delay-1">
            Join thousands of happy customers today
          </p>
          <div className="animate-fade-in-up animate-delay-2">
            <Link to="/register" className="btn btn-primary-custom btn-lg me-2 mb-2">
              Create Account
            </Link>
            <Link to="/products" className="btn btn-ghost-light btn-lg mb-2">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

export default Home

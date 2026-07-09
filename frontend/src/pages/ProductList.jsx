import { useState, useEffect } from 'react'
import { getAllProducts, searchProducts } from '../services/productService'
import ProductCard from '../components/ProductCard'
import PageWrapper from '../components/PageWrapper'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await getAllProducts()
      setProducts(response.data)
    } catch (err) {
      setError('Failed to load products. Make sure the product-service is running.')
      console.error('Error loading products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      loadProducts()
      return
    }
    try {
      setLoading(true)
      const response = await searchProducts(searchTerm)
      setProducts(response.data)
    } catch (err) {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <PageWrapper>
        <div className="container page-section">
          <div className="page-header animate-fade-in-up">
            <h2 className="page-title">All Products</h2>
            <p className="page-subtitle">Browse our curated collection</p>
          </div>
          <div className="skeleton-grid">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton-card" />
            ))}
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <div className="page-header animate-fade-in-up">
          <h2 className="page-title">All Products</h2>
          <p className="page-subtitle">Browse our curated collection</p>
        </div>

        <form onSubmit={handleSearch} className="mb-4 animate-fade-in-up animate-delay-1">
          <div className="search-bar d-flex align-items-center">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary-custom btn-sm me-1">
              Search
            </button>
            <button
              type="button"
              className="btn btn-outline-custom btn-sm"
              onClick={() => { setSearchTerm(''); loadProducts() }}
            >
              Clear
            </button>
          </div>
        </form>

        {error && <div className="alert alert-custom alert-danger-custom mb-4">{error}</div>}

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <h4 className="fw-bold">No products found</h4>
            <p className="text-muted">Try a different search term or check back later.</p>
          </div>
        ) : (
          <div className="row g-4">
            {products.map((product, index) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default ProductList

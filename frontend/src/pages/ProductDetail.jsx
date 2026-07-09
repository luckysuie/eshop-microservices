import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById } from '../services/productService'
import { useCart } from '../context/CartContext'
import LoadingSpinner from '../components/LoadingSpinner'
import PageWrapper from '../components/PageWrapper'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await getProductById(id)
        setProduct(response.data)
      } catch (err) {
        setError('Product not found.')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    addToCart(product)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  if (loading) return <LoadingSpinner message="Loading product..." />
  if (error) {
    return (
      <PageWrapper>
        <div className="container page-section">
          <div className="alert alert-custom alert-danger-custom">{error}</div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="container page-section">
        <button onClick={() => navigate(-1)} className="back-btn mb-4">
          ← Back
        </button>

        <div className="row g-5 align-items-center">
          <div className="col-md-5">
            <div className="product-detail-image">
              <span>📦</span>
            </div>
          </div>

          <div className="col-md-7 product-detail-info">
            <span className="category-badge mb-3 d-inline-block">{product.category}</span>
            <h1 className="page-title mb-3">{product.name}</h1>
            <p className="text-muted fs-6 mb-4">{product.description}</p>
            <h2 className="product-price mb-3">${product.price?.toFixed(2)}</h2>
            <p className="mb-4">
              {product.stock > 0
                ? <span className="text-success fw-semibold">In Stock — {product.stock} available</span>
                : <span className="text-danger fw-semibold">Out of Stock</span>
              }
            </p>
            <button
              className={`btn btn-lg px-5 ${addedToCart ? 'btn-success-custom added-flash' : 'btn-primary-custom'}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default ProductDetail

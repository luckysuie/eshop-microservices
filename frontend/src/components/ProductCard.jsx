import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()

  return (
    <div
      className="product-card h-100 d-flex flex-column"
      style={{ animationDelay: `${Math.min(index * 0.08, 0.5)}s` }}
    >
      <div className="product-card-image">
        <span>📦</span>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h6 className="card-title fw-bold mb-2">{product.name}</h6>
        <p className="card-text text-muted small flex-grow-1 mb-2">
          {product.description?.substring(0, 80)}{product.description?.length > 80 ? '...' : ''}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="category-badge">{product.category}</span>
          <span className="product-price">${product.price?.toFixed(2)}</span>
        </div>
        <small className={`mt-2 ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
          {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
        </small>
      </div>

      <div className="card-footer bg-transparent border-0 d-flex gap-2 p-3 pt-0">
        <Link
          to={`/products/${product.id}`}
          className="btn btn-outline-custom btn-sm flex-grow-1"
        >
          View
        </Link>
        <button
          className="btn btn-primary-custom btn-sm flex-grow-1"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
export default function ProductCard({ product, delay = 0 }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    addToast(`${product.name} added to cart`);
  };
  

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
    addToast(
      wishlisted ? `Removed from wishlist` : `Added to wishlist`,
      wishlisted ? 'info' : 'wishlist'
    );
  };
 const imageUrl = product.image?.startsWith("http")
  ? product.image
  : `http://127.0.0.1:8000${product.image}`;

  return (
    
    <Link
      to={`/product/${product.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {/* <div className="relative overflow-hidden bg-cream-100 aspect-[4/5] mb-4"> */}
      <div className="relative overflow-hidden bg-cream-100 aspect-[4/5] mb-4 group cursor-pointer">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-mono tracking-wider
            ${product.badge === 'Sale' ? 'bg-terracotta-500 text-white' : ''}
            ${product.badge === 'New' ? 'bg-sage-500 text-white' : ''}
            ${product.badge === 'Bestseller' ? 'bg-charcoal-900 text-cream-50' : ''}
          `}>
            {product.badge}
          </div>
        )}

        {/* Out of stock */}
      {product.inStock === false && (
  <div className="absolute inset-0 bg-cream-50/70 flex items-center justify-center">
    <span className="font-mono text-xs tracking-widest text-charcoal-800/60 uppercase">
      Out of Stock
    </span>
  </div>
)}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-cream-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-terracotta-500 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" className={wishlisted ? 'text-terracotta-500' : ''}>
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Quick add */}
        {/* {product.inStock && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-charcoal-900 text-cream-50 py-3 font-body text-sm font-medium tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            Add to Cart
          </button>
        )} */}
        {product.inStock !== false && (
  <button
    onClick={handleAddToCart}
    className="absolute bottom-0 left-0 right-0 z-20 bg-charcoal-900 text-cream-50 py-3 text-sm font-medium
    translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out"
  >
    Add to Cart
  </button>
)}
      </div>
{/* <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300 z-10"></div> */}
      {/* Info */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-body text-sm font-medium text-charcoal-900 group-hover:text-charcoal-800 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] text-amber-500">★</span>
            <span className="font-mono text-xs text-charcoal-800/50">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-sm font-semibold text-charcoal-900">
            ₹{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="font-body text-xs text-charcoal-800/40 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

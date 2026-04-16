import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const { addToast } = useToast();

  const handleRemove = (item) => {
    removeItem(item.id);
    addToast(`${item.name} removed from cart`, 'info');
  };

  if (items.length === 0) {
    return (
      <div className="pt-16 md:pt-20 min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl">🛋️</div>
        <h2 className="font-display text-3xl text-charcoal-900">Your cart is empty</h2>
        <p className="font-body text-charcoal-800/60 text-center max-w-sm">
          Looks like you haven't added anything yet. Browse our collection to find something you'll love.
        </p>
        <Link to="/shop" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  const shipping = total >= 5000 ? 0 : 499;

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <h1 className="section-title">Shopping Cart</h1>
          <button onClick={() => { clearCart(); addToast('Cart cleared', 'info'); }} className="font-body text-xs text-charcoal-800/40 hover:text-red-500 transition-colors underline">
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
           {items.map(item => {
  const imageUrl = item.image?.startsWith("http")
    ? item.image
    : `http://127.0.0.1:8000${item.image}`;

  return (
    <div key={item.id} className="flex gap-5 pb-6 border-b border-cream-300">

      <Link to={`/product/${item.id}`} className="w-24 h-24 md:w-32 md:h-32 overflow-hidden shrink-0 bg-cream-100">
        
        {/* ✅ FIXED IMAGE */}
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />

      </Link>
      

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link to={`/product/${item.id}`} className="font-body font-medium text-charcoal-900 hover:underline truncate">
            {item.name}
          </Link>

           
                    <button onClick={() => handleRemove(item)} className="text-charcoal-800/30 hover:text-red-500 transition-colors shrink-0 ml-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                  <p className="font-mono text-xs text-charcoal-800/40 capitalize mb-3">{item.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-cream-300">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-cream-100 transition-colors">−</button>
                      <span className="w-10 text-center font-mono text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-cream-100 transition-colors">+</button>
                    </div>
                    <span className="font-body font-semibold text-charcoal-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
  );
            })} 
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-cream-100 p-6 sticky top-24">
              <h2 className="font-display text-xl text-charcoal-900 mb-6">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-charcoal-800/60">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="text-charcoal-900">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-charcoal-800/60">Shipping</span>
                  <span className={shipping === 0 ? 'text-sage-500 font-medium' : 'text-charcoal-900'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="font-mono text-xs text-charcoal-800/40">Add ₹{(5000 - total).toLocaleString()} more for free shipping</p>
                )}
                <div className="border-t border-cream-300 pt-3 flex justify-between font-body font-semibold">
                  <span className="text-charcoal-900">Total</span>
                  <span className="text-charcoal-900 text-lg">₹{(total + shipping).toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full text-center block">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="btn-outline w-full text-center block mt-3">
                Continue Shopping
              </Link>

              {/* Trust badges */}
              <div className="mt-6 pt-6 border-t border-cream-300 flex flex-col gap-2">
                {['Secure checkout', 'Free 30-day returns', 'Encrypted payment'].map(t => (
                  <div key={t} className="flex items-center gap-2 font-body text-xs text-charcoal-800/50">
                    <span className="text-sage-500 text-sm">✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
              
  );
}

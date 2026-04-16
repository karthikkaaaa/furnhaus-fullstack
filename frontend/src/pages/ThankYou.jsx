import { useLocation, Link, Navigate } from 'react-router-dom';

export default function ThankYou() {
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <Navigate to="/" replace />;

  const paymentLabels = { cod: 'Cash on Delivery', card: 'Credit / Debit Card', upi: 'UPI / GPay' };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        {/* Success icon */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-sage-500 flex items-center justify-center mx-auto mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal-900 mb-3">Order Confirmed!</h1>
          <p className="font-body text-charcoal-800/60 max-w-md mx-auto">
            Thank you for your purchase. Your order has been received and is being prepared for delivery.
          </p>
        </div>

        {/* Order details */}
        <div className="bg-cream-100 border border-cream-300 p-8 mb-8">
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-cream-300">
            <div>
              <p className="label-sm mb-1">Order ID</p>
              <p className="font-mono text-sm text-charcoal-900 font-medium">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="label-sm mb-1">Date</p>
              <p className="font-body text-sm text-charcoal-900">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6 pb-6 border-b border-cream-300">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover bg-cream-200 shrink-0" />
                <div className="flex-1">
                  <p className="font-body text-sm font-medium text-charcoal-900">{item.name}</p>
                  <p className="font-mono text-xs text-charcoal-800/40">Qty: {item.quantity}</p>
                </div>
                <p className="font-body text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Summary row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="label-sm mb-1">Total Paid</p>
              <p className="font-display text-xl text-charcoal-900">₹{order.total.toLocaleString()}</p>
            </div>
            <div>
              <p className="label-sm mb-1">Payment Method</p>
              <p className="font-body text-sm text-charcoal-900">{paymentLabels[order.payment]}</p>
            </div>
            <div>
              <p className="label-sm mb-1">Shipping To</p>
              <p className="font-body text-xs text-charcoal-800/60 leading-relaxed">{order.shipping}</p>
            </div>
          </div>
        </div>

        {/* Estimated delivery */}
        <div className="bg-sage-500/10 border border-sage-500/20 p-5 mb-10 flex items-center gap-4">
          <span className="text-2xl">🚚</span>
          <div>
            <p className="font-body text-sm font-semibold text-charcoal-900">Estimated Delivery</p>
            <p className="font-body text-xs text-charcoal-800/60">
              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })} — {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/shop" className="btn-primary text-center">Continue Shopping</Link>
          <Link to="/dashboard" className="btn-outline text-center">View Order History</Link>
        </div>
      </div>
    </div>
  );
}

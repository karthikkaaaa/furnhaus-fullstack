import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
// import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from "../api";
const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
  { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, Rupay' },
  { id: 'upi', label: 'UPI / GPay', icon: '📱', desc: 'Google Pay, PhonePe, BHIM' },
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Full name is required';
  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) errors.phone = 'Valid 10-digit phone required';
  if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email required';
  if (!form.address.trim()) errors.address = 'Address is required';
  if (!form.city.trim()) errors.city = 'City is required';
  if (!form.state.trim()) errors.state = 'State is required';
  if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) errors.pincode = 'Valid 6-digit pincode required';
  if (form.payment === 'card') {
    if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length !== 16) errors.cardNumber = 'Valid card number required';
    if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = 'MM/YY format required';
    if (!form.cvv || !/^\d{3,4}$/.test(form.cvv)) errors.cvv = 'Valid CVV required';
  }
  if (form.payment === 'upi') {
    if (!form.upiId || !form.upiId.includes('@')) errors.upiId = 'Valid UPI ID required (e.g. name@upi)';
  }
  return errors;
}

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  // const { user, addOrder } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // const [form, setForm] = useState({
  //   name: user?.name || '', email: user?.email || '', phone: '',
  //   address: '', city: '', state: '', pincode: '',
  //   payment: 'cod', cardNumber: '', expiry: '', cvv: '', cardName: '', upiId: '',
  // });
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    payment: 'cod',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
    upiId: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  

const set = (field, value) => {
  setForm(prev => ({
    ...prev,
    [field]: value
  }));

  // clear error when typing
  if (errors[field]) {
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  }
};
const fieldProps = {
  form,
  set,
  errors
};

  if (items.length === 0) {
    return (
      <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="font-display text-3xl">Your cart is empty</h2>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  const shipping = total >= 5000 ? 0 : 499;
  const grandTotal = total + shipping;

  // const set = (field, value) => {
  //   setForm(f => ({ ...f, [field]: value }));
  //   if (errors[field]) setErrors(e => ({ ...e, [field]: '' }));
  // };
const handlePayment = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/create-payment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: grandTotal, // ✅ use your total
      }),
    });

    const data = await res.json();

    const options = {
      key: "rzp_test_SbWdovEmpEyzTH", // ✅ your real key
      amount: data.amount,
      currency: "INR",
      name: "FurnHaus",
      description: "Order Payment",
      order_id: data.id,

      handler: function (response) {
        addToast("✅ Payment successful!", "success");

        // 🔥 VERY IMPORTANT
        handleSubmit(); // call your existing order function
      },

      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    addToast("❌ Payment failed!", "error");
  }
};
  
const handleSubmit = async () => {
  const errs = validate(form);
  if (Object.keys(errs).length) {
    setErrors(errs);
    addToast('Please fix form errors', 'error');
    return;
  }

  setProcessing(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
  body: JSON.stringify({
  name: form.name,
  email: form.email,
  phone: form.phone,
  address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
  total: total,
  items: JSON.stringify(items),  
  payment: form.payment 
})
    });

    if (!res.ok) throw new Error();

    addToast("🎉 Order placed successfully!", "success");

    clearCart();

    setTimeout(() => {
      window.location.href = "/";
    }, 2000);

  } catch (error) {
    addToast("❌ Order failed!", "error");
  }

  setProcessing(false);
};

function Field({ label, name, type = 'text', placeholder, half, form, set, errors }) {
  return (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="font-body text-xs font-semibold tracking-wider uppercase text-charcoal-800/50 block mb-1.5">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        className={`input-field ${errors[name] ? 'border-red-400' : ''}`}
      />

      {errors[name] && (
        <p className="font-body text-xs text-red-500 mt-1">{errors[name]}</p>
      )}
    </div>
  );
}

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="section-title mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {/* Delivery */}
            <div>
              <h2 className="font-display text-xl mb-6 pb-3 border-b border-cream-300">Delivery Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Full Name" name="name" placeholder="Ravi Kumar" half {...fieldProps} />

  
                <Field label="Email" name="email" type="email" placeholder="ravi@email.com" half {...fieldProps} />
   
                <Field label="Phone" name="phone" placeholder="9876543210" half {...fieldProps}/>
                <Field label="Street Address" name="address" placeholder="12 MG Road, Apartment 4B" half {...fieldProps} />
                <Field label="City" name="city" placeholder="Kozhikode" half {...fieldProps} />
                <Field label="State" name="state" placeholder="Kerala" half {...fieldProps} />
                <Field label="Pincode" name="pincode" placeholder="673001" half {...fieldProps} />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="font-display text-xl mb-6 pb-3 border-b border-cream-300">Payment Method</h2>
              <div className="flex flex-col gap-3 mb-6">
                {PAYMENT_METHODS.map(m => (
                  <label key={m.id} className={`flex items-center gap-4 p-4 border cursor-pointer transition-all duration-200
                    ${form.payment === m.id ? 'border-charcoal-900 bg-cream-100' : 'border-cream-300 hover:border-charcoal-800/40'}`}>
                    <input type="radio" name="payment" value={m.id} checked={form.payment === m.id} onChange={() => set('payment', m.id)} className="accent-charcoal-900" />
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <div className="font-body text-sm font-medium text-charcoal-900">{m.label}</div>
                      <div className="font-mono text-xs text-charcoal-800/40">{m.desc}</div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Card fields */}
              {form.payment === 'card' && (
                <div className="grid grid-cols-2 gap-4 bg-cream-100 p-5 border border-cream-300">
                  <div className="col-span-2">
                    <label className="label-sm block mb-1.5">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={e => set('cardNumber', e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())}
                      className={`input-field ${errors.cardNumber ? 'border-red-400' : ''}`}
                    />
                    {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="label-sm block mb-1.5">Expiry</label>
                    <input type="text" placeholder="MM/YY" maxLength={5}
                      value={form.expiry}
                      onChange={e => { let v = e.target.value.replace(/\D/g,''); if (v.length>=3) v=v.slice(0,2)+'/'+v.slice(2); set('expiry',v); }}
                      className={`input-field ${errors.expiry ? 'border-red-400' : ''}`}
                    />
                    {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
                  </div>
                  <div>
                    <label className="label-sm block mb-1.5">CVV</label>
                    <input type="password" placeholder="•••" maxLength={4}
                      value={form.cvv} onChange={e => set('cvv', e.target.value.replace(/\D/g,''))}
                      className={`input-field ${errors.cvv ? 'border-red-400' : ''}`}
                    />
                    {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
                  </div>
                  <div className="col-span-2">
                    <label className="label-sm block mb-1.5">Name on Card</label>
                    <input type="text" placeholder="RAVI KUMAR" value={form.cardName} onChange={e => set('cardName', e.target.value.toUpperCase())} className="input-field" />
                  </div>
                </div>
              )}

              {/* UPI */}
              {form.payment === 'upi' && (
                <div className="bg-cream-100 p-5 border border-cream-300">
                  <label className="label-sm block mb-1.5">UPI ID</label>
                  <input type="text" placeholder="yourname@upi" value={form.upiId} onChange={e => set('upiId', e.target.value)}
                    className={`input-field ${errors.upiId ? 'border-red-400' : ''}`}
                  />
                  {errors.upiId && <p className="text-xs text-red-500 mt-1">{errors.upiId}</p>}
                  <p className="font-mono text-xs text-charcoal-800/40 mt-2">Enter your UPI ID to proceed (mock — no real charge)</p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-cream-100 p-6 sticky top-24">
              <h2 className="font-display text-xl mb-5">Your Order</h2>
              <div className="flex flex-col gap-3 mb-5 max-h-64 overflow-y-auto pr-1">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    {/* <img src={item.image} alt={item.name} className="w-14 h-14 object-cover bg-cream-200 shrink-0" /> */}
                   <img
  src={item.image ? `http://127.0.0.1:8000${item.image}` : "/placeholder.png"}
  alt={item.name}
  className="w-14 h-14 object-cover bg-cream-200 shrink-0"
/>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-medium text-charcoal-900 truncate">{item.name}</p>
                      <p className="font-mono text-xs text-charcoal-800/40">Qty: {item.quantity}</p>
                      <p className="font-body text-xs font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-cream-300 pt-4 flex flex-col gap-2 mb-5">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-charcoal-800/60">Subtotal</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-body">
                  <span className="text-charcoal-800/60">Shipping</span>
                  <span className={shipping === 0 ? 'text-sage-500' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-body font-bold pt-2 border-t border-cream-300">
                  <span>Total</span>
                  <span className="text-lg">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

<button
  onClick={() => {
    if (form.payment === "cod") {
      handleSubmit();   // COD → normal order
    } else {
      handlePayment();  // Online → payment first
    }
  }}
  disabled={processing}
  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

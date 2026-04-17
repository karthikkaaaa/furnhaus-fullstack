import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import axios from "axios";
import { useCart } from '../context/CartContext';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();
  const { clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';


  const validate = () => {
    const e = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login/", {
      email: form.email,
      password: form.password
    });

    console.log(res); 

    localStorage.setItem("user", JSON.stringify(res.data.user)); 

localStorage.removeItem("cart");
localStorage.removeItem("wishlist");
 clearCart();
    navigate("/dashboard");

  } catch (err) {
    setErrors({ general: "Invalid login" });
  }
};

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: '', general: '' })); };

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex">
      {/* Left image */}
      <div className="hidden lg:block flex-1 relative">
        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/40 flex items-end p-16">
          <div>
            <h2 className="font-display text-4xl text-cream-50 mb-3">Good to<br /><em>see you again</em></h2>
            <p className="font-body text-cream-200/70">Sign in to access your orders, wishlist and more.</p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 max-w-xl mx-auto lg:max-w-none">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="w-7 h-7 bg-charcoal-900 flex items-center justify-center">
              <span className="text-cream-50 font-display text-xs font-bold">F</span>
            </div>
            <span className="font-display text-lg font-semibold text-charcoal-900">FurnHaus</span>
          </Link>

          <h1 className="font-display text-3xl text-charcoal-900 mb-2">Sign In</h1>
          <p className="font-body text-charcoal-800/50 mb-8">
            New here? <Link to="/signup" className="text-charcoal-900 underline hover:no-underline">Create an account</Link>
          </p>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-body px-4 py-3 mb-6">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="label-sm block mb-2">Email Address</label>
              <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set('email', e.target.value)}
                className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label-sm block mb-2">Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)}
                className={`input-field ${errors.password ? 'border-red-400' : ''}`} />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
              {loading ? <><span className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></span>Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-cream-300">
            <p className="font-mono text-xs text-charcoal-800/30 text-center">
              Demo: create an account via Sign Up first
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

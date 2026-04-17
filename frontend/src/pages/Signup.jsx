import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
// import { useState } from "react";
// import { useCart } from '../context/CartContext';
import axios from "axios";
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  // const { signup } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setLoading(true);
console.log("Sending data:", {
  name: form.name,
  email: form.email,
  password: form.password
});
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
      // name: form.name.trim(),
      // email: form.email,
      // password: form.password
        name: form.name.trim(),
  username: form.name.trim(),  
  email: form.email,
  password: form.password
    });

    console.log(res.data); // debug

    addToast("Account created! 🎉");
    localStorage.removeItem("cart");
localStorage.removeItem("wishlist");
    navigate("/login");

  } catch (err) {
    console.log(err.response?.data);

    // setErrors({
    //   general: err.response?.data?.email || "Signup failed"
    // });
    setErrors({
  general: JSON.stringify(err.response?.data) || "Signup failed"
});
  }

  setLoading(false);
};

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: '', general: '' })); };

  return (
    <div className="pt-16 md:pt-20 min-h-screen flex">
      <div className="hidden lg:block flex-1 relative">
        <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=900&q=80" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/40 flex items-end p-16">
          <div>
            <h2 className="font-display text-4xl text-cream-50 mb-3">Join the<br /><em>FurnHaus family</em></h2>
            <p className="font-body text-cream-200/70">Create an account to track orders and manage your wishlist.</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 max-w-xl mx-auto lg:max-w-none">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-10 group w-fit">
            <div className="w-7 h-7 bg-charcoal-900 flex items-center justify-center">
              <span className="text-cream-50 font-display text-xs font-bold">F</span>
            </div>
            <span className="font-display text-lg font-semibold text-charcoal-900">FurnHaus</span>
          </Link>

          <h1 className="font-display text-3xl text-charcoal-900 mb-2">Create Account</h1>
          <p className="font-body text-charcoal-800/50 mb-8">
            Already have an account? <Link to="/login" className="text-charcoal-900 underline hover:no-underline">Sign in</Link>
          </p>

          {errors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-body px-4 py-3 mb-6">{errors.general}</div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Ravi Kumar' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'ravi@email.com' },
              { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(f => (
              <div key={f.name}>
                <label className="label-sm block mb-2">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} value={form[f.name]} onChange={e => set(f.name, e.target.value)}
                  className={`input-field ${errors[f.name] ? 'border-red-400' : ''}`} />
                {errors[f.name] && <p className="text-xs text-red-500 mt-1">{errors[f.name]}</p>}
              </div>
            ))}

            <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
              {loading ? <><span className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></span>Creating account…</> : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useToast } from '../context/ToastContext';
function validate(form) {
  const e = {};
  if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters';
  if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email address required';
  if (!form.subject.trim()) e.subject = 'Subject is required';
  if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
  return e;
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { addToast } = useToast();

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: '' })); };

const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate(form);
  if (Object.keys(errs).length) {
    setErrors(errs);
    addToast('Please fix the errors below', 'error');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch("http://127.0.0.1:8000/api/contact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,   // ✅ FIXED
        subject: form.subject,
        message: form.message,
      }),
    });

    // ✅ CHECK RESPONSE
    if (!res.ok) {
      throw new Error("Server error");
    }

    addToast("📨 Message sent successfully!", "success");
    setSent(true);

  } catch (error) {
    addToast("❌ Failed to send message", "error");
    console.error(error);
  }

  setLoading(false);
};
    // setLoading(false);
  //   setSent(true);
  //   addToast('Message sent! We\'ll get back to you within 24 hours.');
  // };

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-cream-100 border-b border-cream-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="label-sm mb-3">We'd love to hear from you</p>
          <h1 className="section-title">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="font-display text-2xl text-charcoal-900 mb-6">Get In Touch</h2>
            <p className="font-body text-charcoal-800/60 leading-relaxed mb-10">
              Have a question about a product, need design advice, or want to discuss a custom order? Our team is here to help.
            </p>

            <div className="flex flex-col gap-6">
              {[
                { icon: '📍', title: 'Visit Us', lines: ['12 Design District', 'Kozhikode, Kerala 673001'] },
                { icon: '📞', title: 'Call Us', lines: ['+91 98765 43210', 'Mon – Sat, 10am – 7pm'] },
                { icon: '✉️', title: 'Email Us', lines: ['hello@furnhaus.in', 'We reply within 24 hours'] },
              ].map(c => (
                <div key={c.title} className="flex gap-4">
                  <div className="w-11 h-11 bg-cream-200 flex items-center justify-center text-xl shrink-0">{c.icon}</div>
                  <div>
                    <p className="font-body text-sm font-semibold text-charcoal-900 mb-1">{c.title}</p>
                    {c.lines.map(l => <p key={l} className="font-body text-sm text-charcoal-800/60">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-10 h-48 bg-cream-200 flex items-center justify-center border border-cream-300">
              <p className="font-mono text-xs text-charcoal-800/30 uppercase tracking-wider">Map — Kozhikode, Kerala</p>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-sage-500 flex items-center justify-center mb-5">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-charcoal-900 mb-2">Message Sent!</h3>
                <p className="font-body text-charcoal-800/60 mb-6">Thank you for reaching out. We'll respond within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="btn-outline">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-sm block mb-1.5">Your Name</label>
                    <input type="text" placeholder="Ravi Kumar" value={form.name} onChange={e => set('name', e.target.value)}
                      className={`input-field ${errors.name ? 'border-red-400' : ''}`} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label-sm block mb-1.5">Phone (optional)</label>
                    <input type="tel" placeholder="9876543210" value={form.phone} onChange={e => set('phone', e.target.value)} className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="label-sm block mb-1.5">Email Address</label>
                  <input type="email" placeholder="ravi@email.com" value={form.email} onChange={e => set('email', e.target.value)}
                    className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="label-sm block mb-1.5">Subject</label>
                  <select value={form.subject} onChange={e => set('subject', e.target.value)}
                    className={`input-field ${errors.subject ? 'border-red-400' : ''}`}>
                    <option value="">Select a subject…</option>
                    <option value="product">Product Enquiry</option>
                    <option value="order">Order Support</option>
                    <option value="design">Design Consultation</option>
                    <option value="custom">Custom Order</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="label-sm block mb-1.5">Message</label>
                  <textarea rows={6} placeholder="Tell us how we can help…" value={form.message} onChange={e => set('message', e.target.value)}
                    className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`} />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                  {loading ? <><span className="w-4 h-4 border-2 border-cream-50/30 border-t-cream-50 rounded-full animate-spin"></span>Sending…</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

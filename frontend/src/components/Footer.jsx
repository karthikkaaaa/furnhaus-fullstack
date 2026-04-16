import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-cream-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-cream-50 flex items-center justify-center">
                <span className="text-charcoal-900 font-display text-sm font-bold">F</span>
              </div>
              <span className="font-display text-xl font-semibold text-cream-50">FurnHaus</span>
            </div>
            <p className="font-body text-sm text-cream-200/60 leading-relaxed mb-6">
              Thoughtfully designed furniture for modern homes. Crafted with care, delivered with love.
            </p>
            <div className="flex gap-4">
              {['instagram', 'twitter', 'pinterest', 'facebook'].map(s => (
                <a key={s} href="#" className="w-9 h-9 border border-cream-200/20 flex items-center justify-center text-cream-200/40 hover:text-cream-50 hover:border-cream-200/60 transition-all duration-200 capitalize">
                  <span className="text-xs font-mono">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-cream-200/40 mb-5">Shop</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/shop', label: 'All Products' },
                { to: '/sofas', label: 'Sofas' },
                { to: '/chairs', label: 'Chairs' },
                { to: '/shop?filter=new', label: 'New Arrivals' },
                { to: '/shop?filter=sale', label: 'Sale' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-cream-200/60 hover:text-cream-50 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-cream-200/40 mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/contact', label: 'Contact' },
                { to: '/dashboard', label: 'My Account' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-cream-200/60 hover:text-cream-50 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-cream-200/40 mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-cream-200/60 font-body">
              <li>12 Design District, Kozhikode, Kerala</li>
              <li>
                <a href="tel:+919876543210" className="hover:text-cream-50 transition-colors">+91 98765 43210</a>
              </li>
              <li>
                <a href="mailto:hello@furnhaus.in" className="hover:text-cream-50 transition-colors">hello@furnhaus.in</a>
              </li>
              <li className="pt-2">
                <span className="text-xs text-cream-200/30">Mon – Sat: 10am – 7pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream-200/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cream-200/30">© {new Date().getFullYear()} FurnHaus. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(t => (
              <a key={t} href="#" className="font-mono text-xs text-cream-200/30 hover:text-cream-200/60 transition-colors">{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

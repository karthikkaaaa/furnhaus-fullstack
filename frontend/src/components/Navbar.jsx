import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/sofas', label: 'Sofas' },
    { to: '/chairs', label: 'Chairs' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-cream-50/95 backdrop-blur-md shadow-sm' : 'bg-cream-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-charcoal-900 flex items-center justify-center">
              <span className="text-cream-50 font-display text-sm font-bold">F</span>
            </div>
            <span className="font-display text-xl font-semibold text-charcoal-900 tracking-tight">FurnHaus</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `font-body text-sm font-medium transition-colors duration-200 relative group
                  ${isActive ? 'text-charcoal-900' : 'text-charcoal-800/60 hover:text-charcoal-900'}`
                }
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-charcoal-900 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* Wishlist */}
            <Link to="/dashboard?tab=Wishlist" className="relative hidden md:flex items-center text-charcoal-800/60 hover:text-terracotta-500 transition-colors duration-200">
              <HeartIcon />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-terracotta-500 text-white text-[10px] font-mono flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center text-charcoal-800/60 hover:text-charcoal-900 transition-colors duration-200">
              <CartIcon />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal-900 text-cream-50 text-[10px] font-mono flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

{!user ? (
  <Link to="/login" className="font-body text-sm font-medium text-charcoal-800/60 hover:text-charcoal-900 transition-colors duration-200">Sign In</Link>
) : (
  <Link to="/dashboard" className="font-body text-sm font-semibold text-sage-500 hover:text-sage-600 transition-colors duration-200">{user?.name || 'Account'}</Link>
)}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
            >
              <span className={`block w-6 h-0.5 bg-charcoal-900 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-charcoal-900 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-charcoal-900 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
          <div className="flex flex-col gap-4 pt-4 border-t border-cream-300">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `font-body text-sm font-medium py-1 ${isActive ? 'text-charcoal-900' : 'text-charcoal-800/60'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {/* {!isLoggedIn ? (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-primary text-center text-sm mt-2">
                Sign In
              </Link>
            ) : (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="font-body text-sm font-medium text-sage-500">
                My Account
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </nav>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

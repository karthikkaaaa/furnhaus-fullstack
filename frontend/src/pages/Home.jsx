import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products, categories, testimonials } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';
import API from "../api";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const featured = products.filter(p => p.badge === 'Bestseller' || p.badge === 'New').slice(0, 4);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=85"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/80 via-charcoal-900/40 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-20 md:pb-28 w-full">
          <div className="max-w-xl">
            <p className="label-sm text-cream-200/60 mb-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              New Collection 2025
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-cream-50 leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Where Design<br />
              <em>Meets</em> Comfort
            </h1>
            <p className="font-body text-base md:text-lg text-cream-200/70 mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '300ms' }}>
              Thoughtfully crafted furniture that transforms every room into a sanctuary. Nordic-inspired design, built for modern living.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Link to="/shop" className="btn-primary">
                Shop Now
              </Link>
              <Link to="/about" className="btn-outline border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-charcoal-900">
                Our Story
              </Link>
            </div>
          </div>
        </div>

       
        <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-16 bg-cream-50/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-cream-50/80 animate-bounce"></div>
          </div>
          <span className="font-mono text-[10px] text-cream-50/40 tracking-[0.2em] rotate-90 origin-center mt-4">SCROLL</span>
        </div>
      </section>

     
      <section className="bg-charcoal-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-cream-200/10">
            {[
              { value: '500+', label: 'Products' },
              { value: '12K+', label: 'Happy Customers' },
              { value: '15 yrs', label: 'Craftsmanship' },
              { value: 'Free', label: 'Delivery Over ₹5000' },
            ].map(stat => (
              <div key={stat.label} className="text-center md:py-2">
                <div className="font-display text-2xl text-cream-50 mb-1">{stat.value}</div>
                <div className="font-mono text-xs text-cream-200/40 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="label-sm mb-3">Browse by Room</p>
            <h2 className="section-title">Shop Our Collections</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to={`/${cat.id}s`}
                className="relative group overflow-hidden aspect-[16/9] md:aspect-[4/3] block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-charcoal-900/10 transition-all duration-300 group-hover:from-charcoal-900/90"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="label-sm text-cream-200/50 mb-2">{cat.count} pieces</p>
                  <h3 className="font-display text-3xl md:text-4xl text-cream-50 mb-3">{cat.name}</h3>
                  <p className="font-body text-sm text-cream-200/70 mb-4 italic">{cat.tagline}</p>
                  <span className="inline-flex items-center gap-2 font-body text-sm font-medium text-cream-50 border-b border-cream-50/30 pb-0.5 group-hover:border-cream-50 transition-colors">
                    Explore {cat.name}
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

     
      <section className="pb-20 md:pb-28 bg-cream-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="label-sm mb-3">Curated Picks</p>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden md:inline-flex items-center gap-2 font-body text-sm font-medium text-charcoal-800/60 hover:text-charcoal-900 transition-colors group">
              View All
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {loading ? (
            <ProductGridSkeleton count={4} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {featured.map((p, i) => (
                <ProductCard key={p.id} product={p} delay={i * 100} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 md:hidden">
            <Link to="/shop" className="btn-outline">View All Products</Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 border-y border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over ₹5,000' },
              { icon: '↩', title: 'Easy Returns', desc: '30-day return policy' },
              { icon: '🛡', title: '5-Year Warranty', desc: 'On all furniture' },
              { icon: '💬', title: 'Expert Advice', desc: 'Free design consultation' },
            ].map(f => (
              <div key={f.title} className="text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-body text-sm font-semibold text-charcoal-900 mb-1">{f.title}</h4>
                <p className="font-body text-xs text-charcoal-800/50">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Banner */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <p className="label-sm mb-4">Our Philosophy</p>
              <h2 className="section-title mb-6">
                Furniture That<br />
                <em>Lives</em> With You
              </h2>
              <p className="font-body text-charcoal-800/70 leading-relaxed mb-4">
                At FurnHaus, we believe a home should reflect the life lived within it. Every piece we create starts with a simple question: how will this feel after ten years?
              </p>
              <p className="font-body text-charcoal-800/70 leading-relaxed mb-8">
                We source sustainable materials, work with skilled craftspeople, and design for longevity — not trends. The result is furniture that only gets better with time.
              </p>
              <Link to="/about" className="btn-outline">Read Our Story</Link>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
                  alt="Living room"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-cream-200 hidden lg:block -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-cream-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="label-sm mb-3">What Our Customers Say</p>
            <h2 className="section-title">Loved by Homemakers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className="bg-cream-50 p-6 border border-cream-300 animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={`text-sm ${j < t.rating ? 'text-amber-500' : 'text-cream-300'}`}>★</span>
                  ))}
                </div>
                <p className="font-body text-sm text-charcoal-800/70 leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 object-cover rounded-full" />
                  <div>
                    <div className="font-body text-sm font-semibold text-charcoal-900">{t.name}</div>
                    <div className="font-mono text-xs text-charcoal-800/40">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-900 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1400&q=60" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="label-sm text-cream-200/40 mb-4">Ready to Transform Your Home?</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream-50 mb-6">
            Start Your Design Journey
          </h2>
          <p className="font-body text-cream-200/60 max-w-md mx-auto mb-10">
            Browse our full collection and find pieces that speak to your style and fit your space perfectly.
          </p>
          <Link to="/shop" className="btn-primary bg-cream-50 text-charcoal-900 hover:bg-cream-100">
            Explore All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

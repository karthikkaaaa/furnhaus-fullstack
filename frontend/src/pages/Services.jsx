import { Link } from 'react-router-dom';

const services = [
  {
    icon: '🎨',
    title: 'Interior Design Consultation',
    desc: 'Our in-house design team will work with you to create a cohesive room plan that fits your style, space and budget. Free for all customers with purchases over ₹25,000.',
    price: 'Free / ₹2,500',
  },
  {
    icon: '🚚',
    title: 'White Glove Delivery',
    desc: 'We handle all the heavy lifting — literally. Our team will deliver, assemble and place your furniture exactly where you want it, then take away all the packaging.',
    price: '₹999',
  },
  {
    icon: '🛠',
    title: 'Assembly Service',
    desc: 'Let our trained technicians handle the build. We guarantee everything is assembled correctly and safely, with no leftover bolts.',
    price: 'From ₹499',
  },
  {
    icon: '🔄',
    title: 'Trade-In Programme',
    desc: 'Upgrading? We\'ll take your old FurnHaus furniture, refurbish it and give it a second life, while you get credit towards your new purchase.',
    price: 'Credit applied',
  },
  {
    icon: '🛡',
    title: 'Protection Plans',
    desc: 'Extend your peace of mind with a 3 or 5-year protection plan covering accidental damage, staining and structural defects.',
    price: 'From ₹1,500/yr',
  },
  {
    icon: '📐',
    title: 'Custom & Bespoke',
    desc: 'Can\'t find exactly what you need? Our craftspeople can build custom pieces to your exact specifications — size, fabric, finish and more.',
    price: 'On request',
  },
];

export default function Services() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      <div className="bg-cream-100 border-b border-cream-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="label-sm mb-3">What We Offer</p>
          <h1 className="section-title mb-4">Our Services</h1>
          <p className="font-body text-charcoal-800/60 max-w-xl">
            From design consultation to delivery and beyond — we're here to make your furniture experience as smooth as possible.
          </p>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={s.title} className="p-8 border border-cream-300 bg-cream-50 hover:shadow-lg transition-shadow duration-300 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-display text-xl text-charcoal-900 mb-3">{s.title}</h3>
                <p className="font-body text-sm text-charcoal-800/60 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-charcoal-800/40 uppercase tracking-wider">Cost</span>
                  <span className="font-body text-sm font-semibold text-charcoal-900">{s.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-charcoal-900 text-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="label-sm text-cream-200/40 mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl text-cream-50">Simple, Seamless Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Browse & Choose', text: 'Explore our collection online or in our showroom.' },
              { step: '02', title: 'Consult & Customise', text: 'Work with our team to perfect your selection.' },
              { step: '03', title: 'Order & Confirm', text: 'Place your order with flexible payment options.' },
              { step: '04', title: 'Deliver & Enjoy', text: 'We deliver, assemble, and you relax.' },
            ].map(p => (
              <div key={p.step} className="text-center">
                <div className="font-mono text-4xl font-bold text-cream-200/10 mb-3">{p.step}</div>
                <h4 className="font-body text-sm font-semibold text-cream-50 mb-2">{p.title}</h4>
                <p className="font-body text-xs text-cream-200/50">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl text-charcoal-900 mb-4">Ready to Get Started?</h2>
          <p className="font-body text-charcoal-800/60 mb-8">Contact us today to discuss your requirements or book a free design consultation.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-primary">Get in Touch</Link>
            <Link to="/shop" className="btn-outline">Shop Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

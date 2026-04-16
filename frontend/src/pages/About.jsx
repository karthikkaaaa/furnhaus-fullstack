import { Link } from 'react-router-dom';

const team = [
  { name: 'Arjun Menon', role: 'Founder & Creative Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  // { name: 'Priya Nair', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&q=80' },
  { name: 'Priya Nair', role: 'Head of Design', img: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Rohan Das', role: 'Head of Craft & Production', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Kavya Pillai', role: 'Customer Experience', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

export default function About() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1400&q=80" alt="About" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal-900/50 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 w-full">
            <p className="label-sm text-cream-200/60 mb-2">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl text-cream-50">About FurnHaus</h1>
          </div>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="label-sm mb-4">Founded 2010, Kozhikode</p>
              <h2 className="section-title mb-6">We Design for<br /><em>Real Life</em></h2>
              <p className="font-body text-charcoal-800/70 leading-relaxed mb-5">
                FurnHaus began as a small workshop on the Malabar coast with a single belief: every home deserves beautiful, durable furniture that doesn't compromise on comfort or character.
              </p>
              <p className="font-body text-charcoal-800/70 leading-relaxed mb-5">
                Over fifteen years, that belief has grown into a collection of over 500 thoughtfully designed pieces, crafted by skilled artisans across Kerala and Tamil Nadu, using sustainably sourced materials.
              </p>
              <p className="font-body text-charcoal-800/70 leading-relaxed">
                We design for the life you live — not the one in a magazine. That means furniture that holds up to pets, kids, dinner parties and lazy Sundays alike.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square overflow-hidden">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square overflow-hidden mt-8">
                <img src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80" alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-cream-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="label-sm mb-3">What We Stand For</p>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🌿', title: 'Sustainability', text: 'We source timber from certified sustainable forests and use water-based finishes that are safer for people and the planet.' },
              { icon: '🛠', title: 'Craftsmanship', text: 'Each piece is hand-finished by our artisans in Kozhikode and Coimbatore. We believe in skill, patience and doing things properly.' },
              { icon: '♾', title: 'Longevity', text: 'We design to last decades, not seasons. Our 5-year warranty isn\'t just a promise — it\'s our confidence in what we make.' },
            ].map(v => (
              <div key={v.title} className="text-center p-8 border border-cream-300 bg-cream-50">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-display text-xl text-charcoal-900 mb-3">{v.title}</h3>
                <p className="font-body text-sm text-charcoal-800/60 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="label-sm mb-3">The People Behind FurnHaus</p>
            <h2 className="section-title">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={member.name} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="aspect-square overflow-hidden mb-4 bg-cream-100">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <h4 className="font-body text-sm font-semibold text-charcoal-900">{member.name}</h4>
                <p className="font-mono text-xs text-charcoal-800/40 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal-900 text-cream-50 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-3xl mb-4">Ready to Find Your Piece?</h2>
          <p className="font-body text-cream-200/60 mb-8">Browse our collection and find furniture that will grow with your home.</p>
          <Link to="/shop" className="btn-primary bg-cream-50 text-charcoal-900 hover:bg-cream-100">Shop Now</Link>
        </div>
      </section>
    </div>
  );
}

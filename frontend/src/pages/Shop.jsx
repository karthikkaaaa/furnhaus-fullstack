import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
// import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/Skeleton';
import API from "../api";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('default');


//   useEffect(() => {
//   API.get("products/?category=Sofas")
//     .then(res => setProducts(res.data))
//     .catch(err => console.log(err));
// }, []);
useEffect(() => {
  API.get("products/")
    .then(res => {
      setProducts(res.data);
    })
    .catch(err => console.log(err));
}, []);

  useEffect(() => {
    const filter = searchParams.get('filter');
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);


  useEffect(() => {
  fetch("http://127.0.0.1:8000/api/products/")
    .then(res => res.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    });
}, []);

//   const filtered = useMemo(() => {
//     let list = [...products];
//     // if (category !== 'all') list = list.filter(p => p.category === category);
//     if (category !== 'all') {
//   list = list.filter(p => p.category_name === category);
// }
//     if (search.trim()) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
//     if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
//     if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
//     if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
//     return list;
//   }, [category, search, sort]);
    const filtered = useMemo(() => {
  let list = [...products];

  if (category !== 'all') {
    list = list.filter(p => p.category_name === category);
  }

  if (search.trim()) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);

  return list;
}, [products, category, search, sort]);
  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      {/* Header */}
      <div className="bg-cream-100 border-b border-cream-300 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="label-sm mb-3">Our Collection</p>
          <h1 className="section-title">Shop All Furniture</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-800/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>

          {/* Category */}
          <div className="flex gap-2">
            {['all', 'sofa', 'chair'].map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-3 font-body text-sm font-medium border transition-all duration-200 capitalize
                  ${category === c ? 'bg-charcoal-900 text-cream-50 border-charcoal-900' : 'border-cream-300 text-charcoal-800/60 hover:border-charcoal-900 hover:text-charcoal-900'}`}
              >
                {c === 'all' ? 'All' : c + 's'}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input-field w-auto min-w-[180px]"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Count */}
        <p className="font-mono text-xs text-charcoal-800/40 mb-8 uppercase tracking-wider">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🪑</div>
            <h3 className="font-display text-2xl text-charcoal-900 mb-2">No products found</h3>
            <p className="font-body text-charcoal-800/50">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} delay={i * 60} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// import { useState, useEffect } from 'react';
// import { products } from '../data/products';
// import ProductCard from '../components/ProductCard';
// import { ProductGridSkeleton } from '../components/Skeleton';

// export default function Chairs() {
//   const [loading, setLoading] = useState(true);
//   const chairs = products.filter(p => p.category === 'chair');

//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 600);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">
//       <div className="relative h-64 md:h-80 overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=80"
//           alt="Chairs"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-charcoal-900/50 flex items-end">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
//             <p className="label-sm text-cream-200/60 mb-2">Sit Beautifully</p>
//             <h1 className="font-display text-4xl md:text-5xl text-cream-50">Chairs</h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
//         <p className="font-body text-charcoal-800/60 mb-12 max-w-xl">
//           Lounge chairs, accent chairs, dining chairs and more — curated for every corner of your home.
//         </p>

//         {loading ? (
//           <ProductGridSkeleton count={6} />
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//             {chairs.map((p, i) => (
//               <ProductCard key={p.id} product={p} delay={i * 80} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import API from "../api";

export default function Chairs() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("products/?category=chairs")
      .then(res => {
        setApiProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const chairs = apiProducts;

  if (loading) return <h2>Loading chairs...</h2>;

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      
      {/* HERO */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=80"
          alt="Chairs"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <p className="mb-12">
          Lounge chairs, accent chairs, dining chairs and more.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {chairs.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}
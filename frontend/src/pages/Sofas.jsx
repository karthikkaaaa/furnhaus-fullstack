// import { useState, useEffect } from 'react';
// import { products } from '../data/products';
// import ProductCard from '../components/ProductCard';
// import { ProductGridSkeleton } from '../components/Skeleton';

// export default function Sofas() {
//   const [loading, setLoading] = useState(true);
//   const sofas = products.filter(p => p.category === 'sofa');

//   useEffect(() => {
//     const t = setTimeout(() => setLoading(false), 600);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">
//       {/* Hero Banner */}
//       <div className="relative h-64 md:h-80 overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80"
//           alt="Sofas"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-charcoal-900/50 flex items-end">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
//             <p className="label-sm text-cream-200/60 mb-2">Comfort & Style</p>
//             <h1 className="font-display text-4xl md:text-5xl text-cream-50">Sofas</h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
//         <p className="font-body text-charcoal-800/60 mb-12 max-w-xl">
//           From compact two-seaters to sprawling sectionals — every sofa is crafted for lasting comfort and designed to anchor your living space.
//         </p>

//         {loading ? (
//           <ProductGridSkeleton count={6} />
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//             {sofas.map((p, i) => (
//               <ProductCard key={p.id} product={p} delay={i * 80} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { products as staticProducts } from '../data/products';
// import ProductCard from '../components/ProductCard';
// import { ProductGridSkeleton } from '../components/Skeleton';
// import API from "../api";
// export default function Sofas() {
//   const [loading, setLoading] = useState(true);
//   const [apiProducts, setApiProducts] = useState([]);

//   // ✅ static sofas
// //   const staticSofas = staticProducts.filter(p => p.category === 'sofa');
// // const sofas = [
// //   ...staticSofas,
// //   ...apiProducts
// // ];
//   // useEffect(() => {
//   //   axios.get("http://127.0.0.1:8000/api/products/?category=sofas")
//   //     .then(res => {
//   //       console.log("API DATA:", res.data);
//   //       setApiProducts(res.data);
//   //       setLoading(false);
//   //     })
//   //     .catch(err => {
//   //       console.log(err);
//   //       setLoading(false);
//   //     });
//   // }, []);
//   const sofas = [
//   ...staticSofas,
//   ...apiProducts.filter(p => p.category === "sofa")
// ];
// useEffect(() => {
//     API.get("products/?category=sofa")   // 👈 no full URL needed
//       .then(res => {
//         console.log(res.data);
//         setApiProducts(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Error:", err);
//         setLoading(false);
//       });
//   }, []);
//   // ✅ merge both
//   // const sofas = [...staticSofas, ...apiProducts];
// // const sofas = [
// //   ...staticSofas,
// //   ...apiProducts.filter(p => p.category_name === "sofas")
// // ];
//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">

//       {/* Hero Banner */}
//       <div className="relative h-64 md:h-80 overflow-hidden">
//         <img
//           src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80"
//           alt="Sofas"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-charcoal-900/50 flex items-end">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 w-full">
//             <h1 className="text-4xl text-white">Sofas</h1>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

//         {loading ? (
//           <ProductGridSkeleton count={6} />
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
//            {sofas.map((p, i) => (
//   <ProductCard key={`${p.id}-${i}`} product={p} />
// ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import API from "../api";

export default function Sofas() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ ONLY ONE useEffect
  useEffect(() => {
    API.get("products/?category=sofas")
      .then(res => {
        setApiProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // ✅ Clean data
  const sofas = apiProducts;

  if (loading) return <h2>Loading chairs...</h2>;

  return (
    <div className="pt-16 md:pt-20 min-h-screen">
      
      {/* HERO */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1400&q=80"
          alt="Sofas"
          className="w-full h-full object-cover"
        />
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <p className="mb-12">
          Lounge chairs, accent chairs, dining chairs and more.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sofas.map((p, i) => (
            <ProductCard key={p.id} product={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}
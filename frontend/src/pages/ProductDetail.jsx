// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// // import { products } from '../data/products';
// import { useCart } from '../context/CartContext';
// import { useWishlist } from '../context/WishlistContext';
// import { useToast } from '../context/ToastContext';
// import ProductCard from '../components/ProductCard';

// export default function ProductDetail() {
//   const { id } = useParams();
//   // const product = products.find(p => p.id === parseInt(id));
//   const [product, setProduct] = useState(null);

// useEffect(() => {
//   window.scrollTo(0, 0);

//   fetch(`http://127.0.0.1:8000/api/products/${id}/`)
//     .then(res => res.json())
//     .then(data => setProduct(data));

// }, [id]);
//   const [activeImage, setActiveImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const { addItem } = useCart();
//   const { toggle, isWishlisted } = useWishlist();
//   const { addToast } = useToast();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     setActiveImage(0);
//     setQuantity(1);
//   }, [id]);

//   if (!product) {
//     return (
//       <div className="pt-32 min-h-screen flex flex-col items-center justify-center gap-4">
//         <h2 className="font-display text-3xl text-charcoal-900">Product not found</h2>
//         <Link to="/shop" className="btn-primary">Back to Shop</Link>
//       </div>
//     );
//   }

//   // const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
//   const [related, setRelated] = useState([]);

// useEffect(() => {
//   fetch(`http://127.0.0.1:8000/api/products/?category=${product?.category_name}`)
//     .then(res => res.json())
//     .then(data => setRelated(data));
// }, [product]);
//   const wishlisted = isWishlisted(product.id);
//   const savings = product.originalPrice ? product.originalPrice - product.price : 0;

//   const handleAddToCart = () => {
//     addItem(product, quantity);
//     addToast(`${product.name} added to cart`);
//   };

//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">
//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center gap-2 text-xs font-mono text-charcoal-800/40">
//         <Link to="/" className="hover:text-charcoal-900 transition-colors">Home</Link>
//         <span>/</span>
//         <Link to={`/${product.category}s`} className="hover:text-charcoal-900 transition-colors capitalize">{product.category}s</Link>
//         <span>/</span>
//         <span className="text-charcoal-900">{product.name}</span>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
//           {/* Image Gallery */}
//           <div className="flex gap-4">
//             {/* Thumbnails */}
//             <div className="flex flex-col gap-3">
//               {(product.images || [product.image]).map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActiveImage(i)}
//                   className={`w-16 h-16 overflow-hidden border-2 transition-all duration-200 shrink-0
//                     ${activeImage === i ? 'border-charcoal-900' : 'border-transparent opacity-60 hover:opacity-100'}`}
//                 >
//                   <img src={img} alt="" className="w-full h-full object-cover" />
//                 </button>
//               ))}
//             </div>

//             {/* Main image */}
//             <div className="flex-1 aspect-square overflow-hidden bg-cream-100 relative">
//               <img
//                 src={(product.images || [product.image])[activeImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover transition-opacity duration-300"
//               />
//               {product.badge && (
//                 <div className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-mono tracking-wider
//                   ${product.badge === 'Sale' ? 'bg-terracotta-500 text-white' : ''}
//                   ${product.badge === 'New' ? 'bg-sage-500 text-white' : ''}
//                   ${product.badge === 'Bestseller' ? 'bg-charcoal-900 text-cream-50' : ''}
//                 `}>
//                   {product.badge}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Info */}
//           <div>
//             <p className="label-sm capitalize mb-2">{product.category}</p>
//             <h1 className="font-display text-3xl md:text-4xl text-charcoal-900 mb-4">{product.name}</h1>

//             {/* Rating */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="flex gap-0.5">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <span key={i} className={`text-sm ${i < Math.round(product.rating) ? 'text-amber-500' : 'text-cream-300'}`}>★</span>
//                 ))}
//               </div>
//               <span className="font-mono text-xs text-charcoal-800/50">{product.rating} ({product.reviews} reviews)</span>
//             </div>

//             {/* Price */}
//             <div className="flex items-center gap-4 mb-6 pb-6 border-b border-cream-300">
//               <span className="font-display text-3xl text-charcoal-900">₹{product.price.toLocaleString()}</span>
//               {product.originalPrice && (
//                 <>
//                   <span className="font-body text-lg text-charcoal-800/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
//                   <span className="bg-terracotta-500 text-white text-xs font-mono px-2 py-1">Save ₹{savings.toLocaleString()}</span>
//                 </>
//               )}
//             </div>

//             <p className="font-body text-charcoal-800/70 leading-relaxed mb-8">{product.description}</p>

//             {/* Colors */}
//             {product.colors && (
//               <div className="mb-6">
//                 <p className="font-body text-xs font-semibold tracking-wider uppercase text-charcoal-800/50 mb-3">Colours</p>
//                 <div className="flex gap-2">
//                   {product.colors.map((color, i) => (
//                     <button key={i} className="w-8 h-8 rounded-full border-2 border-cream-300 hover:border-charcoal-900 transition-colors" style={{ backgroundColor: color }} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity */}
//             <div className="mb-6">
//               <p className="font-body text-xs font-semibold tracking-wider uppercase text-charcoal-800/50 mb-3">Quantity</p>
//               <div className="flex items-center border border-cream-300 w-fit">
//                 <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center text-charcoal-900 hover:bg-cream-100 transition-colors text-lg">−</button>
//                 <span className="w-12 text-center font-mono text-sm font-medium">{quantity}</span>
//                 <button onClick={() => setQuantity(q => q + 1)} className="w-11 h-11 flex items-center justify-center text-charcoal-900 hover:bg-cream-100 transition-colors text-lg">+</button>
//               </div>
//             </div>

//             {/* CTAs */}
//             <div className="flex gap-3 mb-8">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={!product.inStock}
//                 className="flex-1 btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 {product.inStock ? 'Add to Cart' : 'Out of Stock'}
//               </button>
//               <button
//                 onClick={() => { toggle(product); addToast(wishlisted ? 'Removed from wishlist' : 'Added to wishlist', wishlisted ? 'info' : 'wishlist'); }}
//                 className={`w-12 h-12 border flex items-center justify-center transition-all duration-200
//                   ${wishlisted ? 'bg-terracotta-500 border-terracotta-500 text-white' : 'border-cream-300 text-charcoal-800/60 hover:border-terracotta-500 hover:text-terracotta-500'}`}
//               >
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
//                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
//                 </svg>
//               </button>
//             </div>

//             {/* Specs */}
//             {product.specs && (
//               <div className="border border-cream-300 p-5">
//                 <p className="label-sm mb-4">Specifications</p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {Object.entries(product.specs).map(([k, v]) => (
//                     <div key={k}>
//                       <span className="font-mono text-xs text-charcoal-800/40 block mb-0.5">{k}</span>
//                       <span className="font-body text-sm text-charcoal-900">{v}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Delivery info */}
//             <div className="mt-5 flex flex-col gap-2">
//               {['Free delivery on this item', 'In stock — ships within 3–5 business days', '30-day returns accepted'].map(line => (
//                 <div key={line} className="flex items-center gap-2 font-body text-xs text-charcoal-800/60">
//                   <span className="text-sage-500">✓</span> {line}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Related Products */}
//         {related.length > 0 && (
//           <div className="mt-24">
//             <h2 className="section-title mb-10">You Might Also Like</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
//               {related.map((p, i) => (
//                 <ProductCard key={p.id} product={p} delay={i * 80} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";
export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  useEffect(() => {
    if (product) {
      fetch(`http://127.0.0.1:8000/api/products/?category=${product.category_name}`)
        .then(res => res.json())
        .then(data => setRelated(data));
    }
  }, [product]);

  if (!product) {
    return <p className="text-center mt-20">Loading...</p>;
  }

//   return (
//     <div className="pt-20">
//       <h1>{product.name}</h1>

//       <img src={product.image} alt={product.name} />

//       <p>₹{product.price}</p>

//       <button onClick={() => addItem(product)}>
//         Add to Cart
//       </button>

//       <button onClick={() => toggle(product)}>
//         Wishlist
//       </button>
//     </div>
//   );
// }
const imageUrl = product.image?.startsWith("http")
  ? product.image
  : `http://127.0.0.1:8000${product.image}`;
return (
  <>
    {/* MAIN PRODUCT */}
    <div className="pt-20 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

      {/* IMAGE */}
      <div className="bg-cream-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-[500px] object-cover"
        />
      </div>

      {/* DETAILS */}
      <div>
        <h1 className="text-4xl font-serif mb-4">{product.name}</h1>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-amber-500">★★★★★</span>
          <span className="text-sm text-gray-500">
            {product.rating} (200 reviews)
          </span>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-semibold">
            ₹{product.price}
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          {product.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => addItem(product)}
            className="bg-black text-white px-6 py-3 w-full"
          >
            Add to Cart
          </button>

          <button
            onClick={() => toggle(product)}
            className="border px-4"
          >
            ❤️
          </button>
        </div>

        {/* Specs */}
        <div className="mt-10 border p-5">
          <p className="text-sm mb-2">Specifications</p>
          <p>Width: 195 cm</p>
          <p>Depth: 88 cm</p>
          <p>Height: 82 cm</p>
        </div>
      </div>
    </div>

    {/* ✅ RELATED PRODUCTS (OUTSIDE MAIN GRID) */}
    {related.length > 0 && (
      <div className="mt-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl mb-8">You Might Also Like</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    )}
  </>
);
     
}
// import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// // import { useAuth } from '../context/AuthContext';
// import { useToast } from '../context/ToastContext';
// import { useWishlist } from '../context/WishlistContext';
// import ProductCard from '../components/ProductCard';
// import { useSearchParams } from "react-router-dom";

// const tabs = ['Profile', 'Orders', 'Wishlist'];

// export default function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("user"));
  

//   const [searchParams] = useSearchParams();
//   const tabFromUrl = searchParams.get("tab");
//   // const { user, logout } = useAuth();
//   const { addToast } = useToast();
//   const { items: wishlist } = useWishlist();
//   const navigate = useNavigate();
//   const [active, setActive] = useState(tabFromUrl || "Profile");  
 
//   useEffect(() => {
//     if (tabFromUrl) {
//       setActive(tabFromUrl);
//     }
//   }, [tabFromUrl]);

//   const handleLogout = () => {
//     localStorage.removeItem("user");  // ✅ logout fix
//     addToast('Signed out successfully');
//     navigate('/login');
//   };
//   const orders = [];

//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">
//       <h1 className="text-2xl">Welcome {user?.name}</h1>
//     </div>
//   );
// }


//   return (
//     <div className="pt-16 md:pt-20 min-h-screen">
//       <div className="bg-cream-100 border-b border-cream-300 py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center gap-5">
//             <img src={user.avatar} alt={user.name} className="w-16 h-16 object-cover" />
//             <div>
//               <h1 className="font-display text-3xl text-charcoal-900">{user.name}</h1>
//               <p className="font-mono text-xs text-charcoal-800/40 mt-1">{user.email}</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         {/* Tabs */}
//         <div className="flex gap-1 border-b border-cream-300 mb-10">
//           {tabs.map(t => (
//             <button key={t} onClick={() => setActive(t)}
//               className={`px-5 py-3 font-body text-sm font-medium border-b-2 transition-all duration-200 -mb-px
//                 ${active === t ? 'border-charcoal-900 text-charcoal-900' : 'border-transparent text-charcoal-800/50 hover:text-charcoal-900'}`}>
//               {t}
//               {t === 'Orders' && orders.length > 0 && <span className="ml-2 bg-charcoal-900 text-cream-50 text-[10px] font-mono px-1.5 py-0.5">{orders.length}</span>}
//               {t === 'Wishlist' && wishlist.length > 0 && <span className="ml-2 bg-terracotta-500 text-white text-[10px] font-mono px-1.5 py-0.5">{wishlist.length}</span>}
//             </button>
//           ))}
//         </div>

//         {/* Profile Tab */}
//         {active === 'Profile' && (
//           <div className="max-w-lg">
//             <h2 className="font-display text-2xl mb-6">Account Details</h2>
//             <div className="flex flex-col gap-5">
//               {[
//                 { label: 'Full Name', value: user.name },
//                 { label: 'Email Address', value: user.email },
//                 { label: 'Member Since', value: new Date(user.joined).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
//               ].map(f => (
//                 <div key={f.label} className="flex flex-col gap-1">
//                   <label className="label-sm">{f.label}</label>
//                   <div className="input-field bg-cream-100 text-charcoal-800/70 cursor-default">{f.value}</div>
//                 </div>
//               ))}

//               <div className="pt-4 border-t border-cream-300 flex gap-3">
//                 <button onClick={handleLogout} className="btn-outline text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 px-6">
//                   Sign Out
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Orders Tab */}
//         {active === 'Orders' && (
//           <div>
//             <h2 className="font-display text-2xl mb-6">Order History</h2>
//             {orders.length === 0 ? (
//               <div className="text-center py-20">
//                 <div className="text-5xl mb-4">📦</div>
//                 <h3 className="font-display text-2xl text-charcoal-900 mb-2">No orders yet</h3>
//                 <p className="font-body text-charcoal-800/50 mb-6">Your completed orders will appear here.</p>
//                 <Link to="/shop" className="btn-primary">Start Shopping</Link>
//               </div>
//             ) : (
//               <div className="flex flex-col gap-6">
//                 {orders.map(order => (
//                   <div key={order.id} className="border border-cream-300 p-6">
//                     <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
//                       <div>
//                         <p className="label-sm mb-1">Order ID</p>
//                         <p className="font-mono text-sm font-medium text-charcoal-900">{order.id}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="label-sm mb-1">Date</p>
//                         <p className="font-body text-sm">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
//                       </div>
//                       <div>
//                         <p className="label-sm mb-1">Total</p>
//                         <p className="font-body text-sm font-semibold">₹{order.total.toLocaleString()}</p>
//                       </div>
//                       <div>
//                         <span className="inline-block bg-sage-500/10 text-sage-600 text-xs font-mono px-3 py-1">{order.status}</span>
//                       </div>
//                     </div>
//                     <div className="flex flex-wrap gap-3">
//                       {order.items.map(item => (
//                         <div key={item.id} className="flex items-center gap-2">
//                           <img src={item.image} alt={item.name} className="w-12 h-12 object-cover bg-cream-100" />
//                           <div>
//                             <p className="font-body text-xs font-medium text-charcoal-900 max-w-[140px] truncate">{item.name}</p>
//                             <p className="font-mono text-xs text-charcoal-800/40">×{item.quantity}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Wishlist Tab */}
//         {active === 'Wishlist' && (
//           <div>
//             <h2 className="font-display text-2xl mb-6">My Wishlist</h2>
//             {wishlist.length === 0 ? (
//               <div className="text-center py-20">
//                 <div className="text-5xl mb-4">♡</div>
//                 <h3 className="font-display text-2xl text-charcoal-900 mb-2">Your wishlist is empty</h3>
//                 <p className="font-body text-charcoal-800/50 mb-6">Save items you love for later.</p>
//                 <Link to="/shop" className="btn-primary">Browse Products</Link>
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//                 {wishlist.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 60} />)}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { useWishlist } from '../context/WishlistContext';

const tabs = ['Profile', 'Orders', 'Wishlist'];

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  const { addToast } = useToast();
  const { items: wishlist } = useWishlist();
  const navigate = useNavigate();

  const [active, setActive] = useState(tabFromUrl || "Profile");

  useEffect(() => {
    if (tabFromUrl) {
      setActive(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    addToast("Logged out");
    navigate("/login");
  };

  const orders = [];

  return (
    <div className="pt-16 md:pt-20 min-h-screen">

      {/* HEADER */}
      <div className="bg-cream-100 border-b border-cream-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-xl font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-5 py-2 border 
                ${active === t ? 'bg-black text-white' : 'bg-white'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* PROFILE */}
        {active === "Profile" && (
          <div className="space-y-4">
            <div className="p-4 border">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold">{user?.name}</p>
            </div>

            <div className="p-4 border">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>

            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2"
            >
              Logout
            </button>
          </div>
        )}

        {/* ORDERS */}
        {active === "Orders" && (
          <div>
            <p>No orders yet</p>
          </div>
        )}

        {/* WISHLIST */}
       {active === "Wishlist" && (
  <div>
    {wishlist.length === 0 ? (
      <p>No wishlist items</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {wishlist.map(item => (
          <div key={item.id} className="border p-3">
<img 
  src={
    item.image?.startsWith("http")
      ? item.image
      : `http://127.0.0.1:8000${item.image}`
  }
  alt={item.name}
  className="w-full h-48 md:h-64 object-cover rounded-lg mb-2"
/>            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500">₹{item.price}</p>
          </div>
        ))}
      </div>
    )}
  </div>
)}

      </div>
    </div>
  );
}
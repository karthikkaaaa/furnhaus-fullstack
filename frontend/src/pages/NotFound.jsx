import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="pt-16 md:pt-20 min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="font-display text-[120px] md:text-[180px] leading-none text-cream-200 select-none mb-4">404</div>
      <h1 className="font-display text-3xl text-charcoal-900 mb-3">Page Not Found</h1>
      <p className="font-body text-charcoal-800/50 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get you back on track.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/" className="btn-primary">Go Home</Link>
        <Link to="/shop" className="btn-outline">Browse Products</Link>
      </div>
    </div>
  );
}

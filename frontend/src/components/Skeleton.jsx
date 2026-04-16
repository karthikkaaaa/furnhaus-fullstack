export function ProductCardSkeleton() {
  return (
    <div>
      <div className="skeleton aspect-[4/5] mb-4"></div>
      <div className="skeleton h-4 w-3/4 mb-2"></div>
      <div className="skeleton h-4 w-1/3"></div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 bg-charcoal-900 animate-pulse"></div>
        <span className="font-mono text-xs tracking-widest text-charcoal-800/40 uppercase">Loading</span>
      </div>
    </div>
  );
}

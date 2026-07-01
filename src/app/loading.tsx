export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center" role="status" aria-label="A carregar">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-ultra-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-heading font-bold text-xs uppercase tracking-[0.2em] animate-pulse">
          A carregar...
        </p>
      </div>
    </div>
  );
}
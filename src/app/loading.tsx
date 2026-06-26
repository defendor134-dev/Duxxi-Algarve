export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-sporting-dark">
      <div className="text-center">
        {/* Sporting Logo Animation */}
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full bg-sporting-green animate-ping opacity-25" />
          <div className="absolute inset-2 rounded-full bg-sporting-green animate-pulse" />
          <div className="absolute inset-4 rounded-full bg-white dark:bg-sporting-dark flex items-center justify-center">
            <span className="text-lg font-black text-sporting-green font-heading">SCP</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="skeleton h-4 w-48 mx-auto rounded" />
          <div className="skeleton h-3 w-32 mx-auto rounded" />
        </div>
        
        <p className="text-sm text-gray-400 mt-6 animate-pulse">
          A carregar...
        </p>
      </div>
    </div>
  );
}
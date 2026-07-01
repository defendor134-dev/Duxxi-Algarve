import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 border-2 border-ultra-green flex items-center justify-center mx-auto mb-8">
          <span className="text-5xl font-heading font-black text-ultra-green-bright">404</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tight mb-4">
          Página Não Encontrada
        </h1>
        <p className="text-gray-500 text-sm font-sans mb-10 leading-relaxed">
          A página que procuras não existe, foi movida ou está temporariamente indisponível. 
          O espírito Ultra continua aqui — volta ao início.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-ultra glow-green-hover">
            PÁGINA INICIAL
          </Link>
          <Link href="/contactos" className="btn-ultra-outline">
            FALA CONNOSCO
          </Link>
        </div>
        <div className="mt-16">
          <div className="w-16 h-[2px] bg-ultra-green/50 mx-auto" />
          <p className="text-[10px] text-gray-700 font-heading font-semibold uppercase tracking-[0.2em] mt-4">
            Directivo Algarve • Coerência • Honra • Fidelidade
          </p>
        </div>
      </div>
    </div>
  );
}
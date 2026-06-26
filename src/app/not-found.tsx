import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-sporting-dark">
      <div className="text-center px-4">
        <div className="text-9xl font-black font-heading text-sporting-green/20 dark:text-sporting-green-light/20 mb-4">
          404
        </div>
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-sporting-dark dark:text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          A página que procuras não existe ou foi removida.
          Mas o Sporting está sempre aqui! 🦁
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary text-lg px-8">
            ← Voltar ao Início
          </Link>
          <Link href="/jogos" className="btn-secondary text-lg px-8">
            Ver Jogos
          </Link>
        </div>
      </div>
    </div>
  );
}
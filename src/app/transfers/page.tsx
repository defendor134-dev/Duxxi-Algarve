import Image from "next/image";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { getTransfers } from "@/lib/services/data-service";

export default async function TransfersPage() {
  const transfers = await getTransfers();

  return (
    <div className="pt-20">
      <section className="relative py-12 md:py-20 bg-sporting-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sporting-green rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-sporting-green-light rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 container-sporting text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white mb-4">
            Transferências
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Acompanhe as últimas movimentações do Sporting CP no mercado.
          </p>
        </div>
      </section>

      <main className="container-sporting py-10 md:py-14">
        {transfers.length > 0 && (
          <div className="mb-10 rounded-[2rem] border border-sporting-green/20 bg-sporting-dark/80 p-8 shadow-xl shadow-sporting-green/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] font-semibold text-sporting-green/80 mb-2">
                  Última transferênca
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-white">
                  {transfers[0].playerName}
                </h2>
                <p className="text-sm text-gray-300 mt-2">
                  {transfers[0].fromTeam} → {transfers[0].toTeam}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm uppercase tracking-[0.24em] text-gray-400">
                  {formatDateShort(transfers[0].transferDate)}
                </p>
                <p className="text-lg font-semibold text-white mt-2">
                  {transfers[0].marketValue || "Valor não disponível"}
                </p>
              </div>
            </div>
          </div>
        )}
        {transfers.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-sporting-dark p-12 text-center">
            <h2 className="text-2xl font-heading font-bold text-sporting-dark dark:text-white mb-4">
              Nenhuma transferência disponível no momento
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              O sistema não encontrou transferências recentes para a equipa do Sporting CP.
            </p>
            <Link href="/jogos" className="btn-primary">
              Ver Jogos do Clube
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {transfers.map((transfer) => (
              <article
                key={transfer.id}
                className="rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-sporting-dark p-6 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="min-w-[128px] text-center">
                    <div className="text-xs uppercase tracking-[0.24em] font-semibold text-sporting-green mb-2">
                      {transfer.transferType || "Transferência"}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDateShort(transfer.transferDate)}
                    </div>
                    <div className="mt-3 text-sm text-gray-700 dark:text-gray-200 font-semibold">
                      {transfer.marketValue || "Valor não disponível"}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-heading font-bold text-sporting-dark dark:text-white">
                          {transfer.playerName}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transfer.fromTeam} → {transfer.toTeam}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          Origem
                        </p>
                        <p className="text-sm text-sporting-dark dark:text-white">{transfer.fromTeam}</p>
                      </div>
                      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-4">
                        <p className="text-xs uppercase tracking-[0.24em] font-semibold text-gray-500 dark:text-gray-400 mb-2">
                          Destino
                        </p>
                        <p className="text-sm text-sporting-dark dark:text-white">{transfer.toTeam}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {transfer.playerPhoto ? (
                      <div className="relative h-20 w-20 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700">
                        <Image
                          src={transfer.playerPhoto}
                          alt={transfer.playerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-20 rounded-3xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                        🤵
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

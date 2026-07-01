import Image from "next/image";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { getTransfers } from "@/lib/services/data-service";

export default async function TransfersPage() {
  const transfers = await getTransfers();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">TRANSFERÊNCIAS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Transferências
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-base font-sans">
            Acompanhe as últimas movimentações do Sporting CP no mercado.
          </p>
        </div>
      </section>

      <main className="container-ultra py-10 md:py-14">
        {transfers.length > 0 && (
          <div className="card-ultra p-8 mb-10 border-ultra-green/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] font-heading font-bold text-ultra-green-bright mb-2">
                  Última transferência
                </p>
                <h2 className="text-2xl md:text-3xl font-heading font-black text-white">
                  {transfers[0].playerName}
                </h2>
                <p className="text-sm text-gray-500 font-sans mt-2">
                  {transfers[0].fromTeam} → {transfers[0].toTeam}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.24em] font-heading font-semibold text-gray-600">
                  {formatDateShort(transfers[0].transferDate)}
                </p>
                <p className="text-lg font-heading font-bold text-white mt-2">
                  {transfers[0].marketValue || "Valor não disponível"}
                </p>
              </div>
            </div>
          </div>
        )}
        {transfers.length === 0 ? (
          <div className="card-ultra p-12 text-center">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">
              Nenhuma transferência disponível no momento
            </h2>
            <p className="text-gray-600 text-sm font-sans mb-6">
              O sistema não encontrou transferências recentes para a equipa do Sporting CP.
            </p>
            <Link href="/jogos" className="btn-ultra">
              Ver Jogos do Clube
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {transfers.map((transfer) => (
              <article key={transfer.id} className="card-ultra-hover p-6">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="min-w-[128px] text-center">
                    <div className="text-[10px] uppercase tracking-[0.24em] font-heading font-bold text-ultra-green-bright mb-2">
                      {transfer.transferType || "Transferência"}
                    </div>
                    <div className="text-xs text-gray-600 font-heading font-semibold">
                      {formatDateShort(transfer.transferDate)}
                    </div>
                    <div className="mt-3 text-sm text-white font-heading font-bold">
                      {transfer.marketValue || "Valor não disponível"}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-heading font-bold text-white">
                          {transfer.playerName}
                        </h2>
                        <p className="text-sm text-gray-600 font-sans">
                          {transfer.fromTeam} → {transfer.toTeam}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-ultra-dark border border-ultra-gray p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] font-heading font-semibold text-gray-600 mb-2">Origem</p>
                        <p className="text-sm text-white font-heading font-bold">{transfer.fromTeam}</p>
                      </div>
                      <div className="bg-ultra-dark border border-ultra-gray p-4">
                        <p className="text-[10px] uppercase tracking-[0.24em] font-heading font-semibold text-gray-600 mb-2">Destino</p>
                        <p className="text-sm text-white font-heading font-bold">{transfer.toTeam}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {transfer.playerPhoto ? (
                      <div className="relative h-20 w-20 border border-ultra-gray overflow-hidden">
                        <Image src={transfer.playerPhoto} alt={transfer.playerName} fill className="object-cover" sizes="80px" />
                      </div>
                    ) : (
                      <div className="h-20 w-20 bg-ultra-dark border border-ultra-gray flex items-center justify-center text-gray-600">
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
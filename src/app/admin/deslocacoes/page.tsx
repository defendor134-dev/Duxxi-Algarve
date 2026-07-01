"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface DeslocacaoForm {
  id: string;
  jogo: string;
  data: string;
  hora: string;
  estadio: string;
  localPartida: string;
  horaPartida: string;
  preco: string;
  vagas: number;
  vagasOcupadas: number;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminDeslocacoesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [deslocacoes, setDeslocacoes] = useState<DeslocacaoForm[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    jogo: "",
    data: "",
    hora: "",
    estadio: "",
    localPartida: "",
    horaPartida: "",
    preco: "",
    vagas: "",
    estado: "aberto",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    loadDeslocacoes();
  }, []);

  const loadDeslocacoes = () => {
    const mockData: DeslocacaoForm[] = [
      {
        id: "1",
        jogo: "Sporting CP vs FC Porto",
        data: "2026-06-28",
        hora: "20:30",
        estadio: "Estádio José Alvalade",
        localPartida: "Faro - Algarve Shopping",
        horaPartida: "15:30",
        preco: "25€",
        vagas: 50,
        vagasOcupadas: 32,
        estado: "aberto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setDeslocacoes(mockData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDeslocacao: DeslocacaoForm = {
      id: editingId || Date.now().toString(),
      jogo: formData.jogo,
      data: formData.data,
      hora: formData.hora,
      estadio: formData.estadio,
      localPartida: formData.localPartida,
      horaPartida: formData.horaPartida,
      preco: formData.preco,
      vagas: parseInt(formData.vagas),
      vagasOcupadas: 0,
      estado: formData.estado,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (editingId) {
      setDeslocacoes(deslocacoes.map((d) => (d.id === editingId ? newDeslocacao : d)));
    } else {
      setDeslocacoes([...deslocacoes, newDeslocacao]);
    }
    resetForm();
  };

  const handleEdit = (deslocacao: DeslocacaoForm) => {
    setEditingId(deslocacao.id);
    setFormData({
      jogo: deslocacao.jogo,
      data: deslocacao.data,
      hora: deslocacao.hora,
      estadio: deslocacao.estadio,
      localPartida: deslocacao.localPartida,
      horaPartida: deslocacao.horaPartida,
      preco: deslocacao.preco,
      vagas: deslocacao.vagas.toString(),
      estado: deslocacao.estado,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tens a certeza que queres eliminar esta deslocação?")) {
      setDeslocacoes(deslocacoes.filter((d) => d.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({ jogo: "", data: "", hora: "", estadio: "", localPartida: "", horaPartida: "", preco: "", vagas: "", estado: "aberto" });
    setEditingId(null);
    setShowForm(false);
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-ultra-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-black">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-ultra-dark border-r border-ultra-gray text-white min-h-screen p-6">
          <div className="mb-8">
            <div className="w-12 h-12 border-2 border-ultra-green flex items-center justify-center mb-4">
              <span className="text-sm font-heading font-black text-ultra-green-bright">DA</span>
            </div>
            <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight">Admin</h2>
            <p className="text-[10px] text-gray-600 font-heading font-semibold uppercase tracking-wider">Directivo Algarve</p>
          </div>
          <nav className="space-y-1">
            <Link href="/admin" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              📊 Dashboard
            </Link>
            <Link href="/admin/deslocacoes" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-ultra-green-bright bg-ultra-green/5 text-ultra-green-bright">
              🚌 Deslocações
            </Link>
            <Link href="/admin/noticias" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              📰 Notícias
            </Link>
            <Link href="/admin/socios" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              👥 Sócios
            </Link>
            <Link href="/admin/galeria" className="block px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider border-l-2 border-transparent text-gray-500 hover:text-white hover:border-l-ultra-green transition-all duration-200">
              📸 Galeria
            </Link>
          </nav>
          <div className="mt-8 pt-8 border-t border-ultra-gray">
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="w-full px-4 py-3 font-heading font-bold text-sm uppercase tracking-wider text-left text-ultra-red hover:bg-ultra-red/10 transition-colors">
              🚪 Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tight">
                🚌 Gestão de Deslocações
              </h1>
              <p className="text-gray-600 text-sm font-sans mt-1">Adiciona, edita ou remove deslocações</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-ultra text-[10px] px-5 py-3">
              ➕ Nova Deslocação
            </button>
          </div>

          {showForm && (
            <div className="card-ultra p-6 mb-8">
              <h2 className="text-xl font-heading font-bold text-white uppercase tracking-tight mb-4">
                {editingId ? "Editar Deslocação" : "Nova Deslocação"}
              </h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label-ultra">Jogo</label>
                  <input type="text" value={formData.jogo} onChange={(e) => setFormData({ ...formData, jogo: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Data</label>
                  <input type="date" value={formData.data} onChange={(e) => setFormData({ ...formData, data: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Hora</label>
                  <input type="time" value={formData.hora} onChange={(e) => setFormData({ ...formData, hora: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Estádio</label>
                  <input type="text" value={formData.estadio} onChange={(e) => setFormData({ ...formData, estadio: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Local de Partida</label>
                  <input type="text" value={formData.localPartida} onChange={(e) => setFormData({ ...formData, localPartida: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Hora de Partida</label>
                  <input type="time" value={formData.horaPartida} onChange={(e) => setFormData({ ...formData, horaPartida: e.target.value })} className="form-input-ultra" required />
                </div>
                <div>
                  <label className="form-label-ultra">Preço</label>
                  <input type="text" value={formData.preco} onChange={(e) => setFormData({ ...formData, preco: e.target.value })} className="form-input-ultra" placeholder="25€" required />
                </div>
                <div>
                  <label className="form-label-ultra">Vagas</label>
                  <input type="number" value={formData.vagas} onChange={(e) => setFormData({ ...formData, vagas: e.target.value })} className="form-input-ultra" required />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="btn-ultra text-[10px] px-5 py-3">
                    💾 Guardar
                  </button>
                  <button type="button" onClick={resetForm} className="btn-ultra-outline text-[10px] px-5 py-3">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="space-y-3">
            {deslocacoes.map((deslocacao) => (
              <div key={deslocacao.id} className="card-ultra p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-white mb-2">{deslocacao.jogo}</h3>
                    <div className="space-y-1 text-sm text-gray-600 font-sans">
                      <p>📅 {deslocacao.data} às {deslocacao.hora}</p>
                      <p>🏟️ {deslocacao.estadio}</p>
                      <p>📍 {deslocacao.localPartida} às {deslocacao.horaPartida}</p>
                      <p>💰 {deslocacao.preco} | 👥 {deslocacao.vagas - deslocacao.vagasOcupadas} vagas disponíveis</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(deslocacao)} className="px-4 py-2 border border-ultra-green text-ultra-green-bright hover:bg-ultra-green/10 transition-colors text-xs font-heading font-bold uppercase tracking-wider">
                      ✏️ Editar
                    </button>
                    <button onClick={() => handleDelete(deslocacao.id)} className="px-4 py-2 border border-ultra-red text-ultra-red hover:bg-ultra-red/10 transition-colors text-xs font-heading font-bold uppercase tracking-wider">
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
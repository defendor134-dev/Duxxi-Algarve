"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Deslocacao } from "@prisma/client";

export default function AdminDeslocacoesPage() {
  const router = useRouter();
  const [deslocacoes, setDeslocacoes] = useState<Deslocacao[]>([]);
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
    // Verificar se é admin
    const isAdmin = document.cookie.includes("admin=true");
    if (!isAdmin) {
      router.push("/admin/login");
    }
    // Carregar deslocações (mock)
    loadDeslocacoes();
  }, [router]);

  const loadDeslocacoes = () => {
    // Mock data - em produção, buscar da API
    const mockData: Deslocacao[] = [
      {
        id: "1",
        jogo: "Sporting CP vs FC Porto",
        data: "2026-06-28",
        hora: "20:30",
        estadio: "Estádio José Alvalade",
        localPartida: "Faro - Parque de Estacionamento do Algarve Shopping",
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
    const newDeslocacao: Deslocacao = {
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

  const handleEdit = (deslocacao: Deslocacao) => {
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
    setFormData({
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
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-sporting-dark">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-sporting-dark text-white min-h-screen p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-black">🦁 Admin</h2>
            <p className="text-sm text-gray-400">Directivo Algarve</p>
          </div>

          <nav className="space-y-2">
            <Link href="/admin" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              📊 Dashboard
            </Link>
            <Link href="/admin/deslocacoes" className="block px-4 py-3 rounded-lg bg-sporting-green/20 text-white">
              🚌 Deslocações
            </Link>
            <Link href="/admin/noticias" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              📰 Notícias
            </Link>
            <Link href="/admin/socios" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              👥 Sócios
            </Link>
            <Link href="/admin/galeria" className="block px-4 py-3 rounded-lg hover:bg-sporting-green/20 transition-colors">
              📸 Galeria
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                document.cookie = "admin=; path=/; max-age=0";
                router.push("/admin/login");
              }}
              className="w-full px-4 py-3 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-left"
            >
              🚪 Sair
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-black text-sporting-dark dark:text-white">
                🚌 Gestão de Deslocações
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Adiciona, edita ou remove deslocações
              </p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              ➕ Nova Deslocação
            </button>
          </div>

          {/* Formulário */}
          {showForm && (
            <div className="card p-6 mb-8">
              <h2 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-4">
                {editingId ? "Editar Deslocação" : "Nova Deslocação"}
              </h2>
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Jogo</label>
                  <input
                    type="text"
                    value={formData.jogo}
                    onChange={(e) => setFormData({ ...formData, jogo: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Hora</label>
                  <input
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Estádio</label>
                  <input
                    type="text"
                    value={formData.estadio}
                    onChange={(e) => setFormData({ ...formData, estadio: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Local de Partida</label>
                  <input
                    type="text"
                    value={formData.localPartida}
                    onChange={(e) => setFormData({ ...formData, localPartida: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Hora de Partida</label>
                  <input
                    type="time"
                    value={formData.horaPartida}
                    onChange={(e) => setFormData({ ...formData, horaPartida: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Preço</label>
                  <input
                    type="text"
                    value={formData.preco}
                    onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                    className="form-input"
                    placeholder="25€"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Vagas</label>
                  <input
                    type="number"
                    value={formData.vagas}
                    onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <button type="submit" className="btn-primary">
                    💾 Guardar
                  </button>
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Lista de Deslocações */}
          <div className="space-y-4">
            {deslocacoes.map((deslocacao) => (
              <div key={deslocacao.id} className="card p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-sporting-dark dark:text-white mb-2">
                      {deslocacao.jogo}
                    </h3>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <p>📅 {deslocacao.data} às {deslocacao.hora}</p>
                      <p>🏟️ {deslocacao.estadio}</p>
                      <p>📍 {deslocacao.localPartida} às {deslocacao.horaPartida}</p>
                      <p>💰 {deslocacao.preco} | 👥 {deslocacao.vagas} vagas</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(deslocacao)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(deslocacao.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
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
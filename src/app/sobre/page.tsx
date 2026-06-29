import Link from "next/link";
import { claqueInfo } from "@/lib/site-config";

export const metadata = { title: "Sobre Nós" };

export default function SobrePage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-black text-white overflow-hidden border-b border-ultra-gray">
        <div className="absolute inset-0 ultra-stripe opacity-20" />
        <div className="container-ultra relative z-10 text-center">
          <span className="badge-ultra-green mb-4">SOBRE NÓS</span>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight mb-4">
            {claqueInfo.shortName}
          </h1>
          <p className="text-lg text-ultra-green-bright font-heading font-bold uppercase tracking-[0.15em] mb-6">
            Coerência, Honra e Fidelidade
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto text-base leading-relaxed font-sans">
            {claqueInfo.description}
          </p>
        </div>
      </section>

      {/* O Directivo Ultras XXI */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <span className="badge-ultra-green mb-4">A CLAQUE-MÃE</span>
            <h2 className="section-title-ultra">Directivo Ultras XXI</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="space-y-6 text-gray-500 text-sm font-sans leading-relaxed max-w-3xl mx-auto">
            <p>
              O <strong className="text-white">Directivo Ultras XXI (DUXXI)</strong> nasceu a <strong className="text-ultra-green-bright">17 de maio de 2002</strong>, 
              fruto de uma rutura interna na claque Juventude Leonina. Liderado na sua génese por Miguel d'Almada 
              (então membro da direção da Juve Leo), o grupo rapidamente se consolidou como a segunda maior claque do Sporting, 
              distinguindo-se pela originalidade dos seus cânticos e pela forte identidade visual e coreográfica.
            </p>
            <p>
              Atualmente sediado no <strong className="text-white">sector A18</strong> da bancada Sul do Estádio José Alvalade, 
              o DUXXI é reconhecido como um dos grupos ultra mais organizados e fiéis do país. 
              A sua mística estende-se a todo o território nacional através de núcleos regionais — e o sul é representado 
              pelo <strong className="text-white">Directivo Algarve</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* A Presença do Directivo no Sul */}
      <section className="py-20 bg-black">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <span className="badge-ultra-green mb-4">O NÚCLEO REGIONAL</span>
            <h2 className="section-title-ultra">Directivo Algarve</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="space-y-6 text-gray-500 text-sm font-sans leading-relaxed max-w-3xl mx-auto">
            <p>
              Apesar do coração do DUXXI bater no sector A18 da bancada Sul do Estádio José Alvalade, 
              a mística estende-se ao sul do país com o <strong className="text-white">Directivo Algarve</strong>.
            </p>
            <p>
              <strong className="text-ultra-green-bright">Apoio Constante:</strong> O núcleo tem sido incansável a percorrer 
              quilómetros de norte a sul de Portugal e pela Europa fora, marcando presença em jogos oficiais e deslocações 
              da pré-época ao sul do país.
            </p>
            <p>
              <strong className="text-ultra-green-bright">Apoio Multidesportivo:</strong> Acompanhando de perto a filosofia do clube, 
              o grupo apoia ativamente as várias modalidades e escalões do Sporting, pintando os pavilhões e estádios de verde e branco.
            </p>
            <p>
              <strong className="text-ultra-green-bright">Acção Social e Comunidade:</strong> O núcleo algarvio destaca-se igualmente 
              fora das quatro linhas, organizando e participando em ações de solidariedade social em cidades como Faro e Olhão.
            </p>
          </div>
        </div>
      </section>

      {/* Evolução Recente */}
      <section className="py-20 bg-ultra-dark">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <span className="badge-ultra-green mb-4">ESTATUTO ATUAL</span>
            <h2 className="section-title-ultra">Evolução e Presença</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="space-y-6 text-gray-500 text-sm font-sans leading-relaxed max-w-3xl mx-auto">
            <p>
              Ao longo da sua história, o grupo enfrentou dinâmicas intensas com a direção do clube e as autoridades. 
              O movimento tem vindo a atuar com o caráter não oficial de acordo com os regulamentos internos, 
              mas mantém uma forte ligação à sua comunidade de sócios e simpatizantes.
            </p>
            <p>
              O núcleo do Algarve continua a comemorar marcos históricos, reforçando laços com outros núcleos e delegações 
              oficiais do Sporting (como o Núcleo de Tavira), promovendo o espírito de união e a partilha da mentalidade Ultra.
            </p>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-20 bg-black" id="missao">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">A Nossa Mentalidade</h2>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { title: "Coerência", desc: "Entre o que se diz e o que se faz. Entre o que se canta e o que se vive. Não há meio-termo quando se é Leão." },
              { title: "Honra", desc: "Honrar o símbolo, honrar a bancada, honrar os que vieram antes. O nome do Sporting e do Directivo não se mancha." },
              { title: "Fidelidade", desc: "Nos dias bons e nos dias maus. Nas vitórias e nas derrotas. Leal ao clube, leal ao grupo, leal aos nossos." },
            ].map((item) => (
              <div key={item.title} className="card-ultra-hover p-8 text-center">
                <h3 className="text-2xl font-heading font-black text-ultra-green-bright uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-sans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comunicado de Fundação */}
      <section className="py-20 bg-ultra-dark" id="historia">
        <div className="container-ultra-narrow">
          <div className="text-center mb-16">
            <h2 className="section-title-ultra">Comunicado de Fundação</h2>
            <p className="text-gray-600 text-sm font-sans mt-2">17 de Maio de 2002 — O nascimento do Directivo Ultras XXI</p>
            <div className="flex justify-center mt-6"><div className="section-divider-ultra" /></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="card-ultra p-8 md:p-12 border-ultra-green/20">
              <div className="text-[11px] text-gray-600 font-heading font-bold uppercase tracking-wider mb-6 leading-relaxed font-sans">
                <p className="text-white font-heading font-black text-sm uppercase tracking-tight mb-6">COMUNICADO DE FUNDAÇÃO</p>
                <p className="mb-4">Caríssimos amigos…</p>
                <p className="mb-4">
                  Nestes últimos tempos, a grande maioria de vós foi extremamente importante para o sucesso do nosso clube. 
                  Constatámos que no estádio, sócios ou não, sempre apoiaram ao nosso lado. Precisamente por este motivo, 
                  decidimos informar-vos e dar-vos conta da nossa decisão de abandonarmos a Curva Sul, depois de vários anos ali passados.
                </p>
                <p className="mb-4">
                  Acontece que, no já próximo campeonato 2002/03, transferir-nos-emos, em número considerável, para a Curva Norte. 
                  Estamos conscientes de que a mudança não vai ser fácil, mas isso serve também como estímulo para esta nova forma 
                  de viver e amar o grande Sporting Clube de Portugal.
                </p>
                <p className="mb-4">
                  As razões que nos levaram a dar este passo são múltiplas, mas entre todas, as principais prendem-se com a total 
                  desorganização e o situacionismo de alguns elementos da Curva Sul.
                </p>
                <p className="mb-4">
                  Por este meio vimos assim informar todos os Sportinguistas das nossas pretensões e do novo rumo a que, tal como nós, 
                  o nosso clube se propôs — novo Estádio, novo Símbolo… Nova Claque, nova Mentalidade.
                </p>
                <p className="mb-4">
                  Fazemos ainda o apelo a quem connosco quiser fazer a festa para se dirigir para a Curva Norte, 
                  e viver grandes momentos com aquela fantástica Equipa que todos os Domingos nos reúne debaixo de um único emblema: 
                  o Leão, símbolo do nosso maravilhoso clube.
                </p>
                <div className="border-t border-ultra-gray pt-6 mt-8 text-center">
                  <p className="text-white font-heading font-black text-sm uppercase tracking-tight">SPORTING!</p>
                  <p className="text-gray-600 mt-2">PELO SPORTING, OBRIGADO POR EXISTIRES…!!</p>
                  <p className="text-ultra-green-bright font-heading font-bold text-xs mt-2 uppercase tracking-wider">ATÉ QUE A MORTE NÃO NOS SEPARE…!!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-black border-t border-ultra-gray text-center">
        <div className="container-ultra-narrow">
          <h2 className="text-4xl md:text-5xl font-heading font-black text-white uppercase tracking-tight mb-4">
            Queres Fazer Parte?
          </h2>
          <p className="text-gray-500 text-base mb-10 max-w-2xl mx-auto font-sans">
            O Directivo Algarve está aberto a todos os que queiram viver o Sporting com paixão, 
            militância e espírito de grupo. Coerência, honra e fidelidade — eis a nossa mentalidade.
          </p>
          <Link href="/socios" className="btn-ultra text-base px-12 py-5 glow-green-hover">
            SER SÓCIO
          </Link>
        </div>
      </section>
    </div>
  );
}
import ClientLoginSection from "./components/login/ClientLoginSection";

export default async function Home() {



  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">

      {/* Navigationsfält (Header) */}
      <header className="p-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-400">Backlog Buddy</h1>
          <nav>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition duration-150 mr-4">Om oss</a>
            <a href="#" className="text-gray-300 hover:text-indigo-400 transition duration-150">Vanliga frågor</a>
          </nav>
        </div>
      </header>

      {/* Huvudsektion (Hero/CTA) */}
      <main className="container mx-auto px-4 py-20 text-center">

        {/* Rubrik och Undertitel */}
        <h2 className="text-6xl font-extrabold mb-4 leading-tight">
          Besegra Din Steam <span className="text-indigo-400">Backlog.</span>
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Backlog Buddy analyserar din spelhistorik och playtime för att ge dig AI-drivna, personliga rekommendationer. Spela rätt spel, varje gång.
        </p>

        <ClientLoginSection />

      </main>

      {/* Funktionssektion (Features) */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12">Hur Backlog Buddy Fungerar</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Funktion 1 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-indigo-500/20 transition duration-300">
              <div className="text-indigo-400 text-3xl mb-4 font-bold">1. Samla Data</div>
              <p className="text-gray-300">Vi använder Steam Web API för att säkert hämta din spellista och speltid (kräver publik profil). Ingen inloggningsinformation lagras.</p>
            </div>

            {/* Funktion 2 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-indigo-500/20 transition duration-300">
              <div className="text-indigo-400 text-3xl mb-4 font-bold">2. AI-Analys</div>
              <p className="text-gray-300">Vår rekommendationsmotor (där du kommer att implementera din OOP-logik!) analyserar genrer, speltid och ditt köpmönster.</p>
            </div>

            {/* Funktion 3 */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-xl hover:shadow-indigo-500/20 transition duration-300">
              <div className="text-indigo-400 text-3xl mb-4 font-bold">3. Rekommendera</div>
              <p className="text-gray-300">Få en kort, tydlig lista över de spel du faktiskt borde spela just nu, utvalda från din egen backlog.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Sidfot (Footer) */}
      <footer className="p-6 text-center border-t border-gray-800 text-gray-500">
        <div className="container mx-auto">
          &copy; 2025 Backlog Buddy. Byggd med Next.js, TypeScript och OOP-anda.
        </div>
      </footer>

    </div>
  );
}

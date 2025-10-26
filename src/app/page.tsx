import Image from "next/image";

export default function Home() {
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

        {/* CTA-sektion (Call to Action) */}
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl inline-block">
          <h3 className="text-2xl font-semibold mb-6">Kom igång på två sätt:</h3>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            
            {/* Alternativ 1: Steam OpenID (Föredragen) */}
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md shadow-indigo-500/50 flex items-center justify-center">
              {/* Platshållare för Steam-ikon */}
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.391 14.832c.691-.194 1.157-.8 1.157-1.503 0-.916-.763-1.583-1.672-1.583h-3.876c-.341 0-.671-.164-.881-.444-.225-.297-.282-.693-.157-1.049.207-.577.834-.949 1.543-.949h3.69c.642 0 1.17-.528 1.17-1.17s-.528-1.17-1.17-1.17h-3.69c-2.31 0-4.223 1.838-4.223 4.102 0 1.625.969 3.033 2.458 3.659v1.288c0 .642.528 1.17 1.17 1.17h1.492c.642 0 1.17-.528 1.17-1.17s-.528-1.17-1.17-1.17h-1.492c-.173 0-.34-.038-.493-.11.458-.293.751-.8.751-1.378 0-.987-.803-1.79-1.79-1.79h-3.076c-.642 0-1.17-.528-1.17-1.17s.528-1.17 1.17-1.17h3.076c.404 0 .736.332.736.736 0 .404-.332.736-.736.736h-3.076c-.305 0-.555.25-.555.555s.25.555.555.555h4.156c1.177 0 2.137.96 2.137 2.137 0 .546-.208 1.055-.58 1.442z"/>
              </svg>
              Logga in med Steam (Rekommenderas)
            </button>

            {/* Alternativ 2: URL-fält */}
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">Eller klistra in din publika Steam Profil URL:</p>
              <div className="flex">
                <input type="text" placeholder="https://steamcommunity.com/id/..." className="w-full p-3 rounded-l-lg bg-gray-700 border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-gray-400" />
                <button className="bg-indigo-700 hover:bg-indigo-600 py-3 px-5 rounded-r-lg font-semibold transition duration-150">
                  Analysera
                </button>
              </div>
            </div>

          </div>
          
        </div>

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

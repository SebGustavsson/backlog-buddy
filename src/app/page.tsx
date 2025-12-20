"use client";

import React, { useEffect, useState } from "react";
import getSteamProfileFromUrl from '@/lib/steam/functions';

export default function Home() {
  // Fun feature: random suggestion / surprise button
  const suggestions = [
    "Spela 30 min av sista köpet 🕹️",
    "Utforska ett indie-äventyr 🌟",
    "Kör co-op med en vän 🤝",
    "Återuppta ett avbrutet RPG 🗺️",
    "Testa ett kort roguelite 🔁",
    "Ge ett gammalt spel en ny chans 🔁",
    "Satsa på en snabb speedrun ⏱️",
  ];

  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);

  function surpriseMe() {
    const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
    setSuggestion(pick);
    // small emoji burst animation trigger
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  const [steamUrl, setSteamUrl] = useState('');
  function getSteamProfile() {
    getSteamProfileFromUrl(steamUrl).then((d) => {
        console.log(d);
    })
  }

  // auto-hide suggestion after a short time so tests can assert presence then disappearance
  useEffect(() => {
    if (!suggestion) return;
    const t = setTimeout(() => setSuggestion(null), 4000);
    return () => clearTimeout(t);
  }, [suggestion]);

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
          <h3 className="text-2xl font-semibold mb-6">Kom igång</h3>
          
            <div className="flex flex-col space-y-3">
              <p className="text-sm text-gray-400">Klistra in din publika Steam Profil URL:</p>
              <div className="flex">
                <input 
                    type="text"
                    id="steamProfileUrlInput"
                    placeholder="https://steamcommunity.com/id/..."
                    value={steamUrl}
                    onChange={(e) => setSteamUrl(e.target.value)}
                    className="w-full p-3 rounded-l-lg bg-gray-700 border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-gray-400" 
                />
                <button 
                    className="bg-indigo-700 hover:bg-indigo-600 py-3 px-5 rounded-r-lg font-semibold transition duration-150"
                    onClick={getSteamProfile}
                >
                  Analysera
                </button>
              </div>
            </div>

          {/* Fun: Surprise me control */}
          <div className="mt-6 flex items-center justify-center space-x-4">
            <button
              onClick={surpriseMe}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-lg shadow-md transition duration-150"
              aria-label="Surprise me"
              data-testid="surprise-button"
            >
              Överraska mig
            </button>

            {suggestion && (
              <div
                className="ml-2 bg-gray-900 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg flex items-center space-x-3 transform transition-all duration-300"
                data-testid="surprise-suggestion"
              >
                <div className={`text-2xl ${burst ? "scale-110" : ""}`}>🎉</div>
                <div className="text-left text-sm">{suggestion}</div>
                <button
                  onClick={() => setSuggestion(null)}
                  className="ml-3 text-gray-400 hover:text-gray-200"
                  aria-label="Close suggestion"
                >
                  ✕
                </button>
              </div>
            )}
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
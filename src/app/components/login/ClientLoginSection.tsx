'use client';

import { useState, FC } from 'react';

type IClientLoginSection = FC;

const ClientLoginSection: IClientLoginSection = () => {
    const [steamUrl, setSteamUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>();
    const [recommendations, setRecommendations] = useState<[] | null>([]);

    // TODO: Steam OpenID
    const handleSteamLogin = () => {
        alert("Navigate to Steam OpenID authentication");
    };

    const handleUrlAnalyze = async () => {
        if (!steamUrl.trim()) {
            setError("Please post a valid Steam URL");
            return;
        }

        setIsLoading(true);
        setError(null);
        setRecommendations(null);

        try {
            const response = await fetch('/api/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ steamId: steamUrl }),
            });

            const data = await response.json();

            console.log(data);
            if (!response.ok || data.status === 'error') {

                throw new Error(data.message || response.status);
            }

            //TODO recommendations
        } catch (err) {
            console.error('Error:', err);
            const message = err instanceof Error ? err.message : "Unexpected error occured.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl inline-block w-2/3" >
            <h3 className="text-2xl font-semibold mb-6">Kom igång på två sätt:</h3>

            <div className="md:grid md:grid-cols-2 sm:flex sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-between">

                {/* Alternativ 1: Steam OpenID */}
                <button
                    onClick={handleSteamLogin}
                    disabled={isLoading}
                    className={`font-bold py-3 px-8 rounded-lg transition duration-300 shadow-md shadow-indigo-500/50 flex items-center justify-center ${isLoading ? 'bg-gray-500' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.391 14.832c.691-.194 1.157-.8 1.157-1.503 0-.916-.763-1.583-1.672-1.583h-3.876c-.341 0-.671-.164-.881-.444-.225-.297-.282-.693-.157-1.049.207-.577.834-.949 1.543-.949h3.69c.642 0 1.17-.528 1.17-1.17s-.528-1.17-1.17-1.17h-3.69c-2.31 0-4.223 1.838-4.223 4.102 0 1.625.969 3.033 2.458 3.659v1.288c0 .642.528 1.17 1.17 1.17h1.492c.642 0 1.17-.528 1.17-1.17s-.528-1.17-1.17-1.17h-1.492c-.173 0-.34-.038-.493-.11.458-.293.751-.8.751-1.378 0-.987-.803-1.79-1.79-1.79h-3.076c-.642 0-1.17-.528-1.17-1.17s.528-1.17 1.17-1.17h3.076c.404 0 .736.332.736.736 0 .404-.332.736-.736.736h-3.076c-.305 0-.555.25-.555.555s.25.555.555.555h4.156c1.177 0 2.137.96 2.137 2.137 0 .546-.208 1.055-.58 1.442z" />
                    </svg>
                    Logga in med Steam (Rekommenderas)
                </button>

                {/* Alternativ 2: URL-fält */}
                <div className="flex flex-col space-y-3">
                    <p className="text-sm text-gray-400">Eller klistra in din publika Steam Profil URL:</p>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="https://steamcommunity.com/profiles/..."
                            value={steamUrl}
                            onChange={(e) => setSteamUrl(e.target.value)}
                            disabled={isLoading}
                            className="w-full p-3 rounded-l-lg bg-gray-700 border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-sm placeholder-gray-400"
                        />
                        <button
                            onClick={handleUrlAnalyze}
                            disabled={isLoading}
                            className={`py-3 px-5 rounded-r-lg font-semibold transition duration-150 ${isLoading ? 'bg-gray-500' : 'bg-indigo-700 hover:bg-indigo-600'
                                }`}
                        >
                            {isLoading ? 'Analys pågår...' : 'Analysera'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ClientLoginSection;
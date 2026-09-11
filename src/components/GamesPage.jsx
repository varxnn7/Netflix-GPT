import React from 'react';
import Header from './Header';
import Footer from './Footer';

const GamesPage = () => {
  const games = [
    {
      id: 1,
      title: 'Stranger Things: 1984',
      genre: 'Arcade Adventure',
      rating: '★★★★',
      image: 'https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg',
      tag: 'Included with Netflix',
    },
    {
      id: 2,
      title: 'Oxenfree',
      genre: 'Supernatural Thriller',
      rating: '★★★★★',
      image: 'https://image.tmdb.org/t/p/w500/56v2KjBlU4XaOv9rVYEQypROD7P.jpg',
      tag: 'Fan Favourite',
    },
    {
      id: 3,
      title: 'Into the Breach',
      genre: 'Strategy',
      rating: '★★★★',
      image: 'https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
      tag: 'Award Winning',
    },
    {
      id: 4,
      title: 'Moonlighter',
      genre: 'Action RPG',
      rating: '★★★★',
      image: 'https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg',
      tag: 'New',
    },
    {
      id: 5,
      title: 'Spiritfarer',
      genre: 'Cozy Management',
      rating: '★★★★★',
      image: 'https://image.tmdb.org/t/p/w500/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg',
      tag: 'Critically Acclaimed',
    },
    {
      id: 6,
      title: 'Dead Cells: Return to Castlevania',
      genre: 'Roguelike',
      rating: '★★★★',
      image: 'https://image.tmdb.org/t/p/w500/c9XxP3OzFzNnjIALFwdKIJ7F9Gh.jpg',
      tag: 'Popular',
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12 pb-12">
        {/* Hero Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Netflix Games</h1>
          <p className="text-gray-400 text-base md:text-lg max-w-xl">
            Included free with your Netflix membership. No ads, no in-app purchases. Just games.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {games.map((game) => (
            <div
              key={game.id}
              className="group relative rounded-lg overflow-hidden cursor-pointer bg-[#1a1a1a] hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="aspect-square bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center">
                <div className="text-6xl">🎮</div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-2">
                  {game.title}
                </h3>
                <p className="text-gray-500 text-xs mb-1">{game.genre}</p>
                <span className="inline-block bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                  {game.tag}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 bg-white text-black font-bold text-sm px-4 py-2 rounded-full transition-opacity duration-300">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-[#141414] border border-[#333] rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="text-5xl">🎮</div>
          <div>
            <h2 className="text-white text-xl font-bold mb-2">Play on Mobile</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Download the Netflix app on your iOS or Android device to play these games at no extra cost.
              No ads. No additional fees. Just download and play.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GamesPage;

import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import MovieList from './MovieList';
import Footer from './Footer';

const MyListPage = () => {
  const myList = useSelector((store) => store.myList);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="pt-28 px-4 md:px-12 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">My List</h1>

        {myList && myList.length > 0 ? (
          <MovieList title="" movies={myList} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-6">🎬</div>
            <h2 className="text-white text-2xl font-semibold mb-3">Your list is empty</h2>
            <p className="text-gray-500 text-base max-w-sm">
              Add movies and TV shows to your list so you can find them here later.
              Look for the <strong className="text-white">+ My List</strong> button on any title.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyListPage;

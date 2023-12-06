import React from 'react';

function HomePage() {
  return (
    <section className="h-screen ">
      <article className="flex flex-col items-center justify-center h-full max-w-screen-xl mx-auto">
        <header className="py-2 text-center">
          <h2 className="text-xl font-black tracking-wider uppercase sm:text-2xl md:text-4xl">
            Lastest Models
          </h2>
          <h3 className="py-1 text-sm font-semibold text-gray-400 sm:text-base">
            Please select a Car Model
          </h3>
        </header>
      </article>
    </section>
  );
}

export default HomePage;

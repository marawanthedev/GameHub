import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-white font-sans px-4 pt-16 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center py-20">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Discover and Buy the Best Games</h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore a curated collection of top-tier games. Track your favorites, compare platforms, and check out securely.
        </p>
        <a
          href="/games"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Browse Games
        </a>
      </section>

      {/* Game Slider */}
      <section className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Featured Games</h2>
        <div className="overflow-x-auto flex space-x-6 pb-4">
          {[1, 2, 3, 4].map((id) => (
            <div key={id} className="relative bg-[#161b22] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 group">
              {/* Image with aspect ratio */}
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src="https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg"
                  alt="Cyberpunk 2077"
                  width={300}
                  height={169}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Overlay details */}
              <div className="p-4 space-y-2">
                <h3 className="text-white text-lg font-semibold">Cyberpunk 2077</h3>
                <p className="text-sm text-gray-400">RPG, Action</p>

                {/* Platform tags */}
                <div className="flex gap-2 flex-wrap mt-2">
                  {['PC', 'PS5', 'Xbox'].map((platform) => (
                    <span
                      key={platform}
                      className="bg-[#30363d] text-white text-xs px-2 py-1 rounded-full"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          ))}
        </div>
      </section>
    </main>

  );
}

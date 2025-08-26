import PinnedHero from "@/components/PinnedHero";

export default function Page() {
  return (
    <div>
      <PinnedHero />

      {/* Keep / remove the rest of the page as you like */}
      <section className="h-screen bg-white">
        <div className="container mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full">
            <div className="h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">Content coming soon...</p>
            </div>
            <div className="h-full flex flex-col justify-center space-y-6">
              <h2 className="text-4xl font-bold text-red-600 mb-4">About Us</h2>
              <div className="w-16 h-1 bg-yellow-400 mb-6" />
              <p className="text-gray-700 text-lg leading-relaxed">
                We are passionate about creating exceptional experiences that
                inspire and delight.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                With years of experience and a dedicated team, we strive to
                deliver solutions that exceed expectations.
              </p>
              <div className="pt-4">
                <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors duration-300 font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

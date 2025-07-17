import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Genius-Lab-Logo-Main-Green-600.png";
import jsLogo from "@/assets/javascript.png";
import pythonLogo from "@/assets/python.png";
import cppLogo from "@/assets/c++.png";
import CodingBackground from "@/components/CodingBackground";

export default function Home() {
  return (
    <div className="bg-black">
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-24 relative overflow-hidden h-fit">
        <CodingBackground />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="-mt-12">
              <Image
                src={logo}
                alt="GeniusLabs Logo"
                width={300}
                height={300}
                className="mx-auto mb-8 drop-shadow-2xl"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Learn to Code with
              <span className="block text-green-400 mt-2">GeniusLabs</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-300">
              Master programming and radical social entrepreneurship through interactive lessons, hands-on projects, and personalized learning paths
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/modules"
                className="bg-green-500/50 border border-green-500 ext-white px-10 py-4 rounded-xl font-semibold hover:bg-green-500/60 transition-all duration-200 shadow-lg hover:shadow-xl transform "
              >
                Start Learning
              </Link>
              <Link
                href="/signup"
                className="border-1 border-green-500 text-green-500 px-10 py-4 rounded-xl font-semibold hover:bg-green-500/50 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl transform "
              >
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Why Choose GeniusLabs?
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-[#222222] border-1 border-gray-700  rounded-2xl  transition-all duration-300 transform hover:-translate-y-2  ">
              <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">💻</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Interactive Learning</h3>
              <p className="text-gray-400 leading-relaxed">
                Practice coding in real-time with our interactive code editor and instant feedback
              </p>
            </div>
            <div className="text-center p-8 bg-[#222222] border-1 border-gray-700  rounded-2xl  transition-all duration-300 transform hover:-translate-y-2  ">
              <div className="bg-black w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">🎯</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Structured Curriculum</h3>
              <p className="text-gray-400 leading-relaxed">
                Follow our carefully designed learning path from beginner to advanced levels
              </p>
            </div>
            <div className="text-center p-8 bg-[#222222] border-1 border-gray-700  rounded-2xl  transition-all duration-300 transform hover:-translate-y-2  ">
              <div className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-white">🏆</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Track Progress</h3>
              <p className="text-gray-400 leading-relaxed">
                Monitor your learning journey with detailed progress tracking and achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Popular Programming Languages
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'JavaScript', logo: jsLogo, available: true },
              { name: 'Python', logo: pythonLogo, available: true },
              { name: 'C++', logo: cppLogo, available: false },
              { name: 'Java', logo: null, available: false }
            ].map((language) => (
              <div key={language.name} className="bg-[#222222] border border-gray-700 p-8 rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:border-green-500">
                <div className="flex items-center justify-center mb-6">
                  {language.logo ? (
                    <Image
                      src={language.logo}
                      alt={`${language.name} Logo`}
                      width={64}
                      height={64}
                      className="w-16 h-16"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {language.name.substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white text-center">{language.name}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed text-center">
                  Learn {language.name} from basics to advanced concepts
                </p>
                <div className="text-center">
                  {language.available ? (
                    <Link
                      href="/modules"
                      className="inline-flex items-center text-green-500 hover:text-green-600 font-semibold transition-colors"
                    >
                      Start Learning →
                    </Link>
                  ) : (
                    <span className="text-gray-500 font-semibold">Coming Soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

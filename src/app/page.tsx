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
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        <CodingBackground />

        {/* Floating gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-green-600/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo with enhanced animations */}
            <div className="mb-8 group">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                <Image
                  src={logo}
                  alt="GeniusLabs Logo"
                  width={320}
                  height={320}
                  className="relative mx-auto drop-shadow-2xl transform group-hover:scale-105 transition-all duration-500 filter group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Enhanced title with staggered animation */}
            <div className="mb-8 space-y-4">
              <h1 className="text-3xl md:text-6xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
                  Learn to Code
                </span>
                <span className="block mt-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-300 to-green-500 animate-pulse" style={{animationDelay: '0.5s'}}>
                    with GeniusLab
                  </span>
                </span>
              </h1>
            </div>

            {/* Enhanced description */}
            <p className="text-lg md:text-lg mb-8 max-w-4xl mx-auto text-gray-300 leading-relaxed font-light">
              The Hidden Genius Project trains and mentors black male youth in
              <span className="text-green-400 font-medium"> technology creation</span>,
              <span className="text-green-400 font-medium"> entrepreneurship</span>, and
              <span className="text-green-400 font-medium"> Leadership</span> skills
              to transform their lives and communities
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/modules"
                className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Learning
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>

              <Link
                href="/signup"
                className="group relative overflow-hidden border-2 border-green-500 text-green-400 px-12 py-5 rounded-2xl font-bold text-lg hover:text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm bg-green-500/5 hover:bg-green-500/10"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Sign Up Free
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Link>
            </div>

            {/* Stats section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">0+</div>
                <div className="text-gray-400 font-medium">Students Learning</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">0+</div>
                <div className="text-gray-400 font-medium">Interactive Lessons</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-400 font-medium">Learning Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border border-green-500/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border border-green-500/10 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border border-green-500/15 rounded-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose
            </h2>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              GeniusLabs?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of coding education with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Interactive Learning Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-green-500/20 p-10 rounded-3xl transition-all duration-500 group-hover:border-green-500/40 group-hover:transform group-hover:-translate-y-4 backdrop-blur-sm">
                <div className="relative">
                  <div className=""></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                  Interactive Learning
                </h3>
                <p className="text-gray-400 leading-relaxed text-center group-hover:text-gray-300 transition-colors duration-300">
                  Practice coding in real-time with our revolutionary interactive code editor, featuring instant feedback and AI-powered assistance
                </p>
              </div>
            </div>

            {/* Structured Curriculum Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-green-500/20 p-10 rounded-3xl transition-all duration-500 group-hover:border-green-500/40 group-hover:transform group-hover:-translate-y-4 backdrop-blur-sm">
                <div className="relative">
                  <div className=""></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                  Structured Curriculum
                </h3>
                <p className="text-gray-400 leading-relaxed text-center group-hover:text-gray-300 transition-colors duration-300">
                  Follow our expertly crafted learning path designed by industry professionals, taking you from beginner to advanced levels
                </p>
              </div>
            </div>

            {/* Track Progress Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-green-500/20 p-10 rounded-3xl transition-all duration-500 group-hover:border-green-500/40 group-hover:transform group-hover:-translate-y-4 backdrop-blur-sm">
                <div className="relative">
                  <div className=""></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-6 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                  Track Progress
                </h3>
                <p className="text-gray-400 leading-relaxed text-center group-hover:text-gray-300 transition-colors duration-300">
                  Monitor your learning journey with detailed analytics, achievements, and personalized insights to accelerate your growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-green-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-green-300 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Master Popular
            </h2>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
              Programming Languages
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Start your coding journey with industry-standard languages that power the modern world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: 'JavaScript', logo: jsLogo, available: true, description: 'Build dynamic web applications', color: 'from-yellow-500 to-yellow-600' },
              { name: 'Python', logo: pythonLogo, available: true, description: 'AI, data science & web development', color: 'from-blue-500 to-blue-600' },
              { name: 'C++', logo: cppLogo, available: false, description: 'Learn system programming & dev', color: 'from-purple-500 to-purple-600' },
            ].map((language, index) => (
              <div key={language.name} className="group relative" style={{animationDelay: `${index * 0.1}s`}}>
                {/* Glowing background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${language.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}></div>

                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-700/50 group-hover:border-green-500/50 p-8 rounded-3xl transition-all duration-500 group-hover:transform group-hover:-translate-y-6 backdrop-blur-sm">
                  {/* Logo container */}
                  <div className="relative mb-8">
                    <div className="flex items-center justify-center">
                      {language.logo ? (
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${language.color} rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                          <div className="relative w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Image
                              src={language.logo}
                              alt={`${language.name} Logo`}
                              width={48}
                              height={48}
                              className="w-12 h-12 group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className={`absolute inset-0 bg-gradient-to-br ${language.color} rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-all duration-500`}></div>
                          <div className={`relative w-20 h-20 bg-gradient-to-br ${language.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                            <span className="text-2xl font-black text-white">
                              {language.name.substring(0, 2)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white text-center group-hover:text-green-400 transition-colors duration-300">
                    {language.name}
                  </h3>

                  <p className="text-gray-400 mb-8 leading-relaxed text-center text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {language.description}
                  </p>

                  <div className="text-center">
                    {language.available ? (
                      <Link
                        href="/modules"
                        className="group/btn relative inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
                      >
                        <span>Start Learning</span>
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="relative">
                        <span className="inline-flex items-center gap-2 bg-gray-700/50 text-gray-400 px-6 py-3 rounded-xl font-semibold text-sm border border-gray-600/50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Coming Soon
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status indicator */}
                  <div className="absolute top-4 right-4">
                    {language.available ? (
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    ) : (
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-8 text-lg">
              Ready to start your coding journey? Join thousands of learners already mastering these languages.
            </p>
            <Link
              href="/modules"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-green-500/25"
            >
              <span>Explore All Courses</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

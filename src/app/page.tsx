'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Code2, Globe, Code, Zap, Hash, Layout, Gamepad2, Database } from "lucide-react";
import logo from "@/assets/Genius-Lab-Logo-Main-Green-600.png";
import jsLogo from "@/assets/javascript.png";
import pythonLogo from "@/assets/python.png";
import cppLogo from "@/assets/c++.png";
import CodingBackground from "@/components/CodingBackground";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('javascript');

  const categories = [
    { id: 'javascript', label: 'JavaScript' },
    { id: 'python', label: 'Python' },
    { id: 'cpp', label: 'C++' },
    { id: 'webdev', label: 'Web Development' }
  ];

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
        <CodingBackground />

        {/* Floating gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 222, 33, 0.1)' }}></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 222, 33, 0.05)', animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'rgba(255, 222, 33, 0.08)', animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 group">
              <div className="relative inline-block">
                <Image
                  src={logo}
                  alt="GeniusLabs Logo"
                  width={400}
                  height={400}
                  className="relative mx-auto drop-shadow-2xl transform group-hover:scale-105 transition-all duration-200 filter group-hover:brightness-110"
                />
              </div>
            </div>

            {/* Title */}
            <div className="mb-8 space-y-4">
              <h1 className="text-2xl md:text5xl lg:text-5xl font-black leading-tight tracking-tight">
                <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
                  Start your
                </span>
                <span className="block mt-3">
                  <span className="text-transparent bg-clip-text animate-pulse" style={{ backgroundImage: 'linear-gradient(to right, #FFDE21, #FFDE21, #FFDE21)', WebkitBackgroundClip: 'text', animationDelay: '0.5s' }}>
                    coding journey
                  </span>
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-lg mb-8 max-w-4xl mx-auto text-gray-300 leading-relaxed font-light">
              The Hidden Genius Project trains and mentors black male youth in
              <span className="font-medium" style={{ color: '#FFDE21' }}> technology creation</span>,
              <span className="font-medium" style={{ color: '#FFDE21' }}> entrepreneurship</span>, and
              <span className="font-medium" style={{ color: '#FFDE21' }}> Leadership</span> skills
              to transform their lives and communities
            </p>

            {/* CTA Buttons - 3D Style with Hover */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/modules"
                className="group relative text-black px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-150"
                style={{
                  backgroundColor: '#FFDE21',
                  boxShadow: '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)',
                  transform: 'perspective(300px) rotateX(5deg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFE84D';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(4px)';
                  e.currentTarget.style.boxShadow = '0 2px 0 #E5C71D, 0 4px 12px rgba(0,0,0,0.3)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                  e.currentTarget.style.backgroundColor = '#FFDE21';
                }}
              >
                <span className="flex items-center gap-3">
                  Start Learning
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/signup"
                className="group relative px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-150 border-2"
                style={{
                  color: '#FFDE21',
                  backgroundColor: 'black',
                  borderColor: '#4a4a4a',
                  boxShadow: '0 6px 0 #4a4a4a, 0 8px 12px rgba(0,0,0,0.3)',
                  transform: 'perspective(300px) rotateX(5deg)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6a6a6a';
                  e.currentTarget.style.backgroundColor = '#0a0a0a';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(4px)';
                  e.currentTarget.style.boxShadow = '0 2px 0 #4a4a4a, 0 4px 12px rgba(0,0,0,0.3)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 #4a4a4a, 0 8px 12px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 0 #4a4a4a, 0 8px 12px rgba(0,0,0,0.3)';
                  e.currentTarget.style.borderColor = '#4a4a4a';
                  e.currentTarget.style.backgroundColor = 'black';
                }}
              >
                <span className="flex items-center gap-3">
                  Sign Up Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </span>
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#FFDE21' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Build Skills Section */}
      <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Build <span style={{ color: '#FFDE21' }}>your tech skills</span> skills
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'JavaScript', Icon: Code2, available: true },
              { name: 'HTML & CSS', Icon: Globe, available: true },
              { name: 'Python', Icon: Code, available: false },
              { name: 'C++', Icon: Zap, available: false },
              { name: 'C#', Icon: Hash, available: false },
              { name: 'Web Dev', Icon: Layout, available: false },
              { name: 'Game Dev', Icon: Gamepad2, available: false },
              { name: 'Data Science', Icon: Database, available: false }
            ].map((skill, index) => (
              <div
                key={skill.name}
                className="group relative bg-[#0f0f0f] border border-gray-800 rounded-2xl p-6 text-center hover:border-white/20 transition-all duration-300 cursor-pointer"
              >
                {!skill.available && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-gray-800/80 text-gray-400 border border-gray-700">
                      SOON
                    </span>
                  </div>
                )}
                <skill.Icon className="w-10 h-10 mx-auto mb-3 text-gray-400 group-hover:text-[#FFDE21] transition-colors" />
                <div className="text-sm font-semibold text-gray-200">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose GeniusLabs - 2 Card Design */}
      <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-black relative overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose
            </h2>
            <h2 className="text-5xl md:text-6xl font-black mb-8 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #FFDE21, #FFDE21)' }}>
              GeniusLabs?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Learn to code with hands on and interactive activities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 - Interactive Learning */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-800 rounded-3xl p-12 transition-all duration-300 hover:border-white/30 overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: '#FFDE21' }}>
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-white transition-colors duration-300">
                  Interactive Learning
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  Practice coding in real-time with our revolutionary interactive code editor, featuring instant feedback and AI-powered assistance to accelerate your learning.
                </p>
              </div>
            </div>

            {/* Card 2 - Structured Curriculum */}
            <div className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-800 rounded-3xl p-12 transition-all duration-300 hover:border-white/30 overflow-hidden">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: '#FFDE21' }}>
                  <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-white transition-colors duration-300">
                  Track Your Progress
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
                  Follow our expertly crafted learning path with detailed analytics, achievements, and personalized insights designed to take you from beginner to advanced levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Your Learning Path Section */}
      <section className="py-32 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
        {/* Pixelated Dot Pattern Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[85%] h-full" style={{
            backgroundImage: `radial-gradient(circle, rgba(230, 230, 230, 0.4) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
            imageRendering: 'pixelated'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Explore your </span>
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #FFDE21, #FFDE21)' }}>learning path</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                  activeCategory === category.id
                    ? 'text-black border-[#FFDE21]'
                    : 'bg-transparent text-gray-300 hover:bg-gray-800/30 border-[#2a2a2a]'
                }`}
                style={activeCategory === category.id ? { backgroundColor: '#FFDE21' } : {}}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Content Area - Joined Containers */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] border border-gray-800 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left - Course List */}
                <div className="p-10 border-r border-gray-800">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    {activeCategory === 'javascript' && 'JavaScript Courses'}
                    {activeCategory === 'python' && 'Python Courses'}
                    {activeCategory === 'cpp' && 'C++ Courses'}
                    {activeCategory === 'webdev' && 'Web Development Courses'}
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFDE21' }}></div>
                      <span>Fundamentals & Syntax</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFDE21' }}></div>
                      <span>Data Structures & Algorithms</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFDE21' }}></div>
                      <span>Object-Oriented Programming</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFDE21' }}></div>
                      <span>Advanced Concepts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FFDE21' }}></div>
                      <span>Real-World Projects</span>
                    </li>
                  </ul>
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <p className="text-sm text-gray-500">12 additional courses</p>
                  </div>
                </div>

                {/* Right - Visual/Image */}
                <div className="p-16 flex items-center justify-center min-h-[400px]">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-3xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 222, 33, 0.1)' }}>
                      <svg className="w-24 h-24" style={{ color: '#FFDE21' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="text-2xl font-bold text-white mb-2">
                      {activeCategory === 'javascript' && 'Master JavaScript'}
                      {activeCategory === 'python' && 'Master Python'}
                      {activeCategory === 'cpp' && 'Master C++'}
                      {activeCategory === 'webdev' && 'Build Amazing Websites'}
                    </p>
                    <p className="text-gray-400">Interactive learning experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link
              href="/modules"
              className="inline-block text-black px-12 py-5 font-bold text-lg rounded-2xl transition-all duration-150"
              style={{
                backgroundColor: '#FFDE21',
                boxShadow: '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)',
                transform: 'perspective(300px) rotateX(5deg)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFE84D';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(4px)';
                e.currentTarget.style.boxShadow = '0 2px 0 #E5C71D, 0 4px 12px rgba(0,0,0,0.3)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(300px) rotateX(5deg) translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 0 #E5C71D, 0 8px 12px rgba(0,0,0,0.3)';
                e.currentTarget.style.backgroundColor = '#FFDE21';
              }}
            >
              <span className="flex items-center gap-3">
                Explore All Courses
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

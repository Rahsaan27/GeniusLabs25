'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import logo from '@/assets/Genius-Lab-Logo-Main-Green-600.png'

export default function Navigation() {
  const pathname = usePathname()
  const { isAuthenticated, user } = useAuth()

  const authenticatedNavItems = [
    { href: '/', label: 'Home' },
    { href: '/modules', label: 'Modules' },
    { href: '/cohort', label: 'Cohort' },
    { href: '/profile', label: 'Profile' },
  ]

  const unauthenticatedNavItems = [
    { href: '/', label: 'Home' },
    { href: '/modules', label: 'Modules' },
    { href: '/cohort', label: 'Cohort' },
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Sign Up' },
  ]

  const navItems = isAuthenticated ? authenticatedNavItems : unauthenticatedNavItems

  return (
    <nav className="bg-black/95 backdrop-blur-md shadow-2xl border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-all duration-300 group">
              <div className="relative">
                <Image
                  src={logo}
                  alt="GeniusLabs Logo"
                  width={56}
                  height={56}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative overflow-hidden group ${
                  pathname === item.href
                    ? 'text-black bg-green-400 shadow-lg shadow-green-400/25'
                    : 'text-white hover:text-green-400 hover:bg-green-400/10'
                }`}
              >
                <span className="relative z-10">
                  {item.label}
                </span>
                {pathname !== item.href && (
                  <div className="absolute inset-0 bg-green-400/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                )}
              </Link>
            ))}
            
            {/* User Avatar for Authenticated Users */}
            {isAuthenticated && user && (
              <div className="ml-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-black font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
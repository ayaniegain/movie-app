import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      {/* Sticky Top Header Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-center px-4 mx-auto max-w-7xl h-16">
          
          {/* Main Logo Link */}
          <Link 
            to="/" 
            className="text-xl font-bold tracking-tight text-indigo-600 flex items-center gap-2 hover:opacity-90 transition"
          >
            <span>📺</span> 
            <span className="bg-gradient-to-r innovators from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              TVMaze Stream
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="flex gap-6 font-medium text-sm">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1.5" 
                  : "text-gray-600 hover:text-indigo-600 py-1.5 transition duration-200"
              }
            >
              Home
            </NavLink>
            
            <NavLink 
              to="/search" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 py-1.5" 
                  : "text-gray-600 hover:text-indigo-600 py-1.5 transition duration-200"
              }
            >
              Search Finder
            </NavLink>
          </nav>

        </div>
      </header>

      {/* Main Core App Area Dashboard Rendering child pages */}
      <main className="flex-1 px-4 py-8 mx-auto w-full max-w-7xl animate-fadeIn">
        {children}
      </main>

      {/* Bottom Footer Details Summary */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} TVMaze Stream Engine. All rights reserved.</p>
          <p>
            Powered by the free{' '}
            <a 
              href="https://tvmaze.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-indigo-600 hover:underline font-medium"
            >
              TVmaze API
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

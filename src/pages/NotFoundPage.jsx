import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4 animate-bounce">🔍</div>
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">404 - Profile Missing</h1>
      <p className="text-gray-500 max-w-md mb-8">
        The requested show configuration, episodic matrix element, or directory pathway does not exist.
      </p>
      <Link to="/" className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 font-semibold text-white shadow-sm hover:bg-indigo-500 transition">
        Return Home Grid
      </Link>
    </div>
  );
}

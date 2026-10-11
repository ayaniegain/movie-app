import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowCard({ id, name, image, rating, genres }) {
  const fallbackImage = 'https://placeholder.com';

  return (
    <Link to={`/show/${id}`} className="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition duration-300">
      <div className="aspect-[2/3] overflow-hidden bg-gray-100 relative">
        <img 
          src={image?.medium || fallbackImage} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
        {rating?.average && (
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-yellow-400 text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1">
            ⭐ {rating.average}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1 group-hover:text-indigo-600 transition">
            {name}
          </h3>
          {genres && genres.length > 0 && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
              {genres.join(' • ')}
            </p>
          )}
        </div>
        <div className="mt-3 text-sm font-semibold text-indigo-600 group-hover:underline flex items-center gap-1">
          View Details →
        </div>
      </div>
    </Link>
  );
}

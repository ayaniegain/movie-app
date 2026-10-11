import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchShows } from '../features/tvSlice';
import ShowCard from '../components/ShowCard';

export default function SearchPage() {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading } = useSelector((state) => state.tv);

  useEffect(() => {
    if (term.trim().length < 2) return;

    // Simple built-in debounce strategy to prevent hitting the API on every single keystroke
    const delayDebounce = setTimeout(() => {
      dispatch(searchShows(term));
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [term, dispatch]);

  return (
    <div>
      <div className="max-w-xl mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Search Directory</h1>
        <p className="text-gray-500 mt-1">Query titles dynamically across global indexing servers.</p>
        
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Type search terms (e.g. Friends)..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full h-12 pl-4 pr-10 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition text-base outline-none shadow-sm"
          />
          {loading.search && (
            <div className="absolute right-3 top-3.5 w-5 h-5 rounded-full border-2 border-indigo-200 border-t-indigo-600 animate-spin"></div>
          )}
        </div>
      </div>

      {!loading.search && term.trim().length >= 2 && searchResults.length === 0 && (
        <div className="text-gray-500 py-12 text-center bg-white border border-gray-200 rounded-2xl">
          No configurations match your query parameters.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {searchResults.map(({ show }) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  );
}

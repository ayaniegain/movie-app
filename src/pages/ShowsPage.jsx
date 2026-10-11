import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowsByPage } from '../features/tvSlice';
import ShowCard from '../components/ShowCard';
import Spinner from '../components/Spinner';

export default function ShowsPage() {
  const dispatch = useDispatch();
  const { shows, loading, errors } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(fetchShowsByPage(0)); // Standard structural entry page 0
  }, [dispatch]);

  if (loading.shows) return <Spinner />;
  if (errors.shows) return <div className="text-center text-red-500 py-12 font-medium">Error: {errors.shows}</div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Discover Programs</h1>
        <p className="text-gray-500 mt-1">Explore top-rated television programming networks natively.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {shows.map((show) => (
          <ShowCard key={show.id} {...show} />
        ))}
      </div>
    </div>
  );
}

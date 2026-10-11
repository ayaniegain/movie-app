import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowById, clearCurrentShow } from '../features/tvSlice';
import Spinner from '../components/Spinner';
import EpisodeList from '../components/EpisodeList';

export default function ShowDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentShow: show, loading, errors } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(fetchShowById(id));
    return () => { dispatch(clearCurrentShow()); };
  }, [dispatch, id]);

  // Route to the explicit 404 page if a target show fetch fails
  useEffect(() => {
    if (errors.currentShow) {
      navigate('/not-found', { replace: true });
    }
  }, [errors.currentShow, navigate]);

  if (loading.currentShow) return <Spinner />;
  if (!show) return null;

  return (
    <div className="animate-fadeIn">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition mb-6">
        ← Back to Matrix Grid
      </Link>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 max-w-[240px] self-center md:self-start rounded-2xl overflow-hidden shadow-md bg-gray-100 aspect-[2/3]">
          <img 
            src={show.image?.original || show.image?.medium || 'https://placeholder.com'} 
            alt={show.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{show.name}</h1>
            {show.rating?.average && (
              <span className="bg-amber-50 text-amber-700 border border-amber-200 text-sm font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                ⭐ {show.rating.average}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 my-3">
            {show.genres?.map(genre => (
              <span key={genre} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">
                {genre}
              </span>
            ))}
          </div>

          <div 
            className="text-gray-600 leading-relaxed space-y-4 border-t border-gray-100 pt-4 prose prose-indigo max-w-none"
            dangerouslySetInnerHTML={{ __html: show.summary || '<p>No structured abstract details available.</p>' }}
          />

          <div className="grid grid-cols-2 gap-4 mt-6 text-sm border-t border-gray-100 pt-4 text-gray-600">
            <div><span className="font-semibold text-gray-900">Language:</span> {show.language}</div>
            <div><span className="font-semibold text-gray-900">Status:</span> {show.status}</div>
            <div><span className="font-semibold text-gray-900">Premiered:</span> {show.premiered || 'N/A'}</div>
            <div><span className="font-semibold text-gray-900">Network:</span> {show.network?.name || 'N/A'}</div>
          </div>
        </div>
      </div>

      <EpisodeList showId={id} />
    </div>
  );
}

import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodeById, clearCurrentEpisode } from '../features/tvSlice';
import Spinner from '../components/Spinner';

export default function EpisodeDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentEpisode: episode, loading, errors } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(fetchEpisodeById(id));
    return () => { dispatch(clearCurrentEpisode()); };
  }, [dispatch, id]);

  // Handles dynamic routing adjustments if data extraction nodes throw errors
  useEffect(() => {
    if (errors.currentEpisode) {
      navigate('/not-found', { replace: true });
    }
  }, [errors.currentEpisode, navigate]);

  if (loading.currentEpisode) return <Spinner />;
  if (!episode) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-indigo-600 transition mb-6">
        ← Back to Show Detail
      </button>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="aspect-video w-full bg-gray-100 relative">
          <img 
            src={episode.image?.original || episode.image?.medium || 'https://placeholder.com'} 
            alt={episode.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl text-white font-mono text-xs">
            Season {episode.season}, Episode {episode.number}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{episode.name}</h1>
          
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-6 border-b border-gray-100 pb-4">
            <div>Airdate: <span className="text-gray-900">{episode.airdate || 'N/A'}</span></div>
            <div>Runtime: <span className="text-gray-900">{episode.runtime ? `${episode.runtime} mins` : 'N/A'}</span></div>
            {episode.rating?.average && <div>Rating: <span className="text-amber-500">⭐ {episode.rating.average}</span></div>}
          </div>

          <div 
            className="text-gray-600 leading-relaxed prose max-w-none"
            dangerouslySetInnerHTML={{ __html: episode.summary || '<p>No episode abstract script provided.</p>' }}
          />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShowEpisodes } from '../features/tvSlice';
import Spinner from './Spinner';

export default function EpisodeList({ showId }) {
  const dispatch = useDispatch();
  const { episodes, loading, errors } = useSelector((state) => state.tv);

  useEffect(() => {
    if (showId) {
      dispatch(fetchShowEpisodes(showId));
    }
  }, [dispatch, showId]);

  if (loading.episodes) return <Spinner />;
  if (errors.episodes) return <p className="text-red-500 text-sm">Could not populate episode indexes.</p>;
  if (!episodes || episodes.length === 0) return <p className="text-gray-500 text-sm">No episodic records cataloged.</p>;

  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📺 Episode Guide ({episodes.length})</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-gray-500 uppercase font-semibold text-xs tracking-wider">
              <th className="py-3 px-4">Code</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 hidden sm:table-cell">Air Date</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {episodes.map((ep) => (
              <tr key={ep.id} className="hover:bg-gray-50/70 transition">
                <td className="py-3 px-4 font-mono font-medium text-gray-600">
                  S{String(ep.season).padStart(2, '0')}E{String(ep.number).padStart(2, '0')}
                </td>
                <td className="py-3 px-4 font-semibold text-gray-900">{ep.name}</td>
                <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{ep.airdate || 'N/A'}</td>
                <td className="py-3 px-4 text-right">
                  <Link to={`/episode/${ep.id}`} className="inline-flex text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg transition">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ShowsPage from './pages/ShowsPage';
import ShowDetailsPage from './pages/ShowDetailsPage';
import EpisodeDetailsPage from './pages/EpisodeDetailsPage';
import SearchPage from './pages/SearchPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<ShowsPage />} />
          <Route path="/show/:id" element={<ShowDetailsPage />} />
          <Route path="/episode/:id" element={<EpisodeDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* Custom Not Found Interceptors */}
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

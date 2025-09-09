import { Suspense, lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BrushProvider } from './brush/BrushProvider'
import Header from './components/marketplace/Header'
import ProtectedRoute from './components/ProtectedRoute'
import { trackPageview } from '@/services/analytics'
import { addResourceHints, measureWebVitals } from '@/services/performance'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./routes/marketplace/HomePage'))
const DiscoverPage = lazy(() => import('./components/marketplace/DiscoverPage'))
const SearchResultsPage = lazy(() => import('./routes/marketplace/SearchResultsPage'))
const ArtistPage = lazy(() => import('./routes/Artist'))
const ArtistsPage = lazy(() => import('./routes/Artists'))
const ArtworkPage = lazy(() => import('./routes/Artwork'))
// const SearchPage = lazy(() => import('./routes/Search'))
const ComparePage = lazy(() => import('./routes/marketplace/ComparePage'))
const SellPage = lazy(() => import('./routes/Sell'))
const DashboardPage = lazy(() => import('./routes/Dashboard'))
const AuthPage = lazy(() => import('./routes/Auth'))
const MyArtworksPage = lazy(() => import('./routes/MyArtworks'))
const AuthCallbackPage = lazy(() => import('./routes/AuthCallback'))
const OnboardingPage = lazy(() => import('./routes/Onboarding'))
const SalesPage = lazy(() => import('./routes/Sales'))
const ArtistSettingsPage = lazy(() => import('./routes/ArtistSettings'))
const CollectorQuizPage = lazy(() => import('./routes/CollectorQuiz'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageview(location.pathname + location.search)
  }, [location])

  useEffect(() => {
    // Add resource hints for performance
    addResourceHints()
    
    // Measure web vitals
    measureWebVitals()
  }, [])

  return (
    <BrushProvider>
      <Helmet>
        <title>ArtFlow - Discover, Buy, and Sell Art</title>
        <meta name="description" content="Discover and collect art from artists around the world. A modern art marketplace platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="/" />
        <link rel="preconnect" href="https://api.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Helmet>
      
      <Header />
      
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: 'var(--space-lg)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ color: 'var(--muted)', fontSize: '16px' }}>Loading...</p>
          </div>
        }>
          <Routes>
                        {/* Marketplace Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/discover" element={<DiscoverPage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
            
            {/* Artist Routes */}
            <Route path="/artist/:slug" element={<ArtistPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            
            {/* Artwork Routes */}
            <Route path="/artwork/:id" element={<ArtworkPage />} />
            
            {/* Compare */}
            <Route path="/compare" element={<ComparePage />} />
            
            {/* User Routes */}
            <Route path="/sell" element={<SellPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            
            {/* Protected Routes */}
            <Route path="/onboarding" element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/my-artworks" element={
              <ProtectedRoute>
                <MyArtworksPage />
              </ProtectedRoute>
            } />
            <Route path="/u/sales" element={
              <ProtectedRoute>
                <SalesPage />
              </ProtectedRoute>
            } />
            <Route path="/u/settings/artist" element={
              <ProtectedRoute>
                <ArtistSettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/u/collector/quiz" element={
              <ProtectedRoute>
                <CollectorQuizPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>
    </BrushProvider>
  )
}

import {  Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import css from './App.module.css'


const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MoviesDetailsPage = lazy(() => import('./pages/MoviesDetailsPage/MoviesDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
const Navigation = lazy(()=> import('./components/Navigation/Navigation'))

function App() {
  return (
    <div className={css.container}>
      <Navigation/>
      <Suspense fallback="loading..." >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MoviesDetailsPage />}>
           <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
          </Route>
        <Route path="*" element={<NotFoundPage/> } />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App

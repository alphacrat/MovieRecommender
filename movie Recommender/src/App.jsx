import React from 'react'
import { useState, useEffect } from 'react'
import { useDebounce } from 'react-use';

import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [trendingMovieList, setTrendingMovieList] = useState([])
  const [isloading, setIsLoading] = useState(false)
  const [debounceSearch, setDebounceSearch] = useState('')

  useDebounce(() => setDebounceSearch(searchTerm), 500, [searchTerm])

  const getImageUrl = (path, size = 'w500') => {
    if (!path) return './No-Poster.png'
    return `${IMAGE_BASE_URL}/${size}${path}`
  }

  const fetchTrendingMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const response = await fetch(`${API_BASE_URL}/trending/movie/week?language=en-US`, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json();
      const processedMovies = data.results.slice(0, 6).map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: getImageUrl(movie.poster_path),
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview
      }));
      setTrendingMovieList(processedMovies)
    } catch (error) {
      console.error('Error fetching trending movies:', error)
      setErrorMessage("Failed to fetch trending movies")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMovies = async (query) => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1&include_adult=false`
        : `${API_BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json();
      const processedMovies = data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        poster_path: getImageUrl(movie.poster_path),
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        overview: movie.overview
      }));
      setMovieList(processedMovies)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMessage("Failed to fetch movies")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies(debounceSearch)
  }, [debounceSearch])

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

  return (
    <main>
      <img src="./hero-bg.png" alt="Hero BG" className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>movies</span> you'll enjoy hasslefree!!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='trending'>
          <h2 className='mt-4'>Trending Movies</h2>
          {isloading ? (
            <div className='loading'><Spinner /></div>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {trendingMovieList.map((movie, index) => (
                <li key={movie.id} >
                  <p>
                    {index + 1}
                  </p>

                  <img
                    src={movie.poster_path}
                    alt={movie.title}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
        <section className='all-movies'>
          <h2 className='mt-4'>Popular Movies</h2>
          {isloading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
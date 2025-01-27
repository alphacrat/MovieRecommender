import React from 'react'
import Search from './components/Search'
import { useState, useEffect } from 'react'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isloading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`error in fetching the data`)
      }
      const data = await response.json();
      if (data.Response === 'False') {
        setErrorMessage('No movies found' || data.Error)
        setMovieList([])
        return
      }
      setMovieList(data.results || [])
    } catch (error) {
      console.log(error)
      setErrorMessage("error in the fetching of the api")
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <main>
      <img src="./hero-bg.png" alt="Hero BG" className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient' >movies</span> you'll enjoy hasslefree!!
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isloading ? (
            <p className='text-white'>Loading....</p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => {
                return (
                  <p className='text-white'>{movie.title}</p>
                )
              })}
            </ul>
          )
          }

        </section>
      </div>
    </main>)
}

export default App 
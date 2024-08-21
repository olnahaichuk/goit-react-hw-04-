import axios from "axios";
import { useState } from "react";
import { API_URL, API_KEY } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import css from './MoviesPage.module.css'


const MoviesPage = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (query.trim() === '') {
            setError('Please enter a movie name');
            return;
        }
        setIsLoading(true);
        setError(null);
        setMovies([]);
        try {
            const response = await axios.get(`${API_URL}/search/movie`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            },
            params:{
                query,
                include_adult: false,
                language: 'en-US',
                page:1 ,
            }
        })
            setMovies(response.data.results);
        } catch(err) {
            console.log(err.message);
            
        } finally {
            setIsLoading(false);
    }
}
  return (
    <div className={css.searchContainer}>
          <input value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search a movie..."
              className={css.input} />
          <button onClick={handleSearch}
          className={css.searchBtn}>Search</button>
          {isLoading && <Loader/>}
          {error && <p className={css.error}>{error}</p>}
          <MovieList movies={movies}/>
    </div>
  )
}

export default MoviesPage

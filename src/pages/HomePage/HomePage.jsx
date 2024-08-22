import axios from "axios"
import MovieList from "../../components/MovieList/MovieList"
import { useEffect, useState } from "react"
import { API_URL, API_KEY } from "../../api";
import css from './HomePage.module.css'



const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchMovies() {
            try {
             const response = await axios.get(`${API_URL}/trending/movie/day`, {
                headers: {
                     Authorization: `Bearer ${API_KEY}`
                 }
                 
            });
            setMovies(response.data.results)
            
            } catch(err){
                setError(err.message); 
                console.log(err.message);
                
        } 
            }
            
        fetchMovies();
    }, [])
   
   
    
  return (
      <div>
          <h1 className={css.trendingTitle}>Trending Movies</h1>
          {error && <p>{error}</p>}
          <MovieList movies={movies}/>
    </div>
  )
}

export default HomePage

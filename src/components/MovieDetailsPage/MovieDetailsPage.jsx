import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from '../../api';
import Loader from '../Loader/Loader';
import css from './MovieDetailsPage.module.css'


const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const goBackBtn = useRef(location.state?.from ?? "/movies");
    console.log("Location from details:" , location);
    
    
    
    useEffect(() => {
        async function fetchMovieDetails() {
           try {
           const response = await axios.get(`${API_URL}/movie/${movieId}`, {
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            })
            setMovie(response.data)
        } catch (err) {
            console.log(err.message);
            
        } 
        }
        
        fetchMovieDetails();
    }, [movieId]);
if (!movie) {
        return <Loader />;
    }
  return (
      <div className={css.container}>
          <Link to={goBackBtn.current}
              className={css.btnGoBack}>⬅ Go back</Link>
    <div className={css.containerMovie}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={css.poster } />
          <div>
              <h1 className={css.movieTitle}>{movie.title}</h1>
         
          <p>{movie.overview}</p>
          </div>
          </div>
          <p className={css.infoName}>Additional Information</p>
          <ul className={css.listInfo}>
              <li className={css.listElem}>
                  <Link to="cast" state={{ from: location.state?.from }}>Cast</Link> 
              </li>
              <li className={css.listElem}>
                  <Link to="reviews" state={{ from: location.state?.from }} >Reviews</Link>
              </li>
             
          </ul>
              <Outlet />
           
    </div>
  )
}

export default MovieDetailsPage

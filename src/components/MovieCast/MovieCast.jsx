import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, API_URL } from '../../api';
import css from './MovieCast.module.css'
 
const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        async function fetchFilmCredits() {
            try {
                const response = await axios.get(`${API_URL}/movie/${movieId}/credits`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                })
                setCast(response.data.cast)
            } catch (err) {
                console.log(err.message);
                
            }
           
        }
        fetchFilmCredits();
    }, [movieId]);

   return (
     <div>
           <h2 className={css.castTitle}>Cast</h2>
           {cast.length > 0 ? (
               <ul className={css.castList}>
                   {cast.map(actor => (
                       <li key={actor.id} className={css.listElem}>
                           <p>{actor.name} as {actor.character}</p>
                       </li>
                   ))}
               </ul>
           ) : 
           <p>No cast information available.</p>}
     </div>
   )
 }
 
 export default MovieCast
 
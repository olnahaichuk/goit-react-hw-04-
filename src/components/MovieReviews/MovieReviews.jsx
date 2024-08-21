import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, API_URL } from '../../api';
import css from './MovieReviews.module.css'
const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect( () => {
        async function fetchMovieReviews() {
            try {
                const response = await axios.get(`${API_URL}/movie/${movieId}/reviews`, {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`
                    }
                }) 
                setReviews(response.data.results)
            } catch (err){
                console.log(err.message);
                
            }
           
        }
        fetchMovieReviews();
    },[movieId])
  return (
    <div>
          <ul className={css.reviewsList}>
              {reviews.length > 0 ?
                  (reviews.map(review => (
                  <li key={review.id}
                  className={css.reviewsElem}>
                      <h1 className={css.reviewAuthor}>{review.author}</h1>
                      <p className={css.reviewContent}>{ review.content}</p>
                </li>  
              ))) : <p>No reviews availible.</p>
              }
              
          </ul> 
    </div>
  )
}

export default MovieReviews

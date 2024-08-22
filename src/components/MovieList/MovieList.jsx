import { Link, useLocation } from "react-router-dom";
import css from './MovieList.module.css'

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
      <ul className={css.list}>
      {Array.isArray(movies) &&
        movies.map(movie => (
              <li key={movie.id} className={css.filmWrapper}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}
                className={css.filmName}>
                  {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={300}
                alt={movie.title}
                className={css.image}
              />
            ) : (
              <div className={css.placeholder}>No Image Available</div>
            )}
                <p className={css.movieTitle}>{movie.title}</p>
              </Link>
              </li>
          ))}
    </ul>
  )
}

export default MovieList

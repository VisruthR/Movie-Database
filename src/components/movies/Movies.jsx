import "./Movies.css";

function Movie({ movie, openPopup }) {
  return (
    <div className="movie" onClick={() => openPopup(movie.imdbID)}>
      <img src={movie.Poster} alt={movie.Title} />
      <h3>{movie.Title}</h3>
    </div>
  );
}

function Movies({ movies, openPopup }) {
  return (
    <section className="movies">
      {movies.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} openPopup={openPopup} />
      ))}
    </section>
  );
}

export default Movies;

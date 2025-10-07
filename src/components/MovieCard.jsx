import { React, useState} from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import "../css/MovieCard.css"

function MovieCard({movie}) {
    const {isFavourite, addToFavourites, removeFromFavourites} = useMovieContext()
    const favourite = isFavourite(movie.imdbID)

    function onFavouriteClick(e){
        e.preventDefault()
        favourite ? removeFromFavourites(movie.imdbID) : addToFavourites(movie)
    }

    return (
        <div className='movie-card'>
            <div className='movie-poster'>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x445'} alt={movie.Title}></img>
                <div className='movie-overlay'>
                    <button className={`favourite-btn ${favourite ? "active" : ""}`} onClick={onFavouriteClick}>♥</button>
                </div>
            </div>
            <div className='movie-info'>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    )
}

export default MovieCard;
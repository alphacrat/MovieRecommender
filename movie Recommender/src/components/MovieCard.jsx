import React from 'react'

const MovieCard = (props) => {
    const { movie:
        { title, vote_average, poster_path, release_date, overview, original_language } } = props
    return (
        <div className="movie-card">
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './No-Poster.png'} alt="Movie Image" />
            <div className="mt-4">
                <h3>{title}</h3>
                <div className='content'>
                    <div className='rating'>
                        <img src="./Rating.svg" alt="star" />
                        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
                    </div>
                    <span>•</span>
                    <p className="year"> {release_date ? release_date.slice(0, 4) : 'N/A'}</p>
                    <span>•</span>
                    <p className="lang"> {original_language ? original_language : 'N/A'}</p>

                </div>
            </div>
        </div>
    )
}

export default MovieCard
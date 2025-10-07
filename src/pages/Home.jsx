import { useState, useEffect } from "react"
import { searchMovies } from "../services/api"

import MovieCard from "../components/MovieCard"
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const allMovies = await searchMovies('movie') //omdb requires search to display movies
                setMovies(allMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            } finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResult = await searchMovies(searchQuery)
            setMovies(searchResult)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Failed to load movies...")
        } finally {
            setLoading(false)
        }
        setSearchQuery("")
    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input 
            type="text" 
            placeholder="Search for Movies" 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-btn" onClick={() => searchMovies(searchQuery)}>Search</button>
        </form>
        {
            movies?.length > 0 ? (
                <div className="movies-grid">
                    {movies.map((movie) =>
                        
                        (<MovieCard movie={movie}/>)
                    )}
                </div>
            ) : (
                <div className="movies-empty">
                    <h2>No movies found.</h2>
                </div>
            )
        }
        
    </div>
}

export default Home;
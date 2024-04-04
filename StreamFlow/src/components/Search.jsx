import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Search.css";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('users');
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://streamflow-backend.onrender.com/search/${searchType}`, { searchTerm });
            if (searchType === 'users') {
                setSearchResults(response.data.streamers);
            } else {
                setSearchResults(response.data.streams);
            }
            setHasSearched(true);
        } catch (error) {
            console.error("Error fetching search results:", error);
            setHasSearched(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search users or streams..."
                    className="search-input"
                />
                <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className="search-select">
                    <option value="users">Users</option>
                    <option value="streams">Streams</option>
                </select>
                <button type="submit" className="search-button">Search</button>
            </form>
            {hasSearched && (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index} className="result-item">
                                    {searchType === 'users' ? (
                                        <>
                                            <img src={result.avatar} alt="Avatar" style={{ width: 50, borderRadius: '50%' }} />
                                            <span>{result.username}</span>
                                            <Link to={`/user/${result._id}`} className="view-user-btn">View User</Link>
                                        </>
                                    ) : (
                                        <>
                                            <h4>{result.streamTitle}</h4>
                                            <p>{result.streamDescription}</p>
                                            <Link to={`/stream/${result._id}`} className="watch-stream-btn">Watch Stream</Link>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchComponent;


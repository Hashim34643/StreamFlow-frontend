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
        <div className="live-streams-container">
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
                <div>
                    <h1 className="live-streams-title">{searchResults.length > 0 ? 'Search Results' : 'No Results Found'}</h1>
                    <div className="stream-grid">
                        {searchResults.map((result, index) => (
                            <div key={index} className="stream-card">
                                <div className="streamer-info-container">
                                    <img src={result.avatar || result.streamThumbnail} alt="Avatar" className="streamer-avatar" />
                                    <span className="streamer-username">{result.username || result.streamTitle}</span>
                                </div>
                                {searchType === 'streams' && (
                                    <div className="stream-info">
                                        <p className="stream-description">{result.streamDescription}</p>
                                        <Link to={`/stream/${result._id}`} className="watch-stream-link">Watch Stream</Link>
                                    </div>
                                )}
                                {searchType === 'users' && (
                                    <Link to={`/user/${result._id}`} className="watch-stream-link">View User</Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/Search.css";

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('users');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://streamflow-backend.onrender.com/search/${searchType}`, { searchTerm });
            console.log(response.data)
            navigate(`/search-results?searchType=${searchType}`, { state: { searchResults: response.data, hasSearched: true } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
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
    );
};

export default SearchComponent;



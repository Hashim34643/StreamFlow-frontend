import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('users');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://streamflow-backend.onrender.com/search/${searchType}`, { searchTerm });
            navigate(`/search-results/${searchType}`, { state: { results: response.data } });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users or streams..."
            />
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="users">Users</option>
                <option value="streams">Streams</option>
            </select>
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchComponent;

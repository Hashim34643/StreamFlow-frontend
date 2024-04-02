import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = ({ searchType, searchResults, hasSearched }) => {
    if (!hasSearched) {
        return null;
    }

    return (
        <div className="search-results">
            <h2>Results</h2>
            {searchResults?.length > 0 ? (
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
    );
};

export default SearchResults;


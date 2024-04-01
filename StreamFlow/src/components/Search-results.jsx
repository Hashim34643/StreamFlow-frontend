import React from 'react';

const SearchResults = ({ searchType, searchResults }) => {
    return (
        <div className="search-results">
            <h2>Results</h2>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            {searchType === 'users' ? (
                                <>
                                    <img src={result.avatar} alt="Avatar" style={{ width: 50, borderRadius: '50%' }} />
                                    <span>{result.username}</span>
                                </>
                            ) : (
                                <>
                                    <h4>{result.streamTitle}</h4>
                                    <p>{result.streamDescription}</p>
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

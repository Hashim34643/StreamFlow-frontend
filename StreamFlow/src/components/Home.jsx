import React, { useState } from 'react';
import Header from './Header';
import SearchComponent from './Search';
import StartStream from './Start-stream';

const Home = () => {
  const [showStartStream, setShowStartStream] = useState(false);

  return (
    <div>
      <Header />
      <SearchComponent />
      <button onClick={() => setShowStartStream(true)} style={{margin: "20px", padding: "10px"}}>
        Start Streaming
      </button>
      {showStartStream && <StartStream />}
    </div>
  );
};

export default Home;


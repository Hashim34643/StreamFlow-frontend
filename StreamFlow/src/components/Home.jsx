import React from 'react';
import Header from './Header';
import SearchComponent from './Search';
import StartStream from './Start-stream';

const Home = () => {
  return (
    <div>
      <Header />
      <SearchComponent />
      <StartStream />
    </div>
  );
};

export default Home;

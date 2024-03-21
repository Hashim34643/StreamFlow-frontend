import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from "./components/Sign-up";
import Home from "./components/Home";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

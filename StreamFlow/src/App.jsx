import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './Sign-up'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

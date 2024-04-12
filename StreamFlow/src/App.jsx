import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from "./components/Sign-up";
import Home from "./components/Home";
import LoginForm from "./components/Login";
import ForgotPassword from './components/Forgot-password';
import ResetPassword from './components/Reset-password';
import Profile from "./components/Profile";
import EditProfile from './components/Edit-profile';
import CategoriesPage from './components/Categories';
import LiveStreamsPage from './components/Live';
import ViewProfile from './components/View-profile';
import ManageStream from './components/manage-stream';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/live" element={<LiveStreamsPage />} />
          <Route path="/live/:category" element={<LiveStreamsPage />} />
          <Route path="/:userId/user-profile/:streamerId" element={<ViewProfile />} />
          <Route path="/manage-stream" element={<ManageStream />} />
        </Routes>
      </Router>
    </>
  )
}

export default App

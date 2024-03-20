import { Link } from 'react-router-dom';
import "../styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">StreamFlow</Link>
      </div>
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/live">Live</Link></li>
          <li><Link to="/categories">Categories</Link></li>
        </ul>
      </nav>
      <div className="profile">
        <Link to="/profile">Profile</Link>
      </div>
    </header>
  );
};

export default Header;

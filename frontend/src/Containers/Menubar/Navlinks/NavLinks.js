import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/auth-context'
import './NavLinks.css';
import { useHistory } from 'react-router-dom';
const NavLinks = props => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  function onLgout() {
    console.log(history)
    auth.logout()
    history.push('/auth')

  }
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact>Home</NavLink>
    </li>
    {auth.isLoggedIn && (<> 
      <li>
        <NavLink to="/preliminary">Preliminary</NavLink>
      </li>
      <li>
        <NavLink to="/secondary">Secondary</NavLink>
      </li>
      <li>
        <NavLink to="/podcast">Podcast</NavLink>
      </li>
      <li>
        <NavLink to="/exercise">Exercises</NavLink>
      </li>
      </>
    )}

    {!auth.isLoggedIn && (
      <li>
        <NavLink to="/auth">Login/Register</NavLink>
      </li>
    )}

    {auth.isLoggedIn && (
      <li>
        <button onClick={onLgout}>Logout</button>
      </li>
    )}
  </ul>
};

export default NavLinks;
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { Icon } from 'react-icons-kit'
import { alignRight } from 'react-icons-kit/feather/alignRight'
import { x } from 'react-icons-kit/feather/x'

function Navigation() {

  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  }

  return (
    <header>
      <div className={toggle ? 'navbar expanded' : 'navbar'}>
        {auth ? (
          <NavLink className='logo' to="/posts" onClick={handleToggle}>
            <h1>NO.CO</h1>
          </NavLink>
        ) : (
          <NavLink className='logo' to="/" onClick={handleToggle}>
            <h1>NO.CO</h1>
          </NavLink>
        )}
        <nav className='nav'>
          <ul className='nav__links'>
            {auth ? (
              <>
                <li onClick={handleToggle}>
                  <NavLink to="/posts">Explore</NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink to="/people">People</NavLink>
                </li>
                <li className='user' onClick={handleToggle}>
                  <NavLink to="/myprofile"><i class="fa-solid fa-user"></i></NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink onClick={logout} className='cta-btn' to="/login">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li onClick={handleToggle}>
                  <NavLink className='cta-btn' to="/login">Login</NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink className='cta-btn' to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className='toggle-icon' onClick={handleToggle}>
          {toggle ? <Icon icon={x} size={28} /> : <Icon icon={alignRight} size={28} />}
        </div>
      </div>
    </header>
  );
}

export default Navigation;

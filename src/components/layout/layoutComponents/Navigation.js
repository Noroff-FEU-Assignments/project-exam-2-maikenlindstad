import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { Icon } from 'react-icons-kit'
import { alignRight } from 'react-icons-kit/feather/alignRight'
import { x } from 'react-icons-kit/feather/x'
import { useParams } from 'react-router-dom';
import { BiUser } from "react-icons/bi";



function Navigation() {

  const [auth, setAuth] = useContext(AuthContext);



  let userUrl = '/profiles/details/' + auth.name;

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
                  <NavLink to="/posts" exact>Latest</NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink to="/profiles">Contributors</NavLink>
                </li>
                <span>></span>
                <li onClick={handleToggle}>
                  <NavLink to={userUrl}>{auth.name}</NavLink>
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
    </header >
  );
}

export default Navigation;

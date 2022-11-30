import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { Icon } from 'react-icons-kit'
import { alignRight } from 'react-icons-kit/feather/alignRight'
import { x } from 'react-icons-kit/feather/x'
import { useParams } from 'react-router-dom';
import { BiUser } from "react-icons/bi";
import { AiOutlineRight } from "react-icons/ai";

function Navigation() {

  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const userUrl = auth ? '/profiles/details/' + auth.name : "";

  function logout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setAuth(null);
      navigate("/login");
    }
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
                  <NavLink to="/posts" >Latest</NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink to="/profiles">Contributors</NavLink>
                </li>
                <li onClick={handleToggle}>
                  <NavLink to={userUrl} onClick="window.reload()"><AiOutlineRight />{auth.name}</NavLink>
                </li>
                <button onClick={logout} className='cta-btn'>Logout</button>
              </>
            ) : (
              <>
                {/* <li onClick={handleToggle} className="loginSection">
                  <p>Already have an account?</p>
                  <NavLink to="/login">Login instead</NavLink>
                </li> */}
                {/* <li onClick={handleToggle}>
                  <NavLink className='cta-btn' to="/register">Register</NavLink>
                </li> */}
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

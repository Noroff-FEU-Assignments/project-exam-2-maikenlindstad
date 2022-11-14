import { AuthProvider } from '../../context/AuthContext';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';
import Posts from '../posts/Posts';
import Profiles from '../profiles/Profiles';
import ProfileDetail from '../profiles/ProfileDetail';
import Navigation from './layoutComponents/Navigation';



function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/detail/:name" element={<ProfileDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Layout;

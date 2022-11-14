import Navigation from './layoutComponents/Navigation';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Home from '../home/Home';
import Login from '../login/Login';
import Register from '../register/Register';
import Posts from '../posts/Posts';
import ProfileList from '../profiles/ProfileList';


import { AuthProvider } from '../../context/AuthContext';

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
          {/* <Route path="/posts/detail/:id" element={<PostDetails />} /> */}
          <Route path="/profiles" element={<ProfileList />} />
          {/* <Route path="/profiles/detail/:name" element={<ProfileDetails />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Layout;

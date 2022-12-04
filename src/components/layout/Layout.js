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
import Footer from "../layout/layoutComponents/Footer";
import PostDetail from '../posts/PostDetail';
import EditPost from '../posts/postSettings/EditPost';
import EditProfile from '../profiles/profileSettings/EditProfile'

function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" exact element={<Posts />} />
          <Route path="/posts/detail/:id" element={<PostDetail />} />
          <Route path="/posts/edit/:id" element={<EditPost />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/detail/:name" element={<ProfileDetail />} />
          <Route path="/profiles/edit/profile/:name" element={<EditProfile />} />
          <Route path="/profiles/details/:name" element={<ProfileDetail />} />
        </Routes>
        <Footer />

      </Router>
    </AuthProvider >
  );
}

export default Layout;

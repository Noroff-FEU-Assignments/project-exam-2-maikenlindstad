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
import PostDetail from '../posts/PostDetail';
import EditPost from '../posts/postSettings/EditPost';
// import EditComment from '../posts/commentSettings/EditComment';


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
          {/* <Route path="/posts/edit/:id/comment" element={<EditComment />} /> */}
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profiles/detail/:name" element={<ProfileDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default Layout;

import Heading from '../layout/layoutComponents/Heading';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import AddPostForm from '../posts/AddPostForm'
import ScrollToTopBtn from '../common/ScrollToTopBtn';
import { useEffect } from 'react';


export default function Posts() {
  useEffect(() => {
    document.title = "NO.CO | Latest posts";
  }, []);
  return (
    <>
      <div className='wrapContent'>
        <Heading title="Posts" />
        <AddPostForm />
        <p className="center softened">Hint! Send your images to some email adress to get them featured as background images on NO.CO</p>
        <h2 className="center">The Community</h2>
        <PostList />
        <ScrollToTopBtn />
      </div>
    </>
  );
}
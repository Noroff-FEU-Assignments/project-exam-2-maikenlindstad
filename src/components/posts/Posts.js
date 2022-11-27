import Heading from '../layout/layoutComponents/Heading';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import AddPostForm from '../posts/AddPostForm'
import ScrollToTopBtn from '../common/ScrollToTopBtn';


export default function Posts() {
  return (
    <>
      <div className='wrapContent'>
        <Heading title="Posts" />
        <AddPostForm />
        <PostList />
        <ScrollToTopBtn />
      </div>
    </>
  );
}
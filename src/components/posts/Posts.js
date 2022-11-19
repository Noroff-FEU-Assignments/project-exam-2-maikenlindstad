import Heading from '../layout/layoutComponents/Heading';
import PostList from './PostList';
import { Link } from 'react-router-dom';
import AddPostForm from '../posts/AddPostForm'


export default function Posts() {
  return (
    <>
      <Heading title="Posts" />
      <AddPostForm />
      <PostList />
    </>
  );
}
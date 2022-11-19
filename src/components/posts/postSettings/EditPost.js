import Heading from '../../layout/layoutComponents/Heading';
import EditPostForm from './EditPostForm';
import { Link } from 'react-router-dom';


export default function EditPosts() {
  return (
    <>
      <Link to={`../posts`}>
        <p>Back</p>
      </Link>
      <Heading title="Edit post" />
      <EditPostForm />
    </>
  );
}
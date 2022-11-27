import Heading from '../../layout/layoutComponents/Heading';
import EditPostForm from './EditPostForm';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from "react-icons/ai";


export default function EditPosts() {
  return (
    <div className='editWrapper'>
      <Link to={`../posts`} className="breadcrumbContainer">
        <p class="breadcrumb" ><AiOutlineClose /></p>
      </Link>
      <div className='postCard editPostcard'>

        <div className="postCard-head">
          <div className="avatar-section">
          </div>
          <div className="userInfo-section">
            <Heading title="Edit post" />
          </div>
        </div>
        <div className='postCard-body'>
          <EditPostForm />
        </div>
      </div>
    </div>
  );
}
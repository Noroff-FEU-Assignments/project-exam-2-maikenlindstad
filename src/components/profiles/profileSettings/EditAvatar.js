import Heading from '../../layout/layoutComponents/Heading';
import { Link } from 'react-router-dom';
import EditAvatarForm from './EditAvatarForm'


export default function EditComment() {
  return (
    <>
      <Link to={`/profiles/detail/maikenlindstad`}>
        <p>Back</p>
      </Link>
      <Heading title="Edit avatar" />
      <EditAvatarForm />
    </>
  );
}
import Heading from '../../layout/layoutComponents/Heading';
import EditBannerForm from './EditBannerForm'
import EditAvatarForm from './EditAvatarForm'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';

export default function EditComment() {
  const navigation = useNavigate();
  const [auth] = useContext(AuthContext);

  return (
    <>
      <div className='profile'>
        <div className="profileBanner editing" style={{ backgroundImage: `url(${auth.banner})` }}>
        </div>
        <div className='profileDataSection'>
          <EditBannerForm />
          <div className="breadcrumb" onClick={() => navigation(-1)}>
            <p>Go back</p>
          </div>
        </div>
        <div className='profileWrapper'>
          <div className='profilePictureSection'>
            <div className='profilePictureInfo editing'>
              <Heading title="Copying new url... Editing avatar..." />
            </div>
            <EditAvatarForm />
            <div className="breadcrumb" onClick={() => navigation(-1)}>
              <p>Go back</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
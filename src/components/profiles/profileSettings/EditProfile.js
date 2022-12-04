import EditBannerForm from './EditBannerForm'
import EditAvatarForm from './EditAvatarForm'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { useContext } from 'react';
import { RiArrowLeftSFill } from "react-icons/ri";


export default function EditProfile() {
  const navigation = useNavigate();
  const [auth,] = useContext(AuthContext);

  return (
    <>
      <div className='profile'>
        <div className="profileBanner editing" style={{ backgroundImage: `url(${auth.banner})` }}>
        </div>
        <div className='profileDataSection'>
          <EditBannerForm />
          <div className="breadcrumb" onClick={() => navigation(-1)}>
            <RiArrowLeftSFill />
            <p>Go back</p>
          </div>
        </div>
        <div className='profileWrapper'>
          <div className='profilePictureSection'>
            <div className='profilePictureInfo editing' style={{ backgroundImage: `url(${auth.avatar})` }}>
            </div>
            <EditAvatarForm />
          </div>
        </div>
      </div>
    </>
  );
}
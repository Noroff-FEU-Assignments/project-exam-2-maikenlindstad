import PropTypes from "prop-types";
import Heading from '../../layout/layoutComponents/Heading';
import { Link } from 'react-router-dom';
import EditBannerForm from './EditBannerForm'
import EditAvatarForm from './EditAvatarForm'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';




export default function EditComment() {
  const navigation = useNavigate();
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <div className='profile'>
        <div className="profileBanner editing">
          <Heading title="Copying new url... Editing banner..." />
        </div>
        <div className='profileDataSection'>
          <EditBannerForm />
          <div className="breadcrumb" onClick={() => navigation(-1)}>
            <p>Go back</p>
          </div>
        </div>
        <div className='profileWrapper'>
          <div className='profilePictureSection'>
            <div className='profilePictureInfo editing' style={{ backgroundImage: `url(${auth.avatar})` }}>
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
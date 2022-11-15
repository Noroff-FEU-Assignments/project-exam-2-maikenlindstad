import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API, PROFILE_PATH, SINGLE_PROFILE_PATH } from "../../constants/api";
// import useAxios from "../../hooks/useAxios";


function ProfileDetail() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const navigation = useNavigate();

  const { name } = useParams();
  // const http = useAxios();


  if (!name) {
    navigation("/profiles");
  }

  const url = API + SINGLE_PROFILE_PATH + "/" + name;

  useEffect(() => {
    async function fetchProfiles() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProfile(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
        // console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfiles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <div className="profile">
      <div className="profileBanner" style={{ backgroundImage: `url(${profile.banner})` }}>
      </div>
      <div className="profileDataSection">
        <div className="profileData">
          <div>
            <a href="/posts"><i class="fa-solid fa-chevron-left"></i></a>
            <span></span>
            {/* <a href="" className="active"><p>{profile.name}</p> </a> */}
          </div>
          <div>
            <h2>{profile.name}</h2>
          </div>
          <div>
            <a className="cta-follow">Follow</a>
            {/* <p className="cta-btn-follow">Follow</p> */}
          </div>
        </div>
      </div>
      <div className="profileWrapper">
        <div className="profilePictureSection">
          <div className="profilePictureInfo" style={{ backgroundImage: `url(${profile.avatar})` }}>
          </div>
          <a style={{ color: `white` }} href="">{profile.email}</a>
        </div>

        <div className="profileContent">
          <div className="additionalProfileInformation">
            <h3>About me</h3>
            <p>Hello! I am a junior frontend developer who is super excited to get to work and start developing
              real projects for real world clients!</p>
            <p> I have already submitted my application and portfolio
              to Facebook, Google, Instagram and Twitter and am just waiting for the call!</p>
            <p>I definitely believe Meta will be in touch. </p>
          </div>
          <div className="profilePosts">
            <h3>Posts</h3>
            <div>
              <p>This is where the posts will be displayed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API, PROFILE_PATH, SINGLE_PROFILE_PATH } from "../../constants/api";
// import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { GoPencil } from "react-icons/go";
import Follow from "./followers/Follow";
import Unfollow from "./followers/Unfollow";
import FollowBtn from "./followers/FollowBtn";
import { RiLogoutBoxRLine, RiArrowRightSFill, RiArrowLeftSFill, RiUser3Line, RiArrowDropRightLine, RiTwitterFill, RiTwitterLine, RiDiscordFill } from "react-icons/ri";



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

  const url = API + SINGLE_PROFILE_PATH + "/" + name + "?_followers=true&_following=true&_posts=true&_comments=true&_reactions=true";
  useEffect(() => {
    document.title = "NO.CO | Contributors | " + name;
  }, []);
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
          // window.location.reload(true);

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


  const profilePictureDefault = "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
  const noBanner = "https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


  return (
    <div className="profile">
      <div className="profileBanner" style={{ backgroundImage: `url(${profile.banner ? profile.banner : noBanner})` }}>
        <Link to={`/profiles/edit/banner/${name}`}>
          <span><GoPencil className="pencil" /></span>
        </Link>
      </div>
      <div className="profileDataSection">
        <div className="profileData">
          <div className="breadcrumb" onClick={() => navigation(-1)}>
            <button><RiArrowLeftSFill /></button>
            <p>Go back</p>
          </div>
          <div>
            <h2 className="largeDevice">{profile.name}</h2>
          </div>
          <div>
            <FollowBtn />
          </div>
        </div>
        <div className="smallDevice">
          <h2 className="profileData profileData__name" >{profile.name}</h2>
        </div>
      </div>
      <div className="profileWrapper">
        <div className="profilePictureSection">
          <div className="followWrapper">
            <p>{profile._count.posts} Posts</p>
            <p>{profile._count.following} Following</p>
            <p>{profile._count.followers} Followers</p>
          </div>
          <div className="profilePictureInfo" style={{ backgroundImage: `url(${profile.avatar ? profile.avatar : profilePictureDefault})` }}>
            <Link to={`/profiles/edit/avatar/${name}`}>
              <span><GoPencil className="pencil" /></span>
            </Link>
          </div>
          <a style={{ color: `var(--parchment-white)`, fontWeight: 100 }} href="">{profile.email}</a>
        </div>

        <div className="profileContent">
          <div className="additionalProfileInformation">
            <div><h2>About me</h2></div>
            <div className="marginTop10">
              <p>Hello! I am a junior frontend developer who is super excited to get to work and start developing
                real projects for real world clients! I have already submitted my application and portfolio
                to Facebook, Google, Instagram and Twitter and am just waiting for the call!
                I definitely believe Meta will be in touch. </p>
            </div>
          </div>

          <div>
            <div><h2>Posts</h2></div>
            <div className="profilePosts">


              {profile.posts.map((profilePost, id) => {

                return (
                  <div key={id} className="post-card" >
                    <div className="postCard-body">
                      <Link to={`detail/${id}`}>
                        <h4>{profilePost.title}</h4>
                      </Link>
                      {/* <h4>{profilePost.title}</h4> */}
                      <p className="timestamp">{profilePost.created.substring(0, profilePost.created.length - 8).replace('T', ' ')}</p>
                      <p>{profilePost.body}</p>
                      <img src={profilePost.media} alt={profilePost.media} />
                      <div>
                        <p>Comment section</p>
                        <p>Reaction section</p>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div></div>
        </div>
      </div>
    </div >
  );
}

export default ProfileDetail;
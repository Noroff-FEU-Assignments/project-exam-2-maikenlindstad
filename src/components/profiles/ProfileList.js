import { useState, useEffect, useContext } from "react";
import { API, PEOPLE_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import ProfileItem from './ProfileItem'

const peoplesUrl = API + PEOPLE_PATH;

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    async function getPeoples() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
      try {
        const response = await fetch(peoplesUrl, options);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProfiles(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPeoples();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <><div className="profileSection">
      {profiles.map(function (profile) {
        const { name, email, avatar } = profile;
        return <div>
          <ProfileItem key={name} name={name} email={email} avatar={avatar} />
        </div>;
      })}
    </div>
    </>
  );
}

export default ProfileList;
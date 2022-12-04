import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ProfileItem from './ProfileItem'
import { API, PROFILES_PATH } from '../../constants/api';

const url = API + PROFILES_PATH + "?sortOrder=asc&limit=100&offset=0"

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth,] = useContext(AuthContext);

  useEffect(() => {
    document.title = "NO.CO | Contributors";
  }, []);

  useEffect(() => {
    async function getPeoples() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const json = await response.json();
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
    <>
      <div className="profilesPage">
        <div className="profileSection">
          {profiles.map(function (profile) {
            const { name, email, avatar } = profile;
            return <div>
              <ProfileItem key={name} name={name} email={email} avatar={avatar} />
            </div>;
          })}
        </div>

      </div>
    </>
  );
}

export default ProfileList;
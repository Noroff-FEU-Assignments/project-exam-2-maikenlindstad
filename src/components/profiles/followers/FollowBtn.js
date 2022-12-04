import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from '../../../hooks/useAxios'
import { PROFILES_PATH } from "../../../constants/api";

export default function FollowBtn() {
  const [toggle, setToggle] = useState(false);

  let { name } = useParams();
  const http = useAxios();

  const urlFollow = PROFILES_PATH + "/" + name + "/follow";
  const urlUnfollow = PROFILES_PATH + "/" + name + "/unfollow";

  async function onFollow() {
    try {
      await http.put(urlFollow);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function onUnfollow() {
    try {
      await http.put(urlUnfollow);
      window.location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const toggler = () => {
    toggle ? setToggle(onUnfollow) : setToggle(onFollow)
  }

  return (
    <>
      <button onClick={toggler} className={(toggle ? 'cta-follow' : 'cta-btn')}>
        {toggle ? 'Unfollow' : 'Follow'}
      </button>
    </>
  );
}


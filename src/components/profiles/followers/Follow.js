import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from '../../../hooks/useAxios'
import { PROFILES_PATH } from "../../../constants/api";




export default function Follow() {
  let { name } = useParams();
  const http = useAxios();
  const url = PROFILES_PATH + "/" + name + "/follow";
  console.log("Follow:" + url);

  async function onFollow() {
    // const [serverError, setServerError] = useState(null);
    // setServerError(null);

    try {
      const response = await http.put(url);
      console.log("Follow response", response.data);
      // navigate("/posts");
    } catch (error) {
      console.log("Error: ", error);
      console.log(error.response)
      // setServerError(error.toString());
    } finally {
      // setSubmitting(false);
      // window.location.reload(true);

    }
  }

  return (
    <>
      <p onClick={onFollow} className="cta-follow">Follow</p>
    </>
  );
}

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../hooks/useAxios'
import FormError from "../common/FormError";
import { API, CREATE_POST_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import { BsCardImage } from "react-icons/bs";

const url = API + CREATE_POST_PATH;
console.log("URL:" + url);

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title")
});

export default function AddPostForm() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    console.log(data);

    try {
      const response = await http.post(url, data);
      console.log("response", response.data);
      navigate("/posts");
      window.location.reload(true);
    } catch (error) {
      console.log("Error: ", error);
      console.log(error.response)
      setServerError(error.toString());
    } finally {
      setSubmitting(false);

    }
  }
  const profilePictureDefault = "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";


  return (
    <div className="postCard">
      <div className="postCard-head">
        <a href={`/profiles/detail/${auth.name}`}>
          <div className="avatar-section" style={{ backgroundImage: `url(${auth.avatar ? auth.avatar : profilePictureDefault})` }}>
          </div>
        </a>
        <div className="userInfo-section">
          <a href={`/profiles/detail/${auth.name}`}>
            <h3>{auth.name} </h3>
          </a>
        </div>
      </div>
      <div className="postCard-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          {serverError && <FormError>{serverError}</FormError>}
          <fieldset disabled={submitting}>
            <div>
              <input {...register("title")} id="title" placeholder="Title" />
              {errors.title && <FormError>{errors.title.message}</FormError>}
            </div>

            <div>
              <textarea   {...register("body")} id="body" placeholder="What a lovely day to share something you have created!" />
              {errors.body && <FormError>{errors.body.message}</FormError>}
            </div>

            <div>
              <input {...register("media")} id="media" placeholder="Copy + paste img url" />
              {errors.media && <FormError>{errors.media.message}</FormError>}
            </div>
            {/* <p>* Must have</p> */}

            <button className="cta-btn marginTop10 green">{submitting ? "Adding post..." : "Post"}</button>
          </fieldset>
        </form>
      </div>
    </div >
  );
}

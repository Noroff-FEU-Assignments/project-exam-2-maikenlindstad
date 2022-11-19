import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../hooks/useAxios'
import FormError from "../common/FormError";
import { API, CREATE_POST_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

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
    } catch (error) {
      console.log("Error: ", error);
      console.log(error.response)
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      window.location.reload(true);

    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>
          <div>
            <input {...register("title")} id="title" placeholder="Title" />
            {errors.title && <FormError>{errors.title.message}</FormError>}
          </div>

          <div>
            <input type="text"  {...register("body")} id="body" placeholder="Write something"></input>
            {errors.body && <FormError>{errors.body.message}</FormError>}
          </div>

          <button>{submitting ? "Adding post..." : "Post"}</button>
        </fieldset>
      </form>
    </>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../hooks/useAxios'
import FormError from "../common/FormError";
import { POST_PATH } from "../../constants/api";

const schema = yup.object().shape({
  body: yup.string().required("You did not write anything.")
});

export default function PostComment() {
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  let { id } = useParams();
  const url = POST_PATH + "/" + id + "/comment";

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();


  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    try {
      const response = await http.post(url, data);
      window.location.reload(true);
    } catch (error) {
      console.log("Comment error: ", error);
      console.log(error.response)
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>

          <div>
            <input type="text"  {...register("body")} id="body" placeholder="Write comment..."></input>
            {errors.body && <FormError>{errors.body.message}</FormError>}
          </div>

          <button className="cta-btn marginTop10 green">{submitting ? "Commenting..." : "Send comment"}</button>
        </fieldset>
      </form>
    </>
  );
}

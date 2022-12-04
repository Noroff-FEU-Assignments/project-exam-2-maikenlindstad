import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { PROFILES_PATH } from "../../../constants/api";

const schema = yup.object().shape({
  banner: yup.string().required("Enter url")
});

export default function EditBannerForm() {
  const [, setBanner] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingBanner, setFetchingBanner] = useState(true);
  const [updatingBanner, setUpdatingBanner] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { name } = useParams();
  const url = PROFILES_PATH + `/` + name;
  const navigate = useNavigate();

  useEffect(function () {
    async function getBanner() {
      try {
        const response = await http.get(url);
        console.log("The Banner response I'm working with now: ", response.data);
        setBanner(response.data);
      } catch (error) {
        console.log(error);
        setFetchError(error.toString());
      } finally {
        setFetchingBanner(false);
      }
    }
    getBanner();
  },
    []
  );

  async function onSubmit(data) {
    setUpdatingBanner(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    try {
      const response = await http.put(url + "/media", data);
      console.log("The Banner response: ", response.data);
      setUpdated(true);
      navigate(-1);

    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingBanner(false);
    }
  }

  if (fetchingBanner) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading Banner</div>;

  return (
    <form className="edit" onSubmit={handleSubmit(onSubmit)}>
      {updated && <div><p>The post was updated.</p></div>}
      {updateError && <FormError>{updateError}</FormError>}

      <fieldset disabled={updatingBanner}>
        <div>
          <input {...register("banner")} id="banner" placeholder="Insert url" />
          {errors.banner && <FormError>{errors.banner.message}</FormError>}
        </div>

        <button>{updatingBanner ? "Updating Banner..." : "Update"}</button>
      </fieldset>
    </form>
  )
}
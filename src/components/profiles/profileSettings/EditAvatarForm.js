import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import { PROFILES_PATH } from "../../../constants/api";

const schema = yup.object().shape({
  avatar: yup.string().required("Enter Avatar url")
});

export default function EditAvatarForm() {
  const [avatar, setAvatar] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingAvatar, setFetchingAvatar] = useState(true);
  const [updatingAvatar, setUpdatingAvatar] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();
  let { name } = useParams();
  const url = PROFILES_PATH + `/` + name;

  useEffect(function () {
    async function getAvatar() {
      try {
        const response = await http.get(url);
        console.log("The avatar response I'm working with now: ", response.data);
        setAvatar(response.data);
      } catch (error) {
        console.log(error);
        setFetchError(error.toString());
      } finally {
        setFetchingAvatar(false);
      }
    }
    getAvatar();
  },
    []
  );

  async function onSubmit(data) {
    setUpdatingAvatar(true);
    setUpdateError(null);
    setUpdated(false);

    console.log(data);

    try {
      const response = await http.put(url + "/media", data);
      console.log("The avatar response: ", response.data);
      setUpdated(true);
    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingAvatar(false);
    }
  }

  if (fetchingAvatar) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading Avatar</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {updated && <div><p>The post was updated.</p></div>}
      {updateError && <FormError>{updateError}</FormError>}

      <fieldset disabled={updatingAvatar}>
        <div>
          <input {...register("avatar")} defaultValue={avatar.avatar} id="avatar" />
          {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
        </div>

        <button>{updatingAvatar ? "Updating Avatar..." : "Update"}</button>
      </fieldset>
    </form>
  )


}
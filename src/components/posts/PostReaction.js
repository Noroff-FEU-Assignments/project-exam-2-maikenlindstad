import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../../hooks/useAxios'
import { POST_PATH } from "../../constants/api";

const schema = yup.object().shape({
  symbol: yup.string().required("")
});

export default function PostReaction() {
  const [, setSubmitting] = useState(false);
  const [, setEmoji] = useState();
  const [, setServerError] = useState(null);

  let { id } = useParams();
  let symbol = "❤️";
  const url = POST_PATH + "/" + id + "/react/" + symbol;

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const http = useAxios();

  async function onSubmit() {
    setEmoji(true);
    setServerError(null);

    try {
      await http.put(url);
      window.location.reload(true);
    } catch (error) {
      console.log("Reaction error: ", error);
      console.log(error.response)
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form>
        <label for="heart" className="heartLabel">❤️</label>
        <input id="heart" value="❤️" type="checkbox" {...register("symbol")} onChange={handleSubmit(onSubmit)} />
      </form>
    </>
  );
}
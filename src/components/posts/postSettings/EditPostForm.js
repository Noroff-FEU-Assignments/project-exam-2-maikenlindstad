import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import useAxios from "../../../hooks/useAxios";
import Heading from "../../layout/layoutComponents/Heading";
import { API, POST_PATH } from "../../../constants/api";
import DeletePost from "./deletePost";

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title")
});

export default function EditPostForm() {
  const [post, setPost] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const http = useAxios();

  let { id } = useParams();

  const url = POST_PATH + `/` + id;

  useEffect(function () {
    async function getPost() {
      try {
        const response = await http.get(url);
        // console.log("The response I'm working with now: ", response.data);
        setPost(response.data);
      } catch (error) {
        console.log(error);
        setFetchError(error.toString());
      } finally {
        setFetchingPost(false);
      }
    }
    getPost();
  },
    []
  );

  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);




    console.log(data);

    try {
      const response = await http.put(url, data);
      console.log("The response: ", response.data);
      setUpdated(true);
      navigate("/posts#" + id);

    } catch (error) {
      console.log("error", error);
      setUpdateError(error.toString());
    } finally {
      setUpdatingPost(false);
    }
  }

  if (fetchingPost) return <div>Loading...</div>;

  if (fetchError) return <div>Error loading post</div>;

  // const handleClickScroll = () => {
  //   const element = document.getElementById('section-1');
  //   if (element) {
  //     // 👇 Will scroll smoothly to the top of the next section
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {updated && <div><p>The post was updated.</p></div>}
      {updateError && <FormError>{updateError}</FormError>}

      <fieldset disabled={updatingPost}>
        <div>
          <input {...register("title")} defaultValue={post.title} id="title" placeholder="Title" />
          {errors.title && <FormError>{errors.title.message}</FormError>}
        </div>

        <div>
          <textarea  {...register("body")} defaultValue={post.body} id="body" placeholder="Write something" />
          {errors.body && <FormError>{errors.body.message}</FormError>}
        </div>

        <button className="cta-btn green marginTop10">{updatingPost ? "Updating post..." : "Update"}</button>
        <DeletePost id={post.id} />
      </fieldset>
    </form>
  )


}
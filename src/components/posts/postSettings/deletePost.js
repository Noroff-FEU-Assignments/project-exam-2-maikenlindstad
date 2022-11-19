import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { POST_PATH } from "../../../constants/api";

export default function DeletePost({ id }) {
  const [error, setError] = useState(null);

  const http = useAxios();
  const navigate = useNavigate();

  const url = POST_PATH + `/` + id;

  async function handleDelete() {
    const confirmDelete = window.confirm("Delete this post?");
    if (confirmDelete) {
      try {
        await http.delete(url);
        navigate("../posts");
      } catch (error) {
        setError(error);
      }
    }
  }

  return (
    <button type="button" className="cta-btn" onClick={handleDelete}>
      {error ? "Error" : "Delete"}
    </button>
  );
}

DeletePost.propTypes = {
  id: PropTypes.number.isRequired,
}
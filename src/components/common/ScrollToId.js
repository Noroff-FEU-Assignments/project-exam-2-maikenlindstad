import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";



export default function ScrollToId() {
  const { id } = useParams();

  const handleScrolling = () => {
    window[`scrollTo`]({ id: id })
  }

  useEffect(() => {
    window.addEventListener(`scroll`, handleScrolling)
  })

  return (
    <div onChange={handleScrolling()} />
  );
}

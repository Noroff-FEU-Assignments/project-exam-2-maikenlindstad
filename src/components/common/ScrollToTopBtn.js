import { useEffect, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";

export default function ScrollToTopBtn() {
  const [backToTopBtn, setBackToTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollTop > 100) {
        setBackToTopBtn(true)
      } else {
        setBackToTopBtn(true);
      }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      {backToTopBtn && (<div onClick={scrollUp} className="scrollToTop"><AiFillCaretUp /></div>)}
    </>
  );
}

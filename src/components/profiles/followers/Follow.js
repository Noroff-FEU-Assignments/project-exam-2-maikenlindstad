// import { useParams } from "react-router-dom";
// import useAxios from '../../../hooks/useAxios'
// import { PROFILES_PATH } from "../../../constants/api";

// export default function Follow() {
//   let { name } = useParams();
//   const http = useAxios();
//   const url = PROFILES_PATH + "/" + name + "/follow";

//   async function onFollow() {
//     try {
//       const response = await http.put(url);
//       window.location.reload(true);

//     } catch (error) {
//       console.log("Error: ", error);
//       console.log(error.response)
//       // setServerError(error.toString());
//     }
//     // finally {
//     //   // setSubmitting(false);
//     // }
//   }

//   return (
//     <>
//       <p onClick={onFollow} className="cta-follow">Follow</p>
//     </>
//   );
// }

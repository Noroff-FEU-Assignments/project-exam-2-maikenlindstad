// import { useEffect, useContext } from "react";
// import { API, PROFILES_PATH } from "../../../constants/api";
// import AuthContext from "../../../context/AuthContext";

// const url = API + PROFILES_PATH + "?sortOrder=asc&limit=100&offset=0"

// function GetPageOne() {
//   const [auth] = useContext(AuthContext);

//   useEffect(() => {
//     async function getProfiles() {
//       const options = {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${auth.accessToken}`,
//         }
//       }
//       try {
//         const response = await fetch(url, options);
//         const json = await response.json();
//         console.log(response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getProfiles();
//   })
// }

// export default function NextPage() {
//   function onClickHandler() {
//     GetPageOne();
//   }

//   return (
//     <>
//       <div className="pageBtn">
//         <button onClick={onClickHandler}> 1</button>
//       </div>
//     </>
//   )
// }
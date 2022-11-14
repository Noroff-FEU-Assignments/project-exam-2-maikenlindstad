import { useState, useEffect, useContext } from "react";
import { API, POST_PATH, PEOPLE_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
// import { useParams } from "react-router-dom";

const postsUrl = API + POST_PATH;
const peopleUrl = API + PEOPLE_PATH;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [peoples, setPeoples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    async function getPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
      try {
        const postResponse = await fetch(postsUrl, options);
        const peopleResponse = await fetch(peopleUrl, options);
        if (postResponse.ok && peopleResponse.ok) {
          const jsonPosts = await postResponse.json();
          const jsonPeople = await peopleResponse.json();
          console.log(jsonPosts);
          console.log(jsonPeople);
          setPosts(jsonPosts);
          setPeoples(jsonPeople);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      {/* {peoples.map(function (people) {
        return <div className="post-card" key={people.id}>
          <div className="postCard-head">
            <div className="avatar-section" style={{ backgroundImage: `url(${people.avatar})` }}>
            </div>
            <div className="userInfo-section">
              <h4>{people.name} </h4>
              <span>|</span>
              <h4>{people.name}</h4>
            </div>
          </div>
        </div>
      })} */}
      {
        posts.map(function (post) {
          return <div className="post-card" key={post.id}>
            <div className="postCard-body">
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <img src={post.media} />
              <p>Comments: {post._count.comments}</p>
              <p>Reactions: {post._count.reactions}</p>
            </div>
          </div>
        })
      }
    </>
  );
}

export default PostList;

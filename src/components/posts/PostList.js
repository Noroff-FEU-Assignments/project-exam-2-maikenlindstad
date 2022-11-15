import { useState, useEffect, useContext } from "react";
import { API, POST_PATH, PROFILES_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
// import { useParams } from "react-router-dom";
import PostItem from "./PostItem";

const postsUrl = API + POST_PATH + "?_author=true&_comments=true&_reactions=true";
const peopleUrl = API + PROFILES_PATH;

function PostList() {
  const [posts, setPosts] = useState([]);
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
        if (postResponse.ok) {
          const jsonPosts = await postResponse.json();
          console.log(jsonPosts);
          setPosts(jsonPosts);
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
  // Denne endrer på utseende til detaljene av postene
  return (
    <>
      {posts.map(function (post) {
        const { id, title, body, media, created, updated, _count, comments, author, name, avatar } = post;
        return <div>
          <PostItem key={id} id={id} title={title}
            body={body} media={media} created={created}
            updated={updated} _count={_count} comments={comments} author={author} name={name}
            avatar={avatar} />
        </div>;
      })}
    </>
  );
}

export default PostList;

import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API, POST_PATH } from "../../constants/api";
import { Link } from "react-router-dom";

function PostDetail() {
  const [post, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);

  const navigation = useNavigate();

  const { id } = useParams();
  const { name } = useParams();


  if (!id) {
    navigation("/posts");
  }

  const url = API + POST_PATH + "/" + id + "?_author=true&_comments=true&_reactions=true";

  useEffect(() => {
    async function fetchPosts() {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setPosts(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <div className="post-card">
        <div className="postCard-head">
          <Link to={`../profiles/detail/${name}`}>
            <div className="avatar-section" style={{ backgroundImage: `url(${post.author.avatar})` }}>
            </div>
          </Link>
          <div className="userInfo-section">
            <h4>{post.author.name} </h4>
          </div>
        </div>

        <div className="postCard-body">
          <h3>{post.title}</h3>
          <p>{post.created}</p>
          <p>{post.body}</p>
          <img src={post.media} />

          <div className="reactionField">
            <p>{post._count.comments} comments</p>
            <p>🧡👍😂 {post._count.reactions}</p>
          </div>
          <div>
            <p>Read comments/No comments:</p>
            <div className="comments">
              <p>{post.comments.body}</p>
            </div>
          </div>

        </div>
      </div>


    </>

  );
}

export default PostDetail;
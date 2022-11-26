import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API, POST_PATH } from "../../constants/api";
import { Link } from "react-router-dom";
import PostComment from "./PostComment";
import PostReaction from "./PostReaction";
import { GoTrashcan, GoPencil } from "react-icons/go";


function PostDetails() {
  const [postDetails, setPostDetails] = useState([]);
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
    async function fetchPostDetails() {
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
          setPostDetails(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchPostDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <Link to={`../posts`}>
        <p>Back</p>
      </Link>
      <div className="post-card">
        <div className="postCard-head">
          <a href={`/profiles/detail/${name}`}>
            <div className="avatar-section" style={{ backgroundImage: `url(${postDetails.author.avatar})` }}>
            </div>
          </a>
          <div className="userInfo-section">
            <h3>{postDetails.author.name} </h3>
            {/* <PostReaction /> */}
          </div>
        </div>

        <div className="postCard-body">
          <h3>{postDetails.title}</h3>
          <p>{postDetails.created}</p>
          <p>{postDetails.body}</p>
          <img src={postDetails.media} />

          <div className="reactionField">
            <p>{postDetails._count.comments} comments</p>
            <div key={id}>
              {postDetails.reactions.map((reaction, id) => {
                return (
                  <span>{reaction.symbol}</span>
                );
              })}
            </div>
          </div>

          <div>
            <p>IF Read comments/ ELSE No comments:</p>
          </div>

          <div className="comments">
            {postDetails.comments.map((comment, id) => {
              return (
                <>
                  <div key={id} className="comment">
                    <h4>{comment.owner}</h4>
                    <div>
                      <div>
                        <div className="commentBody">
                          <p>{comment.body}</p>
                        </div>
                        <Link to={`../posts/edit/${id}/comment`}>
                          <GoPencil />
                          <GoTrashcan />
                        </Link>

                      </div>

                      <div className="commentRespond">
                        <p>Like</p> <p>Respond</p>
                      </div>
                    </div>

                  </div>

                </>

              );
            })}


          </div>
          <div>
            <PostComment />
          </div>
        </div>
      </div>


    </>

  );
}

export default PostDetails;
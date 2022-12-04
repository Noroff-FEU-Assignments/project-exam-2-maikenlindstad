import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { API, POST_PATH } from "../../constants/api";
import { Link } from "react-router-dom";
import PostComment from "./PostComment";
import PostReaction from "./PostReaction";
import Heading from '../layout/layoutComponents/Heading';
import { RiArrowLeftSFill } from "react-icons/ri";

function PostDetails() {
  const [postDetails, setPostDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth,] = useContext(AuthContext);

  const navigation = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigation("/posts");
  }

  const url = API + POST_PATH + "/" + id + "?_author=true&_comments=true&_reactions=true";
  const profilePictureDefault = "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

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

  useEffect(() => {
    document.title = "NO.CO | Latest posts | Read, comment or react";
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <div className="wrapContent">
      <Heading title="Post details" />
      <div className="breadcrumb" onClick={() => navigation(-1)}>
        <RiArrowLeftSFill />
        <p>Go back</p>
      </div>
      <div className="postCard">
        <div className="postCard-head">
          <a href={`/profiles/detail/${postDetails.author.name}`}>
            <div className="avatar-section" style={{ backgroundImage: `url(${postDetails.author.avatar ? postDetails.author.avatar : profilePictureDefault})` }}>
            </div>
          </a>
          <div className="userInfo-section">
            <a href={`/profiles/detail/${postDetails.author.name}`}>
              <h3>{postDetails.author.name} </h3>
            </a>
          </div>
        </div>

        <div className="postCard-body">
          <h3>{postDetails.title}</h3>
          <p className="timestamp">{postDetails.created.substring(0, postDetails.created.length - 8).replace('T', ' ')}</p>
          <p>{postDetails.body}</p>
          <img src={postDetails.media} alt={postDetails.media} />

          <div className="reactionField">
            <div>
              <div key={id} className="reactionSpan">
                {postDetails.reactions.map((reaction, id) => {
                  return (
                    <span>{reaction.symbol}</span>
                  );
                })}
                <p className="reactionCount">{postDetails._count.reactions}</p>
              </div>
              <p>{postDetails._count.comments} comments</p>
            </div>
            <div>
              <PostReaction />
            </div>
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
    </div>

  );
}

export default PostDetails;
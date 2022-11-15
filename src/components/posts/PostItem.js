import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Denne endrer på utseende til listen av poster 

function PostItem({ id, title, body, media, created, updated, _count, comments, reactions, author, name }) {
  return (
    <>
      <div className="post-card">
        <div className="postCard-head">
          <Link to={`../profiles/detail/${author.name}`}>
            <div className="avatar-section" style={{ backgroundImage: `url(${author.avatar})` }}>
            </div>
          </Link>
          <div className="userInfo-section">
            <Link to={`../profiles/detail/${author.name}`}>
              <h4>{author.name} </h4>
            </Link>
          </div>
        </div>

        <div className="postCard-body">
          <Link to={`detail/${id}`}>
            <h3>{title}</h3>
          </Link>
          <p>{created}</p>
          {/* <p>{updated}</p> */}
          <p>{body}</p>
          <img src={media} />

          <div className="reactionField">
            <Link to={`detail/${id}`}>
              <p>{_count.comments} comments</p>
            </Link>
            <Link to={`detail/${id}`}>
              <p>🧡👍😂 {_count.reactions}</p>
            </Link>
          </div>

        </div>
      </div>
    </>

  );
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  media: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
  _count: PropTypes.number.isRequired,
  comments: PropTypes.string.isRequired,
  reactions: PropTypes.string.isRequired,
};

export default PostItem;
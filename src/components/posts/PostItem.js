import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import ScrollToId from "../common/ScrollToId";

const profilePictureDefault = "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
function PostItem({ id, title, body, media, created, _count, author }) {
  const timeCreated = created.substring(0, created.length - 8);
  const timestamp = timeCreated.replace('T', ' ')

  return (
    <>
      <div className="postCard">
        <ScrollToId />
        <div className="postCard-head">
          <Link to={`../profiles/detail/${author.name}`}>
            <div className="avatar-section" style={{ backgroundImage: `url(${author.avatar ? author.avatar : profilePictureDefault})` }}>
            </div>
          </Link>
          <div className="userInfo-section">
            <Link to={`../profiles/detail/${author.name}`}>
              <h3>{author.name} </h3>
            </Link>
            <Link to={`../posts/edit/${id}`}>
              <FiMoreHorizontal />
            </Link>
          </div>
        </div>

        <div className="postCard-body">
          <Link to={`detail/${id}`}>
            <h4>{title}</h4>
          </Link>
          <p className="timestamp">{timestamp}</p>
          <p>{body}</p>
          <img src={media} alt={media} />

          <div className="reactionField">
            <Link to={`detail/${id}`}>
              <p>{_count.comments} comments</p>
            </Link>

            <Link to={`detail/${id}`}>
              <div className="reactions">
                <p>❤️</p>
                <p>{_count.reactions}</p>
              </div>
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
};

export default PostItem;
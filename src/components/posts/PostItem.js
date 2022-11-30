import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState, useEffect, useContext, useRef } from "react";

// import { AiFillLike } from "react-icons/ai";
import { FaRegThumbsUp, FaRegHeart, FaRegGrinTongueWink, FaRegGrinSquintTears, FaRegGrinHearts, FaRegGrinAlt } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import PostReaction from "./PostReaction";
import ScrollToId from "../common/ScrollToId";

// Denne endrer på utseende til listen av poster 




const profilePictureDefault = "https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
function PostItem({ id, title, body, media, created, updated, _count, comments, reactions, author, name }) {

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
              <h4>{author.name} </h4>
            </Link>
            <Link to={`../posts/edit/${id}`}>
              <FiMoreHorizontal />
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
            {/* <Link to={`detail/${id}`}> */}
            <div className="reactions">
              {/* <PostReaction /> */}
              <p><FaRegHeart /></p>
              <p>{_count.reactions}</p>
            </div>
            {/* <p>{_count.reactions}</p> */}
            {/* </Link> */}

          </div>

        </div>
      </div>
    </>

  );
}

PostItem.propTypes = {
  key: PropTypes.number.isRequired,
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
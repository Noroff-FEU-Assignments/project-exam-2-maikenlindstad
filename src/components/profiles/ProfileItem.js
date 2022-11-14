import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ProfileItem({ name, email, avatar }) {
  return (
    <Link to={`detail/${name}`}>
      <div className="profileCards">
        <div className="profilePicture" style={{ backgroundImage: `url(${avatar})` }}>
        </div>
        <div className="profileName">
          <h3>{name}</h3>
          <p>Frontend Developer</p>
        </div>
      </div>
    </Link>
  );
}

ProfileItem.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

export default ProfileItem;
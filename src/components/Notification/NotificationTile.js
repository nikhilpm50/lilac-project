import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const NotificationTile = ({ profilePhoto, message, timestamp }) => {
  return (
    <div className="notification-tile">
      <div className="profile-photo">
        <img src={profilePhoto} alt="User" />
      </div>
      <div className="notification-content">
        <p>{message}</p>
        <span>{timestamp}</span>
      </div>
    </div>
  );
};

NotificationTile.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default NotificationTile;

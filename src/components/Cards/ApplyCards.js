import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";

const ApplyCards = ({
  profilePhoto,
  name,
  employeeCode,
  phoneNumber,
  email,
  degreeName,
  applied,
}) => {
  return (
    <div className="card">
      <div className="profile-photo">
        <img src={profilePhoto} alt={name} />
        <div className="text-div">
          <h3>{name}</h3>
          <p>{employeeCode}</p>
        </div>
      </div>
      <div className="info">
        <div className="info-content">
          <CallIcon />
          <p>{phoneNumber}</p>
        </div>
        <div className="info-content">
          <EmailIcon />
          <p>{email}</p>
        </div>
        <div className="info-content">
          <SchoolIcon />
          <p>{degreeName}</p>
        </div>
        {applied && <span className="tag">Applied</span>}
      </div>
    </div>
  );
};

ApplyCards.propTypes = {
  profilePhoto: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  employeeCode: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  degreeName: PropTypes.string.isRequired,
  applied: PropTypes.bool,
};

export default ApplyCards;

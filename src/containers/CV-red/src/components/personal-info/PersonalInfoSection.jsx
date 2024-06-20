import React from "react";
import "../../styles/PersonalInfoSection.css";

function PersonalInfoSection({ email, fullName, phoneNumber, address, photo }) {
  return (
    <div className="personal-info">
      <div className="left-section">
        <img src={photo} alt="Profile" className="cv-photo" />
      </div>
      <div className="right-section">
        <h1 className="resume-name">{fullName}</h1>
        <div className="contact-info">
          {email && (
            <div>
              <i className="fa-solid fa-envelope" />
              <span>{email}</span>
            </div>
          )}

          {phoneNumber && (
            <div>
              <i className="fa-solid fa-phone" />
              <span>{phoneNumber}</span>
            </div>
          )}

          {address && (
            <div>
              <i className="fa-solid fa-location-dot" />
              <span>{address}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoSection;

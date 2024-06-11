import "../../styles/PersonalInfoSection.css";

function PersonalInfoSection({ email, fullName, phoneNumber, address }) {
  return (
    <div className="personal-info">
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
  );
}

<<<<<<< HEAD
export default PersonalInfoSection;
=======
export default PersonalInfoSection;
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22

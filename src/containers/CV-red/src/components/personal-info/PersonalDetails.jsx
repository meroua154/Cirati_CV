import InputGroup from "../InputGroup";
import "../../styles/PersonalDetails.css";

function PersonalDetails({
  onChange,
  email,
  fullName,
  phoneNumber,
  address,
  photo,
}) {
  return (
    <form className="personal-details">
      <h2>Personal Details</h2>
      <InputGroup
        type="text"
        id="full-name"
        labelText="Full name"
        placeholder="First and last name"
        value={fullName}
        onChange={onChange}
        data-key="fullName"
      />
      <InputGroup
        type="email"
        id="email"
        labelText="Email"
        placeholder="Enter email"
        value={email}
        onChange={onChange}
        data-key="email"
        recommended
      />
      <InputGroup
        type="tel"
        id="phone-number"
        labelText="Phone number"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={onChange}
        data-key="phoneNumber"
        recommended
      />
      <InputGroup
        type="text"
        id="address"
        labelText="Address"
        placeholder="City, Country"
        value={address}
        onChange={onChange}
        data-key="address"
        recommended
      />
      <InputGroup
        type="file"
        id="photo"
        labelText="CV Photo"
        placeholder="Upload your photo"
        onChange={onChange}
        data-key="photo"
        accept="image/*"
        photo
      />
    </form>
  );
}

export default PersonalDetails;

import React from "react";
import InputGroup from "../InputGroup";
import "../../styles/PersonalDetails.css";
import translations from "../../translations"; // Assurez-vous que le chemin est correct

function PersonalDetails({
  onChange,
  email,
  fullName,
  phoneNumber,
  address,
  photo,
  language // Ajoutez cette ligne
}) {
  const t = translations[language]; // Sélectionnez les traductions appropriées

  return (
    <form className="">
      <h2>{t.personalDetails}</h2>
      <div className="">
        <InputGroup
          type="file"
          id="photo"
          labelText={t.cvPhoto}
          placeholder=""
          onChange={onChange}
          data-key="photo"
          accept="image/*"
          className="photo"
        />
        <InputGroup
          type="text"
          id="full-name"
          labelText={t.fullName}
          placeholder="First and last name"
          value={fullName}
          onChange={onChange}
          data-key="fullName"
        />
        <InputGroup
          type="email"
          id="email"
          labelText={t.email}
          placeholder="Enter email"
          value={email}
          onChange={onChange}
          data-key="email"
          recommended
        />
        <InputGroup
          type="tel"
          id="phone-number"
          labelText={t.phoneNumber}
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={onChange}
          data-key="phoneNumber"
          recommended
        />
        <InputGroup
          type="text"
          id="address"
          labelText={t.address}
          placeholder="City, Country"
          value={address}
          onChange={onChange}
          data-key="address"
          recommended
        />
      </div>
    </form>
  );
}

export default PersonalDetails;

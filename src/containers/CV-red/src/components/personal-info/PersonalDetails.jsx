import React, { useState } from "react";
import InputGroup from "../InputGroup";
import "../../styles/PersonalDetails.css";
import translations from "../../translations";
import CropImage from "../crop/CropImage"

function PersonalDetails({
  onChange,
  email,
  fullName,
  phoneNumber,
  address,
  photo,
  language
}) {
  const t = translations[language];
  const [imageSrc, setImageSrc] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropCancel = () => {
    setShowCrop(false);
    setImageSrc(null);
  };

  const handleCropSave = (croppedImage) => {
    setShowCrop(false);
    onChange({ target: { dataset: { key: "photo" }, value: croppedImage } });
  };

  return (
    <form className="">
      <h2>{t.personalDetails}</h2>
      <div className="">
        <InputGroup
          type="file"
          id="photo"
          labelText={t.cvPhoto}
          placeholder=""
          onChange={handlePhotoChange}
          data-key="photo"
          accept="image/*"
          className="photo"
        />
        {showCrop && (
          <CropImage
            imageSrc={imageSrc}
            onCancel={handleCropCancel}
            onSave={handleCropSave}
          />
        )}
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

import React from "react";
import EducationInfo from "./EducationInfo";
import DisplaySection from "../DisplaySection";
import translations from "../../translations";

function EducationInfoSection({ educations, language }) {
  const t = translations[language];

  return (
    <div className="education-info-section resume-section">
      <DisplaySection
        array={educations}
        InfoComponent={EducationInfo}
        title={t.education} // Utilisation de la traduction pour le titre de l'éducation
      />
    </div>
  );
}

export default EducationInfoSection;

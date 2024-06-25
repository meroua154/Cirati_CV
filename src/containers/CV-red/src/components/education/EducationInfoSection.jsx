import React from "react";
import EducationInfo from "./EducationInfo";
import DisplaySection from "../DisplaySection";
import translations from "../../translations";

function EducationInfoSection({ educations, language }) {
  const t = translations[language];
  console.log(t.education)
  return (
    <div className="education-info-section resume-section">
      <DisplaySection
        array={educations}
        InfoComponent={EducationInfo}
        title="education" // Passer la clé de traduction ici
        language={language}
      />
    </div>
  );
}

export default EducationInfoSection;

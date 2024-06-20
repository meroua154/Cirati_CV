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
        title={t.education}
        language={language}
      />
    </div>
  );
}

export default EducationInfoSection;


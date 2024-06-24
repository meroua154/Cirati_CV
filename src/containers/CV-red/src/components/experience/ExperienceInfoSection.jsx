import React from "react";
import ExperienceInfo from "./ExperienceInfo";
import DisplaySection from "../DisplaySection";
import translations from "../../translations";

function ExperienceInfoSection({ experiences, language }) {
  const t = translations[language];

  return (
    <div className="experience-info-section resume-section">
      <DisplaySection
        array={experiences}
        InfoComponent={ExperienceInfo}
        title="experienceTitle" // Passer la clé de traduction ici
        language={language}
      />
    </div>
  );
}

export default ExperienceInfoSection;

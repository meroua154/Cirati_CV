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
        title={t.experienceTitle} // Utilisation de la traduction pour le titre d'expérience
        language={language} // Vous pouvez également passer la langue ici si nécessaire
      />
    </div>
  );
}

export default ExperienceInfoSection;

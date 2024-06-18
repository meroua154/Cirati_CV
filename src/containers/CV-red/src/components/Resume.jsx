import React from "react";
import "../styles/Resume.css";
import PersonalInfoSection from "./personal-info/PersonalInfoSection";
import EducationInfoSection from "./education/EducationInfoSection";
import ExperienceInfoSection from "./experience/ExperienceInfoSection";
import translations from "../translations";

function Resume({ personalInfo, sections, layout, selectedLanguage }) {
  const personalInfoTranslations = translations[selectedLanguage].personalInfo;
  const sectionsTranslations = translations[selectedLanguage].sections;

  return (
    <div className="resume-container">
      <div className={`resume ${layout}`}>
        <PersonalInfoSection
          fullName={personalInfoTranslations.fullName || personalInfo.fullName}
          email={personalInfoTranslations.email || personalInfo.email}
          phoneNumber={
            personalInfoTranslations.phoneNumber || personalInfo.phoneNumber
          }
          address={personalInfoTranslations.address || personalInfo.address}
          photo={personalInfo.photo}
        />
        <div>
          <EducationInfoSection
            educations={sectionsTranslations.educations || sections.educations}
          />
          <ExperienceInfoSection
            experiences={
              sectionsTranslations.experiences || sections.experiences
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Resume;

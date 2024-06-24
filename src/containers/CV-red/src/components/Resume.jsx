import React from "react";
import "../styles/Resume.css";
import PersonalInfoSection from "./personal-info/PersonalInfoSection";
import EducationInfoSection from "./education/EducationInfoSection";
import ExperienceInfoSection from "./experience/ExperienceInfoSection";
import{ useState } from "react";

function Resume({ personalInfo, sections, layout }) {
  const [language, setLanguage] = useState("en");
  return (
    <div className="resume-container">
      <div className={`resume ${layout}`}>
        <PersonalInfoSection
          fullName={personalInfo.fullName}
          email={personalInfo.email}
          phoneNumber={personalInfo.phoneNumber}
          address={personalInfo.address}
          photo={personalInfo.photo}
        />
        <div>
          <EducationInfoSection educations={sections.educations} language={language}/>
          <ExperienceInfoSection experiences={sections.experiences} language={language} />
        </div>
      </div>
    </div>
  );
}

export default Resume;

// AddExperienceSection.jsx
import React from "react";
import ExpandSection from "../ExpandSection";
import CreateForm from "../CreateForm";
import DisplayForms from "../DisplayForms";
import ExperienceForm from "./ExperienceForm";
import translations from "../../translations";

function AddExperienceSection({
  isOpen,
  createForm,
  setOpen,
  experiences,
  onChange,
  onCancel,
  toggleCollapsed,
  onHide,
  onRemove,
  language,
}) {
  const t = translations[language];
  return (
    <div className="add-experience-section section">
      <ExpandSection
        isOpen={isOpen}
        setOpen={setOpen}
        
        sectionName={t.experience}
        iconName="fa-solid fa-briefcase"
      />

      <div className={`section-content ${isOpen ? "open" : ""}`}>
        <DisplayForms
          forms={experiences}
          onChange={onChange}
          onCancel={onCancel}
          toggleCollapsed={toggleCollapsed}
          onHide={onHide}
          onRemove={onRemove}
          FormComponent={ExperienceForm}
          titleKey="companyName"
          arrayName="experiences"
          language={language}
        />

        <CreateForm
          onClick={createForm}
          buttonText={t.experience} 
          language={language}
        />
      </div>
    </div>
  );
}

export default AddExperienceSection;

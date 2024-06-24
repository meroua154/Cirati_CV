import React from "react";
import DisplayForms from "../DisplayForms";
import ExpandSection from "../ExpandSection";
import CreateForm from "../CreateForm";
import EducationForm from "./EducationForm";
import translations from "../../translations"; 

function AddEducationSection({
  educations,
  isOpen,
  onChange,
  createForm,
  setOpen,
  onCancel,
  toggleCollapsed,
  onHide,
  onRemove,
  language,
}) {
  const t = translations[language];

  return (
    <div className="add-education-section section">
      <ExpandSection
        isOpen={isOpen}
        setOpen={setOpen}
        sectionName={t.education}
        language={language}
      />

      <div className={`section-content ${isOpen ? "open" : ""}`}>
        <DisplayForms
          forms={educations}
          FormComponent={EducationForm}
          onChange={onChange}
          onCancel={onCancel}
          onHide={onHide}
          onRemove={onRemove}
          toggleCollapsed={toggleCollapsed}
          titleKey="schoolName"
          arrayName="educations"
          language={language}
        />

        <CreateForm onClick={createForm} buttonText={t.addEducation} />
      </div>
    </div>
  );
}

export default AddEducationSection;

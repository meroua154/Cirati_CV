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
<<<<<<< HEAD
        sectionName={t.education}
=======
        sectionName="Education"
>>>>>>> c5932676ff63e0b70b7d127f5920047a35c9d833
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

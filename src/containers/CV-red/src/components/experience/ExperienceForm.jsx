// ExperienceForm.jsx
import React from "react";
import InputGroup from "../InputGroup";
import Buttons from "../Buttons";
import translations from "../../translations";

function ExperienceForm(props) {
  const {
    companyName,
    positionTitle,
    location,
    description,
    startDate,
    endDate,
    id,
  } = props.form;

  const { onChange, cancel, save, remove, language } = props;
  const t = translations[language];
  return (
    <form
      className="experience-form section-form"
      id={id}
      data-array-name="experiences"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputGroup
        type="text"
        id="company-name"
        labelText={t.companyName}
        placeholder={t.enterCompanyName}
        value={t.companyName || ""}
        onChange={(e) => onChange(e, id)}
        data-key="companyName"
      />

      <InputGroup
        type="text"
        id="position-title"
        labelText={t.positionTitle}
        placeholder={t.enterPositionTitle}
        value={positionTitle}
        onChange={(e) => onChange(e, id)}
        data-key="positionTitle"
      />
      <div className="dates-group">
        <InputGroup
          type="text"
          id="start-date"
          labelText={t.startDate}
          placeholder={t.enterStartDate}
          value={startDate}
          onChange={(e) => onChange(e, id)}
          data-key="startDate"
        />
        <InputGroup
          type="text"
          id="end-date"
          labelText={t.endDate}
          placeholder={t.enterEndDate}
          value={endDate}
          onChange={(e) => onChange(e, id)}
          data-key="endDate"
        />
      </div>
      <InputGroup
        type="text"
        id="location"
        labelText={t.location}
        placeholder={t.enterLocation}
        value={location}
        onChange={(e) => onChange(e, id)}
        data-key="location"
        optional
      />
      <InputGroup
        type="textarea"
        id="description"
        labelText={t.description}
        placeholder={t.enterDescription}
        value={description}
        onChange={(e) => onChange(e, id)}
        data-key="description"
        optional
      />
      <Buttons save={save} cancel={cancel} remove={remove} />
    </form>
  );
}

export default ExperienceForm;

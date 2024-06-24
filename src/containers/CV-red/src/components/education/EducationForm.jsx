import React from "react";
import InputGroup from "../InputGroup";
import Buttons from "../Buttons";
import translations from "../../translations"; 

function EducationForm(props) {
  const { degree, schoolName, location, startDate, endDate, id } = props.form;
  const { onChange, cancel, save, remove, language } = props;
  const t = translations[language];

  return (
    <form
      className="education-form section-form"
      id={id}
      data-array-name="educations"
      onSubmit={(e) => e.preventDefault()}
    >
      <InputGroup
        type="text"
        id="school-name"
        labelText={t.schoolName}
        placeholder={t.enterSchool}
        value={schoolName}
        onChange={onChange}
        data-key="schoolName"
      />
      <InputGroup
        type="text"
        id="degree"
        labelText={t.degree}
        placeholder={t.enterDegree}
        value={degree}
        onChange={onChange}
        data-key="degree"
      />
      <div className="dates-group">
        <InputGroup
          type="text"
          id="date"
          labelText={t.startDate}
          placeholder={t.enterStartDate}
          value={startDate}
          onChange={onChange}
          data-key="startDate"
        />
        <InputGroup
          type="text"
          id="date"
          labelText={t.endDate}
          placeholder={t.enterEndDate}
          value={endDate}
          onChange={onChange}
          data-key="endDate"
        />
      </div>
      <InputGroup
        type="text"
        id="location"
        labelText={t.location}
        placeholder={t.enterLocation}
        value={location}
        onChange={onChange}
        data-key="location"
        optional
      />

      <Buttons save={save} cancel={cancel} remove={remove} />
    </form>
  );
}

export default EducationForm;

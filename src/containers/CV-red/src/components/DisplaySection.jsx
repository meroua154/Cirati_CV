import React from "react";
import translations from "../translations";

function DisplaySection({ array, InfoComponent, title, language }) {
  const t = translations[language];

  return (
    <React.Fragment>
      {!array.every((obj) => obj.isHidden) && (
        <h3 className="header-text">{t[title]}</h3> // Utiliser la traduction ici
      )}

      {array.map(
        (info) => !info.isHidden && <InfoComponent info={info} key={info.id} />
      )}
    </React.Fragment>
  );
}

export default DisplaySection;

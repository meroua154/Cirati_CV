import React from "react";
import translations from "../translations";

function DisplaySection({ array, InfoComponent, title, language }) {
  const t = translations[language];
  return (
    <React.Fragment>
      {
        // Afficher l'en-tête du CV si au moins un élément du tableau n'est pas caché.
        !array.every((obj) => obj.isHidden) && (
          <h3 className="header-text">{title}</h3>
        )
      }

      {array.map(
        (info) => !info.isHidden && <InfoComponent info={info} key={info.id} />
      )}

      
    </React.Fragment>
  );
}

export default DisplaySection;

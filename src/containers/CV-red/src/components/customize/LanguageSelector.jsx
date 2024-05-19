import React, { useState } from "react";

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("fr");

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div>
    <h2>Langue</h2>
    <div className="flex space-x-4">
     
      <button
        onClick={() => changeLanguage("fr")}
        className={`px-2 py-2 rounded ${selectedLanguage === "fr" ? "bg-light text-white" : "bg-gray-200 text-gray-800"}`}
      >
        Français
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-2 py-2 rounded ${selectedLanguage === "ar" ? "bg-light text-white" : "bg-gray-200 text-gray-800"}`}
      >
        العربية
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-2 py-2 rounded ${selectedLanguage === "en" ? "bg-light text-white" : "bg-gray-200 text-gray-800"}`}
      >
        English
      </button>
    </div>
    </div>
  );
}

export default LanguageSelector;



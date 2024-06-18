// src/components/LanguageSection.js
import React from "react";
import "../styles/LanguageSection.css";

function LanguageSection({ selectedLanguage, onLanguageChange }) {
  return (
    <div className="language-section">
      <h2>Choose Language</h2>
      <div className="language-options">
        <button
          className={`language-button ${
            selectedLanguage === "english" ? "selected" : ""
          }`}
          onClick={() => onLanguageChange("english")}
        >
          English
        </button>
        <button
          className={`language-button ${
            selectedLanguage === "french" ? "selected" : ""
          }`}
          onClick={() => onLanguageChange("french")}
        >
          French
        </button>
        <button
          className={`language-button ${
            selectedLanguage === "arabic" ? "selected" : ""
          }`}
          onClick={() => onLanguageChange("arabic")}
        >
          Arabic
        </button>
      </div>
    </div>
  );
}

export default LanguageSection;

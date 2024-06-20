import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import options from "../../Annonceform/optionsjob";

const statuts =[
  "Non spécifié",
  "Temps plein",
  "Temps partiel",
  "Contrat à durée déterminée (CDD)",
  "Contrat à durée indéterminée (CDI)",
  "Contrat d'apprentissage",
  "Contrat de professionnalisation",
  "Contrat de stage",
  "Contrat d'intérim",
  "Contrat de freelance",
  "Contrat de mission"
];

const Search = ({ onSearch, resetFilters, applicantsData }) => {
  const [searchData, setSearchData] = useState({
    statut: 'Non spécifié',
    metier: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleClearQuery = () => {
    setSearchData({
      statut: 'Non spécifié',
      metier: ''
    });
    resetFilters();
  };

  return (
    <section className="Search  px-20 -mt-32 relative z-10">
      <div className="grid gap-9 rounded-[10px] p-[1rem] md:p-[3rem] px-0">
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap w-full justify-between items-center rounded-lg gap-[20px] bg-white p-5 shadow-lg shadow-grey-700 dark:bg-slate-600">
            <div className="flex flex-grow items-center">
              <AiOutlineSearch className="icon mr-1 dark:invert" />
              <select
                className="bg-transparent w-full text-green-600 focus:outline-none font-medium dark:text-white border-none"
                name="statut"
                value={searchData.statut}
                onChange={handleInputChange}
              >
                {statuts.map((statut, index) => (
                  <option key={index} value={statut.toLowerCase()}>{statut}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-grow items-center">
              <AiOutlineSearch className="icon mr-1 dark:invert" />
              <select
                className="bg-transparent w-full text-green-600 focus:outline-none font-medium dark:text-white border-none"
                name="metier"
                value={searchData.metier}
                onChange={handleInputChange}
              >
                <option value="">Select Métier</option>
                {options.map((group, index) => (
                  <optgroup key={index} label={group.label}>
                    {group.options.map((option, idx) => (
                      <option key={idx} value={option.value.toLowerCase()}>{option.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-light flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-primary">
              Search
            </button>
            <button type="button" onClick={handleClearQuery} className="bg-primary flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-light">
              Clear
            </button>
          </div>
        </form>
      </div>
    
    </section>
  );
};

export default Search;

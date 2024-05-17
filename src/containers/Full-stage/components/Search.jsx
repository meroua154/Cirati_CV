import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import options from "../../Annonceform/optionsjob";

const statuts = ['all', 'Remote', 'Contract', 'Fulltime', 'Parttime', 'Stager'];

const Search = ({ onSearch, resetFilters, applicantsData }) => {
  const [searchData, setSearchData] = useState({
    statut: 'all',
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
      statut: 'all',
      metier: ''
    });
    resetFilters();
  };

  return (
    <section className="Search px-20">
      <div>
        <h1 className="text-center text-3xl md:text-4xl font-bold mt-32 md:mt-20 leading-relaxed mx-0 md:p-[3rem]">Trouvez le <span className="text-green-600">Profile</span> de vos rêves en quelques clics</h1>
      </div>
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
            <button type="submit" className="bg-[#196a5c] flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-green-500">
              Search
            </button>
            <button type="button" onClick={handleClearQuery} className="bg-[#196a5c] flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-green-500">
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Search;

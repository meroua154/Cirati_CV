import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { sortby, level, typejob } from "../../../Constants";

const Search = ({ onSearch, resetFilters, jobsData }) => {
  const [typeQuery, setTypeQuery] = useState('all');
  const [searchData, setSearchData] = useState({
    title: ''
  });
  const [suggestions, setSuggestions] = useState({
    title: []
  });

  useEffect(() => {
    setSuggestions({
      title: jobsData ? jobsData.map(job => job.title) : []
    });
  }, [jobsData]);

  const getSuggestions = (fieldName, text) => {
    return jobsData.filter((job) =>
      job[fieldName].toLowerCase().includes(text.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      [name]: value
    }));

    const fieldSuggestions = getSuggestions(name, value);
    setSuggestions((prevSuggestions) => ({
      ...prevSuggestions,
      [name]: fieldSuggestions
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      title: searchData.title,
      type: typeQuery
    };
    onSearch(filters);
  };

  const handleClearQuery = () => {
    setTypeQuery('all');
    setSearchData({
      title: ''
    });
    resetFilters();
  };

  const handleSuggestionClick = (value, fieldName) => {
    setSearchData(prevSearchData => ({
      ...prevSearchData,
      [fieldName]: value
    }));
    setSuggestions(prevSuggestions => ({
      ...prevSuggestions,
      [fieldName]: []
    }));
  };

  return (
    <section className="Search px-20 "> 
      <div>
        <h1 className="text-center text-3xl md:text-4xl font-bold mt-32 md:mt-20 leading-relaxed mx-0 md:p-[3rem]">Trouvez le <span className="text-green-600">Profile</span> de vos rêves en quelques clics</h1>
      </div>
      <div className="grid gap-9 rounded-[10px] p-[1rem] md:p-[3rem] px-0 ">
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap w-full justify-between items-center rounded-lg gap-[20px] bg-white p-5 shadow-lg shadow-grey-700 dark:bg-slate-600 "> 
            <div className="flex flex-grow items-center ">
              <AiOutlineSearch className="icon mr-1 dark:invert" />
              <input
                className="bg-transparent w-full text-green-600 focus:outline-none font-medium dark:text-white border-none"
                placeholder="Search Job..."
                type="text"
                name="title"
                value={searchData.title}
                onChange={(e) => handleInputChange(e)} 
              />
            </div>
            <div className="flex flex-grow items-center gap-4">
              <select
                className="outline-none bg-white rounded-md px-4 py-1 dark:bg-slate-600 dark:text-white border-none"
                value={typeQuery}
                onChange={(e) => setTypeQuery(e.target.value)}
              >
                {typejob.map((typeOption) => (
                  <option key={typeOption.id} value={typeOption.value}>
                    {typeOption.value === 'Remote' ? 'stager' : typeOption.value}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-[#196a5c] flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-green-500">
              Search
            </button>
          </div>
        </form>
        {/* Suggestions */}
        <div className="suggestions">
          <ul>
            {suggestions.title.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion, 'title')}>
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;

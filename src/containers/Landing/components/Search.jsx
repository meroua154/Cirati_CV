import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillCloseCircle, AiOutlineHome } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { sortby, level, type } from "../../../Constants";



const Search = ({ onSearch, resetFilters, jobsData }) => {
  const [sortbyQuery, setSortByQuery] = useState('all');
  const [typeQuery, setTypeQuery] = useState('all');
  const [levelQuery, setLevelQuery] = useState('all');
  const [searchData, setSearchData] = useState({
    title: '',
    recruiterName: '',
    address: ''
  });
  const [suggestions, setSuggestions] = useState({
    title: [],
    recruiterName: [],
    address: []
  });
  useEffect(() => {
    setSuggestions({
      title: jobsData ?jobsData.map(job => job.title): [],
      recruiterName:jobsData ? jobsData.map(job => job.recruiterName):[],
      address: jobsData ? jobsData.map(job => job.address):[]
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
      recruiterName: searchData.recruiterName,
      address: searchData.address,
      sortby: sortbyQuery,
      type: typeQuery,
      level: levelQuery
    };
    onSearch(filters);
  };

  const handleClearQuery = () => {
    setSortByQuery('all');
    setTypeQuery('all');
    setLevelQuery('all');
    setSearchData({
      title: '',
      recruiterName: '',
      address: ''
    });
    resetFilters();
  };

  return (
    <section className="Search px-20"> 
     
      <div className="grid gap-9 rounded-[10px] p-[1rem] md:p-[3rem] px-0 " style={{ paddingTop: '60px' }}>
      <div className="mt-32">
        <h1 className="text-center text-3xl md:text-3xl letter-spacing font-bold leading-relaxed mx-0 md:p-[1rem]">Trouvez le <span className="text-light">job</span> de vos rêves en quelques clics</h1>
        <p className="text-lg text-center tracking-widest font-semibold">Parmi plus de <a href="" className="text-primary font-bold">5417</a> postes ouverts</p>
      </div>
        <form onSubmit={handleSearch}>
          <div className="flex flex-wrap w-full justify-between items-center rounded-lg gap-[20px] bg-white p-5 shadow-lg shadow-grey-700 dark:bg-slate-600 "> 
            <div className="flex flex-grow items-center ">
              <AiOutlineSearch className="icon mr-1 dark:invert" />
              <input
                className="bg-transparent w-full text-primary focus:outline-none font-medium dark:text-white border-none"
                placeholder="Search Job..."
                type="text"
                name="title"
                value={searchData.title}
                onChange= {(e) => handleInputChange(e)} 
              />
              {searchData.title && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setSearchData(prevSearchData => ({ ...prevSearchData, title: '' }))} />}
            </div>
            <div className="flex flex-grow justify-between items-center">
              <AiOutlineHome className="icon mr-1 dark:invert" />
              <input
                className="bg-transparent w-full text-primary focus:outline-none font-medium dark:text-white border-none"
                placeholder="Search Company..."
                type="text"
                name="recruiterName"
                value={searchData.recruiterName}
                onChange= {(e) => handleInputChange(e)} 
              />
              {searchData.recruiterName && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setSearchData(prevSearchData => ({ ...prevSearchData, recruiterName: '' }))} />}
            </div>
            <div className="flex flex-grow justify-between items-center">
              <GoLocation className="icon mr-1 dark:invert" />
              <input
                className="bg-transparent w-full text-primary focus:outline-none font-medium dark:text-white border-none"
                placeholder="Search Location..."
                type="text"
                name="address"
                value={searchData.address}
                onChange= {(e) => handleInputChange(e)} 
              />
              {searchData.address && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setSearchData(prevSearchData => ({ ...prevSearchData, address: '' }))} />}
            </div>
            <button type="submit" className="bg-light flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-primary">
              Search
            </button>
          </div>
        </form>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <div className="flex  items-center gap-4">
            <label
              htmlFor="relevance"
              className="font-semibold text-[#6f6f6f] dark:text-white"
            >
              Sort By:
            </label>
            <select
              className="outline-none bg-white rounded-md px-4 py-1 dark:bg-slate-600 dark:text-white border-none"
              id="relevance"
              value={sortbyQuery}
              onChange={(e) => setSortByQuery(e.target.value)}
            >
              {sortby.map((options) => (
                <option className="" key={options.id} value={options.value}>
                  {options.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex  items-center gap-4">
            <label
              htmlFor="type"
              className="font-semibold text-[#6f6f6f] dark:text-white"
            >
              Type:
            </label>
            <select
              className="outline-none bg-white rounded-md px-4 py-1 dark:bg-slate-600 dark:text-white border-none"
              name=""
              id="type"
              value={typeQuery}
              onChange={(e) => setTypeQuery(e.target.value)}
            >
              {type.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex  items-center gap-4">
            <label
              htmlFor="level"
              className="font-semibold text-[#6f6f6f] dark:text-white"
            >
              Level:
            </label>
            <select
              className="outline-none bg-white rounded-md px-4 py-1 dark:bg-slate-600 dark:text-white border-none"
              name=""
              id="level"
              value={levelQuery}
              onChange={(e) => setLevelQuery(e.target.value)}
            >
              {level.map((level) => (
                <option key={level.id} value={level.value}>
                  {level.value}
                </option>
              ))}
            </select>
          </div>
          <button className="hover:text-[#2a68ff] text-primary text-md px-2 py-2 dark:text-white" onClick={handleClearQuery}>
            Clear All
          </button>
        </div>
        <div className="suggestions">
          <ul>
            {suggestions.title.map((job) => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
          <ul>
            {suggestions.recruiterName.map((job) => (
              <li key={job.id}>{job.recruiterName}</li>
            ))}
          </ul>
          <ul>
            {suggestions.address.map((job) => (
              <li key={job.id}>{job.address}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;

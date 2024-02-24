import React, { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillCloseCircle, AiOutlineHome } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { sortby, level, type } from "../../../Constants";

const Search =  ({ onSearch
}) => {
  const [sortbyQuery, setSortByQuery] = useState('Relevance');
  const [typeQuery, setTypeQuery] = useState('Remote');
  const [levelQuery, setLevelQuery] = useState('Beginner');
  const [searchData, setSearchData] = useState({
    title: '',
    recruiterName: '',
    address: ''
  });
  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };
  const handleClearQuery = () => {
    setSortByQuery('Relevance');
    setTypeQuery('Remote');
    setLevelQuery('Beginner');
    setSearchData({
      title: '',
      recruiterName: '',
      address: ''
    });
  };
  return (
    <section className="Search px-20">
      <div>
        <h1 className="text-center text-3xl md:text-4xl font-bold  mt-32  md:mt-20 leading-relaxed mx-0 md:p-[3rem]">Trouvez le <spam className="text-blue-600">job</spam> de vous reves en quelques clics</h1>
      </div>
    <div className="grid gap-9  rounded-[10px] p-[1rem] md:p-[3rem] px-0 ">
      <form onSubmit={handleSearch}>
        <div className="flex flex-wrap w-full justify-between items-center rounded-lg gap-[20px] bg-white p-5 shadow-lg shadow-grey-700 dark:bg-slate-600">
          <div className="flex flex-grow items-center ">
            <AiOutlineSearch className="icon mr-1 dark:invert" />
            <input
              className="bg-transparent w-full text-blue-600 focus:outline-none font-medium dark:text-white border-none"
              placeholder="Search Job..."
              type="text"
              value={searchData.title}
              onChange={handleInputChange}
            />
            {/* {titleQuery && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setTitleQuery('')} />} */}
          </div>
          <div className="flex flex-grow justify-between items-center">
            <AiOutlineHome className="icon mr-1 dark:invert" />
            <input
              className="bg-transparent w-full text-blue-600 focus:outline-none font-medium dark:text-white border-none"
              placeholder="Search Company..."
              type="text"
              value={searchData.recruiterName}
              onChange={handleInputChange}
            />
            {/* {companyQuery && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setCompanyQuery('')} />} */}
          </div>
          <div className="flex flex-grow justify-between items-center">
            <GoLocation className="icon mr-1 dark:invert" />
            <input
              className="bg-transparent w-full text-blue-600 focus:outline-none font-medium dark:text-white border-none"
              placeholder="Search Location..."
              type="text"
              value={searchData.address}
              onChange={handleInputChange}
            />
            {/* {locationQuery && <AiFillCloseCircle className="text-lg text-[#a5a6a6] hover:text-black hover:dark:invert cursor-pointer" onClick={() => setLocationQuery('')} />} */}
          </div>
          <button type="submit" className="bg-[#2a68ff] flex-grow shrink text-white max-w-full p-3 px-10 rounded-[10px] w-30 hover:bg-blue-500">
            Search
          </button>
        </div>
      </form>
      {/* {searched && (titleQuery || companyQuery || locationQuery) && (
        <ul>
          {filteredJobs.map(job => (
            <li key={job.id}>
              <h3>{job.title}</h3>
              <p>Company: {job.company}</p>
              <p>Location: {job.location}</p>
            </li>
          ))}
        </ul>
      )}
      {searched && !(titleQuery || companyQuery || locationQuery) && (
        <p className="md:ml-2 ml-2">No search criteria entered.</p>
      )}
      {!searched && (
        <p>Enter search criteria to begin.</p>
      )} */}
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
                <option key={level.id} value={level.id}>
                  {level.value}
                </option>
              ))}
            </select>
          </div>
          <button className="hover:text-[#2a68ff] text-[#6f6f6f] text-md px-2 py-2 dark:text-white" onClick={handleClearQuery}>
            Clear All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Search;

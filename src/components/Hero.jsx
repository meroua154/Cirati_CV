import React, { useState } from 'react';
import { HiSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import femme from "../assets/Images/femme.jpg";

export default function Hero({ setSearchTerm, setLocation }) {
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationClick = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleLocationSelect = (location) => {
    setLocation(location);
    setLocationDropdownOpen(false);
  };
  const wilayas = [
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
    "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
    "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
    "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
    "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
    "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipasa", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
    "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
  ];
  console.log(wilayas.length)
  return (
    <div className="pt-24">
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6 bg-cover" style={{ backgroundImage: `url(${femme})` }}>
        <h1 className="xl:text-4xl lg:text-3xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center ml-64">
          Find your{" "}
          <span className="bg-primary text-white whitespace-pre">
            dream jobs
          </span>{" "}
          in <br /> New Castle
        </h1>
        <p className="text-lg lg:w-1/2 text-center leading-10 my-8 ml-8">
          When you're searching for a job, there are a few things you can do to
          get the most out of your search
        </p>
        <div className="flex items-center border-2 border-solid border-primary rounded-full h-16 lg:w-2/5 w-full py-2 relative mt-4">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="bg-transparent h-full w-full border-none outline-none absolute px-20 xl:text-2xl text-base"
            onChange={handleSearch}
          />
          <button className="bg-primary rounded-full text-white w-12 h-12 absolute left-2 border-none flex items-center justify-center">
            <HiSearch className="text-2xl" />
          </button>
          <button className="flex items-center bg-[#f3f3f4] absolute right-2 rounded-full lg:px-4 px-2 h-[90%] xl:text-xl text-sm font-normal gap-x-2 border-none"
          onClick={handleLocationClick}
          >
            <IoLocationOutline className="text-black lg:text-2xl" /> Any
            location
          </button>
          {locationDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10 overflow-auto max-h-64">
                {wilayas.map((wilaya) => (
                  <button
                    key={wilaya}
                    onClick={() => handleLocationSelect(wilaya)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    {wilaya}
                  </button>
                ))}
                <button
                  onClick={() => handleLocationSelect('')}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                >
                  Any Location
                </button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

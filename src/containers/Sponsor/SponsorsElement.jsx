import React, { useState, useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Sponsors = ({ SponsorsData }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const sponsorsPerPage = 6;

  const indexOfLastSponsor = currentPage * sponsorsPerPage;
  const indexOfFirstSponsor = indexOfLastSponsor - sponsorsPerPage;
  const currentSponsors = SponsorsData.slice(indexOfFirstSponsor, indexOfLastSponsor);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="sponsors" className="full-width-div">
      <div data-aos="zoom-in-down" data-aos-duration="2000" className="container mx-auto px-16 pb-24">
        {/* <h2 className="text-center text-3xl font-bold pt-12 pb-8 md:pt-20 md:pb-8 dark:text-white lettre-espace">Derniers sponsors</h2> */}
        <div className="flex sm:items-center gap-8 flex-wrap md:ml-16 sm:px-2 sm:py-10">
          {currentSponsors.map((sponsor) => {
            return (
              <div key={sponsor._id}
                className="flex flex-col justify-between h-[350px] w-[250px] p-3 md:p-[20px] md:mx-4 mx-auto bg-white rounded-md shadow-lg shadow-gray-400 dark:hover:bg-blueColor hover:bg-primary dark:bg-slate-700 dark:shadow-none sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4"
              >
                <div className="upperpart flex justify-between">
                  <div className="titlecountry flex-grow">
                    <p className="title font-bold group-hover:text-white text-xl dark:text-blueColor">
                      {sponsor.title}
                    </p>
                    <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
                      {sponsor.projectLocation}
                    </p>
                    <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
                      {sponsor.sector.join(", ")}
                    </p>
                    <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
                      {sponsor.budget} DA
                    </p>
                  </div>
                  <span className="mt-[-5px] text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-300">
                    <BiTimeFive className="inline mb-0.5 mt-2 mr-1" />
                    {sponsor.partnershipDuration}
                  </span>
                </div>
                <div className="lowerpart border-t-2 mt-4 group-hover:text-white">
                  <p className="mt-4 text-sm text-[#adaaaa] group-hover:text-white dark:text-slate-200">
                    {sponsor.projectDescription}
                  </p>
                  <Link to={`mailto:${sponsor.primaryContactEmail}`} className="company flex justify-start items-center mt-4 mb-3">
                    <p className="text-sm font-medium ml-1 dark:text-slate-300">
                      {sponsor.primaryContactName}
                    </p>
                  </Link>
                  <Link to={`mailto:${sponsor.primaryContactEmail}`} className="company flex justify-start items-center mt-4 mb-3">
                    <p className="text-sm font-medium ml-1 dark:text-slate-300">
                      {sponsor.primaryContactEmail}
                    </p>
                  </Link>
                </div>
         <a href={`mailto:${sponsor.primaryContactEmail}`}>
  <button className="border-[2px] font-medium rounded-[10px] block p-2 w-full dark:text-slate-100 dark:bg-blueColors dark:border-transparent dark:group-hover:border dark:group-hover:border-white dark:hover:text-blueColor dark:hover:bg-white hover:bg-white">
    Contacter
  </button>
</a>

              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
            </svg>
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;

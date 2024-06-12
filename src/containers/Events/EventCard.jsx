import React, { useState, useEffect } from 'react';
import { BiTimeFive } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EventCard = ({ eventData }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section id="events" className="full-width-div">
      <div data-aos="zoom-in-down" data-aos-duration="2000" className="container mx-auto px-16 pb-24">
        <div className="flex sm:items-center gap-8 flex-wrap md:ml-16 sm:px-2 sm:py-10">
          {currentEvents.map((event) => (
            <div key={event._id} className="flex flex-col justify-between h-[350px] w-[250px] p-3 md:p-[20px] md:mx-4 mx-auto bg-white rounded-md shadow-lg shadow-gray-400 dark:hover:bg-blueColor hover:bg-primary dark:bg-slate-700 dark:shadow-none sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4">
              <div className="upperpart flex justify-between">
                <div className="titlecountry flex-grow">
                  <p className="title font-bold group-hover:text-white text-xl dark:text-blueColor">{event.titre}</p>
                  <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400">{event.lieu}</p>
                  {event.secteur && event.secteur.length > 0 && (
  <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
    {event.secteur.map((item) => item.value).join(", ")}
  </p>
)}
                {event.typeEvenement && event.typeEvenement.length > 0 && (
  <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
    {event.typeEvenement.map((item) => item.value).join(", ")}
  </p>
)}
                  <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400">{event.
organisateur}</p>
                <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400">{event.
emailContact} , {event.
  telephoneContact} 
</p>
                </div>
                <span className="mt-[-5px] text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-300">
                  <BiTimeFive className="inline mb-0.5 mt-2 mr-1" />
                  {event.date},{event.heure}
                </span>
              </div>
              <div className="lowerpart border-t-2 mt-4 group-hover:text-white">
                <p className="mt-4 text-sm text-[#adaaaa] group-hover:text-white dark:text-slate-200">{event.promotionMedia}</p>
                <Link to={`mailto:${event.emailContact}`} className="company flex justify-start items-center mt-4 mb-3">
                  <p className="text-sm font-medium ml-1 dark:text-slate-300">{event.partenariatsExistants}</p>
                </Link>
                <Link to={`mailto:${event.emailContact}`} className="company flex justify-start items-center mt-4 mb-3">
                  <p className="text-sm font-medium ml-1 dark:text-slate-300">{event.description}</p>
                </Link>
              </div>
              {/* <a href={`mailto:${event.primaryContactEmail}`}>
                <button className="border-[2px] font-medium rounded-[10px] block p-2 w-full dark:text-slate-100 dark:bg-blueColors dark:border-transparent dark:group-hover:border dark:group-hover:border-white dark:hover:text-blueColor dark:hover:bg-white hover:bg-white">Contacter</button>
              </a> */}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventCard;

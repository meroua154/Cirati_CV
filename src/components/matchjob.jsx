import React, { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi';
import Star from './Star';

const Jobs = ({ type, img, title, color, bg_color }) => {
  return (
    
    <div className="shadow lg:w-[95%] mt-12"> 
      <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
        <span className="flex items-center justify-between w-full">
          <button
            className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
            style={{ border: `3px solid ${color}` }}
          >
            {type}
          </button>
        <Star/>
        </span>
        <img src={img} alt="" className="w-28 h-28 rounded-full my-8" />
      </div>
      <div
        className="rounded-b-md px-6 py-8"
        style={{ backgroundColor: bg_color }}
      >
        <p className="text-2xl font-semibold">{title}</p>
        <p className="py-2 text-lg">803 46th St Brooklyn, NY</p>
        <div className="pb-4 flex items-center gap-2">
          {[...Array(5)].map((_, index) => {
            return <HiStar key={index} className="text-[#FFCC02] text-2xl" />;
          })}
        </div>
        <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
          <p>Salary</p>
          <p style={{ color: `${color}` }}>Rs. 3,457.00</p>
        </div>
      </div>
    </div>
  );
};

const Matchingjob = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = isDesktop ? 6 : 12; // Adjust the number of jobs per page based on the device
  const jobsData = [
    { type: "Internship", img: "/person1.jfif", title: "Product Design" },
    { type: "Internship", img: "/person2.jfif", title: "Product Mockup" },
    { type: "Full Time", img: "/person3.jfif", title: "Web Maintenance" },
    { type: "Full Time", img: "/person4.jfif", title: "PHP Developer" },
    { type: "Full Time", img: "/person5.jfif", title: "Web Maintenance" },
    { type: "Full Time", img: "/person6.jfif", title: "PHP Developer" },
    { type: "Internship", img: "/person7.jfif", title: "Software Engineer" },
    { type: "Part Time", img: "/person8.jfif", title: "Frontend Developer" },
    { type: "Full Time", img: "/person9.jfif", title: "iOS Developer" },
    { type: "Contract", img: "/person10.jfif", title: "UI/UX Designer" },
    { type: "Remote", img: "/person11.jfif", title: "Cloud Engineer" },
    { type: "Internship", img: "/person12.jfif", title: "Graphic Designer" },
    { type: "Full Time", img: "/person1.jfif", title: "Web Developer" },
    { type: "Full Time", img: "/person15.jfif", title: "Backend Developer" }
  ];
  

  const colors = ["#4b4efc", "#fec220", "#c72b66", "#349c30", "#b91d73", "#333333", "#17b978", "#0d6efd"];
  const bgColors = ["#f4f4ff", "#fffbf2", "#fbf2f6", "#e8f3ea", "#fef4f6", "#f5f6fc", "#fef4f6", "#f2f2f2", "#f8fafb", "#eef8fa", "#f4f4ff", "#fffbf2"];

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1024);
  };

  const renderJobs = () => {
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobsData.slice(indexOfFirstJob, indexOfLastJob);
  
    return currentJobs.map((job, index) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
      return (
        <div key={index} className="job-card">
          <Jobs
            bg_color={randomBgColor}
            color={randomColor}
            img={job.img}
            title={job.title}
            type={job.type}
          />
        </div>
      );
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(jobsData.length / jobsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-[#fafbfc]">
      <div className="container mx-auto px-6 py-24 pt-0 grid gap-12">
        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {renderJobs()}
        </div>
        {/* Pagination buttons */}
        <div className="flex justify-center mt-4">
  <button
    className={`rounded-full py-2 px-4 mr-2 ${currentPage === 1 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-400'}`}
    onClick={handlePrevPage}
    disabled={currentPage === 1}
  >
    Previous
  </button>
 
  {/*pageNumbers.map(number => (
    <button
      key={number}
      onClick={() => paginate(number)}
      className={`rounded-full py-2 px-4 mr-2 ${currentPage === number ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}
    >
      {number}
    </button>
  ))*/}
  <button
    className={`rounded-full py-2 px-4 ${currentPage === pageNumbers.length ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-green-500 text-white  hover:bg-green-400' }`}
    onClick={handleNextPage}
    disabled={currentPage === pageNumbers.length}
  >
    Next
  </button>
</div>
      </div>
    </div>
  );
};

export default Matchingjob;

import React, { useEffect } from "react";
import { BiTimeFive } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Jobs = ({ JobsData }) => {
  useEffect(() => {
    AOS.init();
  }, []); 

  const navigate = useNavigate();

  const handleApplyNow = (recId, id) => {
    const applicationUrl = `/singleoffre/${recId}/${id}`;
    navigate(applicationUrl);
  };

  return (
    <section id="jobs" className="full-width-div">
      <div data-aos="zoom-in-down" data-aos-duration="2000" className="container mx-auto px-16 pb-24">
        <h2 className="text-center text-3xl font-bold pt-12 pb-8 md:pt-20 md:pb-8 dark:text-white lettre-espace">Dernieres offres</h2>
        <div className="flex sm:items-center gap-8 flex-wrap md:ml-16 sm:px-2 sm:py-10">
          {JobsData.map((job) => {
            return (
              <div key={job.id}
                className="flex flex-col justify-between h-[350px] w-[250px] p-3 md:p-[20px] md:mx-4 mx-auto bg-white rounded-md shadow-lg shadow-gray-400 dark:hover:bg-blueColor hover:bg-primary dark:bg-slate-700 dark:shadow-none sm:w-full md:w-1/3 lg:w-1/4 xl:w-1/4"
              >
                <div className="upperpart flex justify-between">
                  <div className="titlecountry flex-grow">
                    <p className="title font-bold group-hover:text-white text-xl dark:text-blueColor">
                      {job.title}
                    </p>
                    <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
                      {job.address}
                    </p>
                    <p className="text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-400 ">
                      {job.Contratype}
                    </p>
                    <p className="mt-2 text-sm dark:text-slate-200">
                      {Object.entries(job.secteur).map(([secteur, sousSecteurs], index) => (
                        <React.Fragment key={index}>
                          {index > 0 && ", "}
                          {secteur}: {sousSecteurs.join(", ")}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                  <span className="mt-[-5px] text-[#8b8b8b] group-hover:text-[#dadada] dark:text-slate-300">
                    <BiTimeFive className="inline mb-0.5 mt-2 mr-1" />
                    {job.duration}
                  </span>
                </div>
                <div className="lowerpart border-t-2 mt-4 group-hover:text-white ">
                  <p className="mt-4 text-sm text-[#adaaaa] group-hover:text-white dark:text-slate-200">
                    {job.description}
                  </p>
                  <Link to={`/company/${job.recruiter}`} className="company flex justify-start items-center mt-4 mb-3">
                    <img
                      className="p-0"
                      src={job.recruiterPic}
                      width={25}
                      height={25}
                      alt={job.recruiterName}
                    />
                    <p className="text-sm font-medium ml-1 dark:text-slate-300">
                      {job.recruiterName}
                    </p>
                  </Link>
                </div>
                <button
                  className="border-[2px] font-medium rounded-[10px] block p-2 w-full dark:text-slate-100 dark:bg-blueColors dark:border-transparent dark:group-hover:border dark:group-hover:border-white dark:hover:text-blueColor dark:hover:bg-white hover:bg-white"
                  onClick={() => handleApplyNow(job.recruiter, job._id)}
                >
                  Apply Now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;

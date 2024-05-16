import Carousel from "react-multi-carousel";
import { HiStar } from "react-icons/hi";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react';

const getColor = (type) => {
  switch (type) {
    case 'Full Time':
      return "#4b4efc";
    case 'Part Time':
      return "#fec220";
    case 'Remote':
      return "#333333";
    case 'Contract':
      return "#666666";
    default:
      return "#333333";
  }
};

const Jobs = ({ job }) => {
  const { _id, title, address, Contratype, salary, recruiterName, recruiterPic } = job;
  const secteurArray  = Object.keys(job.secteur);

  return (
    <div className="job-card mx-8">
      <div className="shadow lg:w-[95%] mt-12">
        <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
          <span className="flex items-center justify-between w-full">
            <button
              className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
              style={{ border: `3px solid ${getColor(Contratype)}` }}
            >
              {Contratype}
            </button>
          </span>
          <img src={recruiterPic} alt="" className="w-28 h-28 rounded-full my-8" />
        </div>
        <div className="rounded-b-md px-6 py-8">
        <p className="text-lg font-bold">{title}</p>
          <p className="py-2 text-lg">{secteurArray.join(', ')}</p>
        
          <p className="py-2 text-lg">{address}</p>
          <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
            <p>Salary</p>
            <p style={{ color: getColor(Contratype) }}>{salary} DA</p>
          </div>
          <p className="py-2 text-lg">{recruiterName}</p>
        </div>
      </div>
    </div>
  );
};

export default function Matchigstage({jobs}) {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#fafbfc]">
      <div className="container mx-auto px-6 py-24 grid gap-12">
        <h2 className="text-3xl font-semibold">Matching Jobs</h2>
        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}> 
        {jobs&&jobs.map(job => (
            <Jobs key={job._id} job={job} />
          ))}

        </div>
      </div>
    </div>
  );
}

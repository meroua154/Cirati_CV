import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { removeSavedJob, addSavedJob, fetchSavedJobs } from '../containers/mesSauvegardes/slices/savedJobsSlice';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { fetchAllJobs } from '../containers/Landing/slices/jobsSlice';
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
  const dispatch = useDispatch();
  const { _id, title, address, Contratype, salary, recruiterName, recruiterPic } = job;
  const secteurArray = Object.keys(job.secteur);
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  const userId = useSelector((state) => state.auth.user._id);
  const isSaved = savedJobs.some(savedJob => savedJob.job._id === _id);

  const [isHearted, setIsHearted] = useState(isSaved);

  useEffect(() => {
    AOS.init();
    dispatch(fetchSavedJobs(userId));
    dispatch(fetchAllJobs());
  }, [dispatch, userId]);



  const toggleHeart = (e) => {
    e.stopPropagation();
  
    if (isHearted) {
      dispatch(removeSavedJob(_id))
        .then(() => dispatch(fetchAllJobs())); 
    } else {
      dispatch(addSavedJob({ userId: userId, jobId: _id }))
        .then(() => dispatch(fetchAllJobs())); 
    }
    setIsHearted(!isHearted);
  };

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="job-card mx-8">
      <div className="shadow lg:w-[95%] mt-12">
        <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
          <span className="flex items-center justify-between w-full">
            <button
              className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
              style={{ border: `3px solid ${getColor(Contratype)}` }}
            >
              {Contratype}
            </button>
            {isHearted ? (
              <HiHeart className="text-2xl text-red-500 cursor-pointer" onClick={toggleHeart} />
            ) : (
              <HiOutlineHeart className="text-2xl cursor-pointer" onClick={toggleHeart} />
            )}
          </span>
          <Link to={`/singleoffre/${job.recruiter}/${job._id}`} className="block">
            <img src={recruiterPic} alt="" className="w-28 h-28 rounded-full my-8" />
          </Link>
        </div>
        <Link to={`/singleoffre/${job.recruiter}/${job._id}`} className="block">
          <div className="rounded-b-md px-6 py-8">
            <p className="text-lg font-bold">{title}</p>
            <p className="py-2 text-lg">{secteurArray.join(', ')}</p>
            <p className="py-2 text-lg">{address}</p>
            <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
              <p>Société</p>
              <p style={{ color: getColor(Contratype) }}>{recruiterName}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

const MatchingJobs = ({ jobs }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchSavedJobs(userId));
  }, [dispatch, userId]);

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="bg-[#fafbfc]">
      <div className="container mx-auto px-6 py-20 grid gap-12">
        <h2 className="text-center text-3xl font-bold pt-12 pb-8 md:pb-8 dark:text-white lettre-espace">Les offres d'emploi</h2>
        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {jobs && jobs.map(job => (
            <Jobs key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingJobs;

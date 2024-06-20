import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { removeSavedJob} from '../slices/savedJobsSlice';
import { fetchSavedJobs } from '../slices/savedJobsSlice';
import { useSelector } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const SavedJobElement = ({ savedJob }) => {
  const dispatch = useDispatch();
  const { _id, title, address, Contratype, recruiterName,recruiter, recruiterPic } = savedJob.job;
  const secteurArray = Object.keys(savedJob.job.secteur);
  const userId = useSelector((state) => state.auth.user._id);
  useEffect(() => {
    AOS.init();
  }, []);

  const toggleHeart = (e) => {
    e.stopPropagation();

    dispatch(removeSavedJob(_id))
      .then(() => dispatch(fetchSavedJobs(userId)));
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
            <HiHeart className="text-2xl text-red-500 cursor-pointer" onClick={toggleHeart} />
          </span>
          <Link to={`/singleoffre/${recruiter}/${_id}`} className="block">
            <img src={recruiterPic} alt="" className="w-28 h-28 rounded-full my-8" />
          </Link>
        </div>
        <Link to={`/singleoffre/${recruiter}/${_id}`} className="block">
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

export default SavedJobElement;

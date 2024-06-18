import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmploisByRecruiter } from'../slices/JobsSlice'; 
import JobElement from './JobElement'; 
const JobsList = ({ recruiterId }) => {
  const dispatch = useDispatch();
  const jobs =  useSelector((state) => state.emploi.emplois);
  const jobStatus = useSelector((state) => state.emploi.status);
  const error = useSelector((state) => state.emploi.error);

  useEffect(() => {
    if (jobStatus === 'idle') {
      dispatch(fetchEmploisByRecruiter(recruiterId));
    }
  }, [jobStatus, dispatch, recruiterId]);

  let content;

  if (jobStatus === 'loading') {
    content = <div></div>;
  } else if (jobStatus === 'succeeded') {
    content = jobs.map((job) => <JobElement key={job._id} job={job} />);
  } else if (jobStatus === 'failed') {
    content = <div></div>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-full p-8 mt-24 bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 md:ml-16">Mes emplois publiés</h1>
        {content}
      </div>
    </div>
  );
};

export default JobsList;

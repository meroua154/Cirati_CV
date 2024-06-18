import React from 'react';
import JobsList from './components/Jobslist';
import { useSelector } from 'react-redux';

const MesEmplois = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <JobsList recruiterId={user._id} />
    </div>
  );
};

export default MesEmplois;

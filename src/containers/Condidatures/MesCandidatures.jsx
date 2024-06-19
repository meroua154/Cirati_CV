import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobApplications } from './slices/candidatureSlice';
import CondidatureElement from './components/CondidatureElement';
import { useLocation } from "react-router";

const MesCandidatures = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { candidatures, loading, error, status } = useSelector((state) => state.candidatures);
  const jobId = location.state?.jobId || null;

  useEffect(() => {
    if (jobId) {
      dispatch(fetchJobApplications(jobId));
    }
  }, [jobId, dispatch]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-full p-8 mt-24 bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 md:ml-16">Les candidatures</h1>
        {loading && <p>Chargement...</p>}
        {error && <p>Erreur lors du chargement des candidatures.</p>}
        {status === 'succeeded' && candidatures.map((application) => (
          <CondidatureElement key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default MesCandidatures;

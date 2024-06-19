import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSavedJobs, removeSavedJob } from './slices/savedJobsSlice';
import SavedJobElement from './components/savedJobItem';

const SavedJobsPage = () => {
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const savedJobs = useSelector((state) => state.savedJobs.savedJobs);
  const loading = useSelector((state) => state.savedJobs.loading);
  const error = useSelector((state) => state.savedJobs.error);
  const userId = useSelector((state) => state.auth.user._id);
  useEffect(() => {
    dispatch(fetchSavedJobs(userId));
  }, [dispatch, userId]);
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleRemoveSavedJob = (savedJobId) => {
    dispatch(removeSavedJob(savedJobId));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-full p-8 mt-24 bg-slate-50">
      <h1 className="text-2xl font-bold mb-4 md:ml-16">Mes Sauvegardes</h1>
      <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
        {savedJobs &&   savedJobs.map((savedJob) => (
          <SavedJobElement
            key={savedJob._id}
            savedJob={savedJob}
            onRemoveSavedJob={handleRemoveSavedJob}
          />
        ))}
                </div>
      </div>
    </div>
  );
};

export default SavedJobsPage;
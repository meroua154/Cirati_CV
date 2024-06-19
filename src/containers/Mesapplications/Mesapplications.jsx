import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserApplications } from './slices/Applicationslices';
import ApplicationElement from './components/application';

const Mesapplications = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { applications, loading, error, status } = useSelector((state) => state.applications);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserApplications(user._id));
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="flex flex-col md:flex-row">
         <div className="w-full md:w-1/4 md:h-screen  mt-24">
        <ul className="mt-8">
        <a href="/user">
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fa-user mr-2"></i> Mon Profil</li>
          </a>
          <a href="/messauvegardes">
          <li className="flex items-center p-4 hover:bg-gray-300"><i className="fas fas fa-bookmark mr-2"></i> Mes sauvegardes</li>
          </a>
   
          <a href="/mesapplications">
  <li className="flex items-center p-4 hover:bg-gray-300">
    <i className="fas fa-file mr-2"></i> Mes Applications
  </li>
</a>

        </ul>
      </div>
      <div className="w-full md:w-3/4 p-8 mt-24 bg-slate-50">
        <h1 className="text-2xl font-bold mb-4 md:ml-16">Mes applications</h1>
        {status === 'loading' && <p></p>}
        {status === 'failed' && <p></p>}
        {status === 'succeeded' && applications.map((application) => (
          <ApplicationElement key={application._id} application={application} />
        ))}
      </div>
    </div>
  );
};

export default Mesapplications;

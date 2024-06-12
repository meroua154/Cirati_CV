import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicants, setFilteredApplicants, resetFilters } from './slices/applicantsSlice';
import Search from './components/Search';
import Matchingjob from '../../components/matchjob';
import cv from "../../assets/Images/cv.jpg"
import AOS from 'aos';


export default function Fullcv() {
  const dispatch = useDispatch();
  const applicantsData = useSelector((state) => state.applicants.applicantsData);
  const filteredApplicants = useSelector((state) => state.applicants.filteredApplicants);

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const handleSearch = (searchData) => {
    const filtered = applicantsData.filter(applicant => {
      const statut = applicant.preferences.statut ? applicant.preferences.statut.toLowerCase() : '';
      const metier = applicant.preferences.metier ? applicant.preferences.metier.toLowerCase() : '';
      return (
        (searchData.statut === 'all' || statut.includes(searchData.statut.toLowerCase())) &&
        (searchData.metier === '' || metier.includes(searchData.metier.toLowerCase()))
      );
    });
    dispatch(setFilteredApplicants(filtered));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  
  useEffect(() => {
    AOS.init();
  }, []); 


  return (
    <div>
      <div
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              className="relative h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${cv})` }}
>
           <div className="absolute inset-0 bg-black opacity-50 filter blur-sm"></div>
           <div className="relative z-10 flex items-center justify-center h-full">
           <div className="text-center text-white p-8">
               <h1 className='text-3xl sm:text-5xl font-extrabold'>
                  Votre prochain job vous attend!
               </h1>
               <p className='text-xl mt-8  pl-8'>
                  <strong>Publiez</strong> votre demande d'emploi et trouvez rapidement <strong>l'opportunité</strong> idéale sur notre plateforme.
               </p>
               <div className='mt-12'>
                      <a href="/SponsorForm">
                          <button className="btn bg-light text-white border border-blue-600 text-sm whitespace-nowrap py-2 px-8 text-center rounded-2xl">
                             Créez une demande d'emploi
                          </button>
                      </a>
               </div>
           </div>
        </div>
    </div>
      <Search onSearch={handleSearch} resetFilters={handleResetFilters} applicantsData={applicantsData} />
      <div><Matchingjob applicants={filteredApplicants} /></div>
    </div>
  );
}

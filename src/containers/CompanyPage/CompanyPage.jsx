import React, { useEffect, useState } from 'react';
import Head from './components/Head';
import Map from './components/Map';
import Description from './components/Description';
import Offre from './components/Offre';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom';
import { fetchCompany,fetchJobs,selectCompanyStatus  } from './Slices/CompanySlice';
const CompanyPage = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const {id} = useParams(); 
  const company=useSelector((state) => state.company.companyData);
  const deuxDernieresOffres =  useSelector((state) => state.jobs.jobsData);
  const loadingStatus = useSelector(selectCompanyStatus);
  const ToutesLesOffres = (recId) => {
    const applicationUrl = `/offres/${recId}`;
    navigate(applicationUrl);
  };
  useEffect(() => {
   
    dispatch(fetchCompany(id)); 
    dispatch(fetchJobs(id)); 
}, [dispatch, id]);


  
  return (
    <div>
    <div className="bg-gray-100 min-h-screen relative">
      <div className=''>
      <Head 
        coverPhoto={company.coverpic}
        profilePhoto={company.profilpic}
        companyName={company.name}
        Location={company.localisation}
        website={company.website}
        facebookLink={company.Facebook}
        linkedinLink={company.LinkedIn}
        idcomp={id}
        isLoading={loadingStatus === 'loading'} 

      />
      </div>
       
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row mt-24 mx-8">
        <div className="bg-white p-8 md:basis-2/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
          <div className="flex items-start">
            <div className="ml-2 border-black">
             <h1 className='text-lg font-bold pb-8 border-b-2'>Les derniers offres d'emploi</h1>
             {deuxDernieresOffres.map((offre, index) => (
              <Offre
                key={index}
                title={offre.title}
                poste={offre.title}
                lieu={offre.address}
                diplome={offre.levelEducation}
                experience={offre.AnneeExperience}
                service={Object.keys(offre.secteur).join(', ')} 
            />
            ))}
              <button className="mt-4 text-primary text-sm  px-4 py-2 font-lg"
                 onClick={() => ToutesLesOffres(id)} 
              >
                Voir toutes les offres d'emploi
              </button>
            </div>
          </div>
        
        </div>
        <div className="bg-white p-8 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
           <Description 
              description={company.bio} />
        </div>
<div className="p-8 pb-4 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4 relative" style={{ height: '425px' }}>
    <Map 
        companyName={company.localisation}
        className="mb-8 absolute inset-0" 
    />
</div>

      </div>
    </div>
    </div>
  );
};

export default CompanyPage;

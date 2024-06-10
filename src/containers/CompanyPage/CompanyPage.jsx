import React, { useEffect, useState } from 'react';
import CompanyMap from './CompanyMap'; // Importez le composant CompanyMap
import Head from './components/Head';
import Map from './components/Map';
import yassir from "../../assets/Images/yassir.png"
import yass from "../../assets/Images/yass.png"
import Description from './components/Description';
import Offre from './components/Offre';
import instance from '../../utils/setAuthToken'

import { useParams,useNavigate } from 'react-router-dom';
const CompanyPage = () => {
  const navigate = useNavigate(); 

  const {id} = useParams(); 
  const [company, setCompany] = useState('');
  const [deuxDernieresOffres, setDeuxDernieresOffres] = useState([]);
  const ToutesLesOffres = (recId) => {

    const applicationUrl = `/singleoffre/${recId}`;
    navigate(applicationUrl);
  };
  useEffect(() => {
   
    const fetchCompany = async () => {
      try {
        const response = await instance.get(`/user/recruiter/${id}`);
        const companyData = response.data; 
        setCompany(companyData); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'entreprise:', error);
      }
    };

    fetchCompany();

    const fetchDernieresOffres = async () => {
      try {
        const response = await instance.get(`/job/latest_jobs/${id}`);
        const data = response.data;
        setDeuxDernieresOffres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dernières offres d\'emploi:', error);
      }
    };

    fetchDernieresOffres();
  }, [id]);


  
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
        

      />
      </div>
       
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row mt-24 mx-8">
        {/* Boîte 1 */}
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
       {/* Boîte 2 */}
<div className="p-8 pb-4 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4 relative" style={{ height: '425px' }}>
    <Map 
        companyName={company.localisation}
        className="mb-8 absolute inset-0" // Ajoutez la classe absolute et inset-0 pour remplir toute la boîte
    />
</div>

      </div>
    </div>
    </div>
  );
};

export default CompanyPage;

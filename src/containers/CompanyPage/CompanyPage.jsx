import React, { useEffect, useState } from 'react';
import CompanyMap from './CompanyMap'; // Importez le composant CompanyMap
import Head from './components/Head';
import Map from './components/Map';
import yassir from "../../assets/Images/yassir.png"
import yass from "../../assets/Images/yass.png"
import Description from './components/Description';
import Offre from './components/Offre';
import instance from '../../utils/setAuthToken';
const CompanyPage = () => {
  const idcomp = '662c00b86646862a4001b896'; 
  const [company, setCompany] = useState('');
  const [deuxDernieresOffres, setDeuxDernieresOffres] = useState([]);

  useEffect(() => {
   
    const fetchCompany = async () => {
      try {
        const response = await instance.get(`http://localhost:4000/user/recruiter/${idcomp}`);
        const companyData = response.data; 
        setCompany(companyData); 
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'entreprise:', error);
      }
    };

    fetchCompany();

    const fetchDernieresOffres = async () => {
      try {
        const response = await instance.get(`http://localhost:4000/job/latest_jobs/${idcomp}`);
        const data = response.data;
        setDeuxDernieresOffres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dernières offres d\'emploi:', error);
      }
    };

    fetchDernieresOffres();
  }, [idcomp]);


  
  return (
    <div>
    <div className="bg-gray-100 min-h-screen relative" style={{ paddingTop: '44px' }}>
      <div className=''>
      <Head 
        coverPhoto={company.coverpic}
        profilePhoto={company.profilpic}
        companyName={company.name}
        Location={company.localisation}
        website={company.website}
        facebookLink={company.Facebook}
        linkedinLink={company.LinkedIn}
      />
      </div>
       
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row mt-24 mx-8">
        {/* Boîte 1 */}
        <div className="bg-white p-8 md:basis-2/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
          <div className="flex items-start">
            <div className="ml-2 border-black">
             <h1 className='text-lg font-bold pb-8 border-b-2'>Les derniers offres d'emploi</h1>
             <Offre
                title="Développeur Full Stack"
                poste="Développeur Full Stack"
                lieu="Paris, France"
                diplome="Bac+5 en informatique"
                experience="2 ans d'expérience minimum"
                service="Développement web"
              />
              <Offre
                title="Designer UI/UX"
                poste="Designer UI/UX"
                lieu="New York, USA"
                diplome="Bac+3 en design graphique"
                experience="Expérience dans le design d'interfaces utilisateur"
                service="Conception visuelle"
              />
              <button className="mt-4 text-primary text-sm  px-4 py-2 font-lg">
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
        <div className="p-8 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: '425px', position: 'relative' }}>
            <Map 
              companyName={company.localisation}
            />
        </div>
      </div>
    </div>
    </div>
  );
};

export default CompanyPage;

import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import CompanyMap from './CompanyMap'; // Importez le composant CompanyMap
import Head from './components/Head';
import Map from './components/Map';
import yassir from "../../assets/Images/yassir.png"
import yass from "../../assets/Images/yass.png"
import Description from './components/Description';
import Offre from './components/Offre';

const CompanyPage = () => {
  const idcomp = '65d4b14cb1ef74374875bf9a'; // ID de l'entreprise
  const [company, setCompany] = useState('');
  const [deuxDernieresOffres, setDeuxDernieresOffres] = useState([]);
  const [companyLocation, setCompanyLocation] = useState(null);

  useEffect(() => {
   
    const fetchCompany = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/user/recruiter/${idcomp}`);
        const companyData = response.data; 
        setCompany(companyData); 
        const location = await getLocationCoordinates(companyData.localisation);
        setCompanyLocation(location);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'entreprise:', error);
      }
    };

    fetchCompany();

    const fetchDernieresOffres = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/job/latest_jobs/${idcomp}`);
        const data = response.data;
        setDeuxDernieresOffres(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des dernières offres d\'emploi:', error);
      }
    };

    fetchDernieresOffres();
  }, [idcomp]);

  const getLocationCoordinates = async (location) => {
    try {
      const response = await Axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`);
      const data = response.data;
      if (data.length > 0) {
        const result = data[0];
        console.log(result)
        return { latitude: result.lat, longitude: result.lon };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des coordonnées de localisation:', error);
      return null;
    }
  };
  
  return (
    <div>
    <div className="bg-gray-100 min-h-screen relative" style={{ paddingTop: '44px' }}>
      <div className=''>
      <Head 
        coverPhoto={yass}
        profilePhoto={yassir}
        companyName="Nom de votre entreprise"
        Location="Alger, Bir Mourad Rais "
        website="https://yassir.com/"
        facebookLink="https://web.facebook.com/Yassir.Algerie/?locale=fr_FR&_rdc=1&_rdr"
        linkedinLink="https://www.linkedin.com/company/yassir/" 
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
              description="Créé en 2017, YASSIR est le premier opérateur ayant développé et lancé une plateforme de mise en relation numérique pour les déplacements personnalisés des citoyens, en Algérie fondé par des Algériens avec un riche parcours académique et entrepreneurial entre l'Algérie et La Silicon Valley.

              Avec plus de 100 000 partenaires chauffeurs / livreurs YASSIR
              couvre 38 Willayas.
              " />
        </div>
        {/* Boîte 2 */}
        <div className="p-8 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: '425px', position: 'relative' }}>
        <Map></Map>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CompanyPage;

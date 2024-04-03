
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CompanyMap from './CompanyMap';
import Head from './components/Head';
import Map from './components/Map';
import yassir from "../../assets/Images/yassir.png";
import yass from "../../assets/Images/yass.png";
import Description from './components/Description';
import Offre from './components/Offre';

const CompanyPage = () => {
  const idcomp = '65d4b14cb1ef74374875bf9a';
  const [company, setCompany] = useState('');
  const [deuxDernieresOffres, setDeuxDernieresOffres] = useState([]);

  useEffect(() => {
    // Sample offer data
    const sampleOffers = [
      {
        title: "Ingénieur en logiciel embarqué",
        poste: "Ingénieur en logiciel embarqué",
        lieu: "Berlin, Allemagne",
        diplome: "Bac+5 en génie logiciel",
        experience: "3 ans d'expérience dans le développement de logiciels embarqués",
        service: "Développement logiciel"
      },
      {
        title: "Analyste financier",
        poste: "Analyste financier",
        lieu: "Londres, Royaume-Uni",
        diplome: "Bac+4 en finance",
        experience: "Expérience dans l'analyse financière",
        service: "Finance"
      },
      {
        title: "Ingénieur en intelligence artificielle",
        poste: "Ingénieur en intelligence artificielle",
        lieu: "San Francisco, USA",
        diplome: "Mastère en intelligence artificielle",
        experience: "Expérience dans le développement d'algorithmes d'apprentissage automatique",
        service: "Intelligence artificielle"
      },
      {
        title: "Gestionnaire de projet IT",
        poste: "Gestionnaire de projet IT",
        lieu: "Sydney, Australie",
        diplome: "Bac+4 en informatique ou gestion de projet",
        experience: "Expérience en gestion de projets informatiques",
        service: "Gestion de projet"
      },
      {
        title: "Développeur mobile",
        poste: "Développeur mobile",
        lieu: "Tokyo, Japon",
        diplome: "Bac+5 en informatique",
        experience: "Expérience dans le développement d'applications mobiles",
        service: "Développement mobile"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      {
        title: "Spécialiste en cybersécurité",
        poste: "Spécialiste en cybersécurité",
        lieu: "Toronto, Canada",
        diplome: "Bac+5 en cybersécurité",
        experience: "Expérience dans la protection des systèmes informatiques",
        service: "Cybersécurité"
      },
      // Add more sample offers if needed
    ];

    setDeuxDernieresOffres(sampleOffers);
  }, []);
  const [companyLocation, setCompanyLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of items per page

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/user/recruiter/${idcomp}`);
        const companyData = response.data;
        setCompany(companyData);
        const location = await getLocationCoordinates(companyData.localisation);
        setCompanyLocation(location);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompany();

    const fetchDernieresOffres = async () => {
      try {
        const response = await Axios.get(`http://localhost:4000/job/latest_jobs/${idcomp}`);
        const data = response.data;
        setDeuxDernieresOffres(data);
      } catch (error) {
        console.error('Error fetching latest job offers:', error);
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
      console.error('Error fetching location coordinates:', error);
      return null;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = deuxDernieresOffres.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(deuxDernieresOffres.length / itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
          <div className="bg-white p-8 md:basis-2/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
            <div className="flex items-start">
            <div className="ml-2 border-black">
                <h1 className='text-lg font-bold pb-8 border-b-2'>Les derniers offres d'emploi</h1>
                {/* Displaying current page items */}
                {currentItems.map((offer, index) => (
                  <Offre
                    key={index}
                    title={offer.title}
                    poste={offer.poste}
                    lieu={offer.lieu}
                    diplome={offer.diplome}
                    experience={offer.experience}
                    service={offer.service}
                  />
                ))}
                <div className="flex justify-center mt-4 ">
                  <button
                    className={`rounded-full py-2 px-4 mr-2 ${currentPage === 1 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-400'}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className={`rounded-full py-2 px-4 ${currentPage === totalPages ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-primary text-white hover:bg-light'}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <br /><br />
            <div className="text-gray-700 flex flex-col items-center justify-center"> 
  <div>
    <span className='flex items-center space-x-4 ml-4 font-semibold italic text-gray-900 leading-8 text-base'> 
      Candidature Spontanée
    </span>
    <label htmlFor="file-upload" className="cursor-pointer bg-light py-2 px-10  rounded-full text-white text-lg hover:bg-primary">
  Déposer votre CV
</label>
<input id="file-upload" type="file" className="hidden" />

  </div>
  <div className="mt-4">
    <span className='flex items-center space-x-4 italic text-gray-500 leading-8 text-base'> 
      Fichiers recommandés: PDF, DOC or DOCX Max. 3MB
    </span>
  </div>
</div>

          </div>
          <div className="bg-white p-8 md:basis-1/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
            <Description
              description="Créé en 2017, YASSIR est le premier opérateur ayant développé et lancé une plateforme de mise en relation numérique pour les déplacements personnalisés des citoyens, en Algérie fondé par des Algériens avec un riche parcours académique et entrepreneurial entre l'Algérie et La Silicon Valley.

              Avec plus de 100 000 partenaires chauffeurs / livreurs YASSIR
              couvre 38 Willayas.
              "
            />
          </div>
        </div>
        
          </div>
          
      
    </div>
  );
};

export default CompanyPage;

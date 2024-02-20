import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import CompanyMap from './CompanyMap'; // Importez le composant CompanyMap
import Head from './components/Head';

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
        const response = await fetch(`URL_pour_obtenir_les_offres_de_l'entreprise_${company.id}`);
        const data = await response.json();
        const deuxDernieres = data.offres.slice(0, 2); 
        setDeuxDernieresOffres(deuxDernieres);
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
    <div className="bg-gray-100 min-h-screen relative">
      <div>
        <Head />
      </div>
       
      <div className="bg-gray-100 min-h-screen flex flex-row mt-24 mx-8">
        {/* Boîte 1 */}
        <div className="bg-white p-8 basis-2/3 rounded-lg shadow mb-4 mr-8" style={{ height: 'fit-content' }}>
          <div className="flex items-start">
            <div className="ml-4 border-black">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" className="text-2xl font-semibold mb-4">Dernières offres d'emploi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Afficher les deux dernières offres d'emploi */}
                  {deuxDernieresOffres.map((offre) => (
                    <tr key={offre.id}>
                      <td className="p-4 border-b">
                        <a className="bg-white p-8 w-full block rounded-lg" href={`/offre/${offre.id}`}>
                          <h2 className="text-xl font-semibold">{offre.title}</h2>
                          <p className="text-gray-600">{offre.description}</p>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-4 text-blueColor text-lg font-semibold px-4 py-2">
                Voir toutes les offres d'emploi
              </button>
            </div>
          </div>
        </div>

        {/* Boîte 2 */}
        <div className="p-8 basis-1/3 rounded-lg shadow mb-4 mr-8" style={{ height: '400px', position: 'relative' }}>
          {companyLocation && (
            <CompanyMap
              latitude={companyLocation.latitude}
              longitude={companyLocation.longitude}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;

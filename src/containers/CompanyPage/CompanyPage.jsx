import React, { useEffect, useState } from 'react';
import Map from './components/Map';
import Head from './components/Head';

const CompanyPage = ({ company }) => {
  const [apiKey, setApiKey] = useState('');
  const [deuxDernieresOffres, setDeuxDernieresOffres] = useState([]);

  useEffect(() => {
    // Méthode pour récupérer la clé API Google Maps pour cette entreprise
    const fetchApiKey = async () => {
      // Effectuez une requête HTTP ou récupérez la clé API depuis la source externe
      const response = await fetch(`URL_pour_obtenir_la_clé_API_de_l'entreprise_${company.id}`);
      const data = await response.json();
      setApiKey(data.apiKey); // Définit la clé API dans l'état local
    };

    fetchApiKey();

    // Méthode pour récupérer les deux dernières offres d'emploi de l'entreprise
    const fetchDernieresOffres = async () => {
      const response = await fetch(`URL_pour_obtenir_les_offres_de_l'entreprise_${company.id}`);
      const data = await response.json();
      // Assurez-vous que les offres sont triées par date décroissante avant de les définir dans l'état local
      const deuxDernieres = data.offres.slice(0, 2); // Récupérer seulement les deux dernières offres
      setDeuxDernieresOffres(deuxDernieres);
    };

    fetchDernieresOffres();
  }, [company.id]);

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
        <div className="p-8 basis-1/3 rounded-lg shadow mb-4 mr-8" style={{ height: '200px', position: 'relative' }}>
          <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}>
            <Map
              apiKey={apiKey} // Passez la clé API Google Maps comme prop au composant Map
              latitude={company.latitude} // Coordonnées de latitude de l'entreprise
              longitude={company.longitude} // Coordonnées de longitude de l'entreprise
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;

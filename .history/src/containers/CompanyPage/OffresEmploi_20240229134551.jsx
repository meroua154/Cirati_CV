import React, {useEffect,useState} from 'react'
import Head from './components/Head'

const OffresEmploi = ({ company }) => {
    const [offres, setOffres] = useState([]);

    useEffect(() => {
        const fetchOffres = async () => {
          // Récupérer toutes les offres d'emploi de cette entreprise
          try {
            const response = await fetch(`/api/offres/${company.id}`);
            const data = await response.json();
            setOffres(data);
          } catch (error) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', error);
          }
        };

        fetchOffres();
      }, [company.id]);


  return (
    <div>
        <div>
            <Head></Head>
        </div>
        <div className="bg-gray-100 min-h-screen  mt-24 mx-8">
        {/* Boîte 1 */}
        <div className="bg-white p-8 rounded-lg shadow mb-4 mr-8" style={{ height: 'fit-content' }}>
          <div className="flex items-start">
            <div className="ml-4 border-black">
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" className="text-2xl font-semibold mb-4">Les offres d'emploi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Afficher les deux dernières offres d'emploi */}
                  {offres.map((offre) => (
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
            </div>
          </div>
        </div>
     </div>
   </div>
  )
}
export default OffresEmploi;
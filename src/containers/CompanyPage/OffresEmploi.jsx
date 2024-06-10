import React, {useEffect,useState} from 'react'
import Head from './components/Head'
import instance from '../../utils/setAuthToken';
import { useParams } from 'react-router-dom';
import Offre from './components/Offre';
const OffresEmploi = () => {
    const [offres, setOffres] = useState([]);
    const [company, setCompany] = useState('');
    const { id } = useParams(); 
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
        const fetchOffres = async () => {

          try {
            const response = await instance.get(`/job/get_jobs/${id}`);
            setOffres(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des offres d\'emploi:', error);
          }
        };

        fetchOffres();
      }, [id]);

  return (
    <div>
        <div>
            <Head
                 coverPhoto={company.coverpic}
                 profilePhoto={company.profilpic}
                 companyName={company.name}
                 Location={company.localisation}
                 website={company.website}
                 facebookLink={company.Facebook}
                 linkedinLink={company.LinkedIn}
                 idcomp={id}
            ></Head>
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
                  {offres.map((offre, index) => (
                      //     <Offre
                      //     key={index}
                      //     title={offre.title}
                      //     poste={offre.title}
                      //     lieu={offre.address}
                      //     diplome={offre.levelEducation}
                      //     experience={offre.AnneeExperience}
                      //     service={Object.keys(offre.secteur).join(', ')} 
                      // />
                    <tr key={offre.id}>
                      <td className="p-4 border-b">
                        <a className="bg-white p-8 w-full block rounded-lg" href={`/offre/${id}/${offre._id}`}>
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
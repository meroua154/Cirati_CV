import React, { useState, useEffect } from 'react';
import Head from './components/Head';
import Description from './components/Description';
import Offre from './components/Offre';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { fetchCompany, fetchJobs , addApplication,selectoffreSliceStatus } from './Slices/offreSlice'
const Offrejob  = () => {
  const dispatch = useDispatch();
  const { id} = useParams(); 
  const { status, company, error,jobs } = useSelector((state) => state.offre);
  const loadingStatus = useSelector(selectoffreSliceStatus);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchCompany(id));
    dispatch(fetchJobs({recruiterId:id}));
  }, [dispatch,id]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('applicantId',user._id);
      formData.append('recruiterId',id);
      try {
        await dispatch(addApplication(formData));
        alert('CV uploaded successfully!');
      } catch (error) {
        console.error('Error uploading CV:', error);
        alert('Failed to upload CV');
      }

  };

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
            idcomp={id}
            isLoading={loadingStatus === 'loading'} 
          />
        </div>

        <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row mt-24 mx-8">
          <div className="bg-white p-8 md:basis-2/3 rounded-lg shadow mb-4 sm:mr-4" style={{ height: 'fit-content' }}>
            <div className="flex items-start">
              <div className="ml-2 border-black">
                <h1 className='text-lg font-bold pb-8 border-b-2'>Les derniers offres d'emploi</h1>
                {/* Displaying current page items */}
                {currentItems.map((offre, index) => (
                        <a className="bg-white p-8 w-full block rounded-lg" href={`/singleoffre/${id}/${offre._id}`}>
                  <Offre
                    key={index}
                    title={offre.title}
                    poste={offre.title}
                    lieu={offre.address}
                    diplome={offre.levelEducation}
                    experience={offre.AnneeExperience}
                    service={Object.keys(offre.secteur).join(', ')} 
                  />
                  </a>
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
                <label htmlFor="file-upload" className="cursor-pointer bg-light py-2 px-10 rounded-full text-white text-lg hover:bg-primary">
                  Déposer votre CV
                </label>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
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
              description={company.bio} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offrejob ;

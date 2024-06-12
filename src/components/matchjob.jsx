import React, { useState, useEffect } from 'react';


const getColor = (status) => {
  // Define colors based on status
  switch (status) {
    case 'Fulltime':
      return "#4b4efc";
    case 'Parttime':
      return "#fec220";
    case 'Remote':
      return "#333333"; // Couleur pour Remote
    case 'Contract':
      return "#666666"; // Couleur pour Contract
    default:
      return "#333333"; // Par défaut
  }
};

const ApplicantCard = ({ applicant }) => {
  const { profilpic, name, preferences, cv, } = applicant;

  return (
 
      <div className="shadow lg:w-[95%] mt-12"> 
        <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
          <span className="flex items-center justify-between w-full">
            <button
              className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
              style={{ border: `3px solid ${getColor(preferences.statut)}` }}
            >
              {preferences.statut}
            </button>
          </span>
          <img src={profilpic} alt="" className="w-28 h-28 rounded-full my-8" />
        </div>
        <div className="rounded-b-md px-6 py-8" >
          <p className="text-lg font-bold">{preferences.secteur.join(', ')}</p>
          <p className="py-2 text-lg">{preferences.metier ? preferences.metier : 'Métier non spécifié'}</p>

          <p className="py-2 text-lg">{name}</p>
          <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
            <p>Salaire</p>
            <p style={{ color: getColor(preferences.statut) }}>{preferences.salaire} DA</p>
            
          </div>
                  <a href={cv} target="_blank" rel="noopener noreferrer" className="job-card mx-8"/> 
        </div>
      </div>
 
  );
};

const Matchingjob = ({applicants}) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = isDesktop ? 6 : 12;
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 1024);
  };

  const renderApplicants = () => {
    const indexOfLastApplicant = currentPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const currentApplicants = applicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  
    return currentApplicants.map((applicant, index) => (
      <ApplicantCard key={index} applicant={applicant} />
    ));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = Math.ceil(applicants.length / applicantsPerPage);

  const handleNextPage = () => {
    if (currentPage < pageNumbers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    
      <div className='bg-slate-100 pb-8 pt-12'>
       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className="text-center text-4xl font-bold mb-12">Découvrez toutes les demandes d'emploi</h2>
       </div>
       
  
      <div className="container mx-auto px-6 py-24 pt-0 grid gap-12">
        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {renderApplicants()}
        </div>
        
      </div>
    </div>
  );
};

export default Matchingjob;

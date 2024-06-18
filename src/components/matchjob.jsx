import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getColor = (status) => {
 
  const lowerCaseStatus = status.toLowerCase();

  if (lowerCaseStatus.startsWith('contrat')) {
    return "#666666"; 
  } else if (lowerCaseStatus.startsWith('temps')) {
    return "#fec220"; 
  } else {
    return "#333333"; 
  }
};


const ApplicantCard = ({ applicant }) => {
  const { profilpic, name, cv, preferences,} = applicant.user;
  const { usefulLinks, jobTitle, desiredPosition, yearsOfExperience, professionalSummary, location}=applicant;
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="shadow lg:w-[95%] mt-12">
      <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
        <span className="flex items-center justify-between w-full">
          <button
            className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
            style={{ border: `3px solid ${getColor(applicant.statut)}` }}
          >
            {applicant.statut}
          </button>
        </span>
          <img src={profilpic} alt="" className="w-28 h-28 rounded-full my-8" />
      </div>
      <div className="rounded-b-md px-6 py-8">
        <p className="text-lg font-bold">{jobTitle ? jobTitle : 'Métier non spécifié'}</p>
        {applicant.user && (
          <Link
          to="/profil"
          state={{ user: applicant.user }}
            className="block"
          >
          <p
            className="py-2 text-lg"
            style={{ textDecoration: isHovered ? 'underline' : 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {name}
          </p>
          </Link>
        )}
        <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
          <p>Poste souhaité :</p>
          <p>{desiredPosition}</p>
        </div>

        <button
  className="mt-4 bg-primary hover:bg-light text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={toggleDetails}
        >
          {showDetails ? 'Masquer les détails' : 'Plus de détails'}
        </button>
        {showDetails && (
          <div className="mt-4">
            <p className="py-2">Années d'expérience : {yearsOfExperience}</p>
            <p className="py-2">Résumé professionnel : {professionalSummary}</p>
            <p className="py-2">Localisation : {location}</p>
            <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
              <p>Liens utiles :</p>
              <div>
                <a href={usefulLinks.LinkedIn} className="mr-2 text-blue-500 hover:text-blue-700">LinkedIn</a>
                <a href={usefulLinks.GitHub} className="mr-2 text-blue-500 hover:text-blue-700">GitHub</a>
                <a href={usefulLinks.Portfolio} className="mr-2 text-blue-500 hover:text-blue-700">Portfolio</a>
                <a href={usefulLinks.CV} className="mr-2 text-blue-500 hover:text-blue-700">CV</a>
              </div>
            </div>
          </div>
        )}
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

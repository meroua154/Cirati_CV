import React, { useState, useEffect } from 'react';
import Head from './components/Head';
import Description from './components/Description';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { fetchCompany, fetchOffres , addApplication,selectoffreSliceStatus } from './Slices/offreSlice'
const Offrepagesingle = () => {
    const { recId, id } = useParams(); 
    const { company, offre, status, error } = useSelector((state) => state.offre);
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const loadingStatus = useSelector(selectoffreSliceStatus);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
          const formData = new FormData();
          formData.append('cv', file);
          formData.append('applicantId',user._id);
          formData.append('jobId',id);
          formData.append('recruiterId',recId);
          try {
            await dispatch(addApplication(formData));
            alert('CV uploaded successfully!');
          } catch (error) {
            console.error('Error uploading CV:', error);
            alert('Failed to upload CV');
          }
    
      };
    const renderSecteurs = (secteurs) => {
        if (!secteurs) return null;
        return Object.entries(secteurs).map(([secteur, sousSecteurs]) => (
            <div key={secteur}>
                {sousSecteurs.join(' et ')}
            </div>
        ));
    };

    useEffect(() => {
        dispatch(fetchCompany(recId));
        dispatch(fetchOffres({ recId, id }));
      }, [dispatch, recId, id]);

    const secteurs = offre.secteur ? Object.keys(offre.secteur).join(', ') : '';

    return (
        <div className="bg-gray-100 min-h-screen relative" style={{ paddingTop: '50px' }}>
            <div className=''>
                <Head 
                    coverPhoto={company.coverpic}
                    profilePhoto={company.profilpic}
                    companyName={company.name}
                    Location={company.localisation}
                    website={company.website}
                    facebookLink={company.Facebook}
                    linkedinLink={company.LinkedIn}
                    idcomp={recId}
                    isLoading={loadingStatus === 'loading'} 
                />
            </div>
            <div className="container mx-auto my-5 p-10 min-h-screen relative mx-20">
                <div className="md:flex no-wrap md:-mx-2">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-light">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt=""
                                />
                            </div>
                            <Description 
                                description={company.bio}
                            />
                        </div>
                        <div className="my-4"></div>
                    </div>
                    <div className="w-full md:w-9/12 mx-2">
                        <div className="bg-white p-3 shadow-sm rounded-sm flex justify-between items-center">
                            <div className="flex items-center space-x-20 font-semibold text-gray-900 leading-8 text-2xl">
                                <span className="">{offre.title}</span>
                            </div>
                            <label htmlFor="file-upload" className="bg-primary py-2 px-10 rounded-full text-white text-lg hover:bg-light">
                  Déposer votre CV
                </label>
                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                        </div>
                        <div className="my-1"></div>
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Lieu de Travail</div>
                                        <div className="px-4 py-2">{offre.address}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Secteur D'activité</div>
                                        <div className="px-4 py-2">{secteurs}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Duration</div>
                                        <div className="px-4 py-2">{offre.duration}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Niveau d'étude (diplome)</div>
                                        <div className="px-4 py-2">{offre.levelEducation}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Date de poste</div>
                                        <div className="px-4 py-2">{formatDate(offre.dateOfPost)}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Nombre de poste</div>
                                        <div className="px-4 py-2">{offre.Nbposts}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Type de contrat</div>
                                        <div className="px-4 py-2">{offre.Contratype}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Année d'expérience</div>
                                        <div className="px-4 py-2">{offre.AnneeExperience}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Salaire</div>
                                        <div className="px-4 py-2">{offre.salary} DA</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-1"></div>
                        <div className="bg-white p-3 shadow-sm rounded-sm flex justify-between items-center">
                            <div className="text-gray-700">
                                <span>Afin de renfoncer nos équipes du {renderSecteurs(offre.secteur)} nous recrutons un :</span>
                                <br /><br />
                                <span className='font-semibold flex justify-center'>{offre.title}</span>
                                <br />
                                <span>
                                    Description du poste {offre.title} :<br /><br />
                                    {offre.description}
                                </span>
                            </div>
                        </div>
                        <div className="my-1"></div>
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="text-gray-700 flex justify-center">
                                <div>
                                    <span className='flex items-center space-x-20 font-semibold italic text-gray-900 leading-8 text-base'>Vous êtes peut-être là où le candidat que nous recherchons</span>
                                    <span className='flex items-center ml-28 md:ml-40 space-x-20 font-semibold italic text-gray-900 leading-8 text-base'>N’attendez Plus !</span>
                                    <br /><br />
                                    <a href={`mailto:${company.email}`}>
                                        <button className="bg-primary py-2 px-10 rounded-full text-white text-lg hover:bg-light">
                                            Contact us
                                        </button>
                                    </a>
                                    <label htmlFor="file-upload" className="bg-primary py-2 px-10 rounded-full text-white text-lg hover:bg-light">
                  Déposer votre CV
                </label>
                <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Offrepagesingle;

import React from 'react';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa'; 
import Header from './Header';
import { SiGooglemaps } from "react-icons/si";
import { TbWorld } from "react-icons/tb";


const Head = ({ coverPhoto, profilePhoto, companyName, facebookLink, linkedinLink, Location, website }) => {
  return (
    <div className=''>
      {/* Photo de couverture */}
      <div className="relative mt-12 sm:mt-24 md:mt-32 lg:mt-12">
        <img
          src={coverPhoto}
          alt="Photo de couverture de l'entreprise"
          className="w-full h-80 sm:h-80 md:h-96 lg:h-80 "
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 ml-56 md:ml-64 mb-4 md:mb-4">
          <p className="text-white font-bold text-base md:text-xl">{companyName}</p>
          <div style={{ display: 'flex', alignItems: 'center' }} className='mt-2'>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <p className='text-base font-bold' style={{ marginRight: '5px' }}><SiGooglemaps style={{ color: "#DDDDDD"}} /></p>
               <p className='text-xs text-slate-300 font-bold'>{Location}</p>
             </div>
             <a href={website} className='text-xs text-slate-300 font-bold' style={{ color: '#DDDDDD', display: 'flex', alignItems: 'center' }}>
                <TbWorld className='text-base' style={{ marginLeft: '7px', marginRight: '4px' }} />
                 Site Web
             </a>
          </div>
          
        </div>
        
        {/* Photo de profil */}
        <div className="absolute top-0 left-0  mt-52 md:mt-56 ml-4 sm:ml-8">
          <img
            src={profilePhoto}
            alt="Photo de profil de l'entreprise" 
            className="h-40 md:h-42 w-48 border-2  border-white bg-white shadow-xl rounded-lg"
          />
        <div className="relative">
        {/* Icône Facebook */}
        <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-0  mr-24 transition duration-150 ease-in-out">
            <FaFacebookF
               className="text-slate-300 text-lg md:text-xl mr-4 ml-8" 
               style={{
                    color: "#000000"
                }}
           />
        </a>
  
       {/* Icône LinkedIn */}
        <a href={linkedinLink} target="_blank" rel="noopener noreferrer" className="absolute bottom-2 right-0  mr-8 transition duration-150 ease-in-out">
            <FaLinkedin 
               className="text-slate-300 text-lg md:text-xl ml-4 mr-12"
               style={{
                    color: "#000000"
                }}
            />
        </a>
      </div>
        </div>
      </div>
      <Header></Header>
    </div>
  );
};

export default Head;


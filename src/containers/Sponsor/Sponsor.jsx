import React, { useState, useEffect } from 'react';
import sp from "../../assets/Images/sp.jpg";
import CountUp from 'react-countup';
import { FaBriefcase } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { IoBusiness } from 'react-icons/io5';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchSponsors } from './Slices/SponsorSlice';
import Sponsors from './SponsorsElement';
export default function Sponsor() {
    useEffect(() => {
        AOS.init();
      }, []); 
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const sponsorData = useSelector((state) => state.sponsor.sponsorsData);
    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          setIsScrolled(scrollTop > 0);
        };
      
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      useEffect(() => {
          dispatch(fetchSponsors());
      }, [dispatch]);

   
    return (
        <div>
           <div
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              className="relative h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${sp})` }}
>
           <div className="absolute inset-0 bg-black opacity-50 filter blur-sm"></div>
           <div className="relative z-10 flex items-center justify-center h-full">
           <div className="text-center text-white p-8">
               <h1 className='text-3xl sm:text-5xl font-extrabold'>
                  Trouvez rapidement vos sponsors !
               </h1>
               <p className='text-xl mt-8  pl-8'>
                  <strong>Publiez</strong> vos demandes de sponsoring et trouvez rapidement vos <strong>futurs sponsors</strong> sur la plateforme leader en Algérie !
               </p>
               <div className='mt-12'>
                      <a href="/SponsorForm">
                          <button className="btn bg-light text-white border border-blue-600 text-sm whitespace-nowrap py-2 px-8 text-center rounded-2xl">
                              Rechercher des sponsors
                          </button>
                      </a>
               </div>
           </div>
        </div>
    </div>
    <div className='bg-slate-100 pb-8 pt-12'>
       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className="text-center text-4xl font-bold mb-12">Projets à la Recherche de Sponsors</h2>
       </div>
       <Sponsors SponsorsData={sponsorData} />
    </div>
            
</div>
    );
}

import React, { useState, useEffect } from 'react';
import event from "../../assets/Images/event.jpg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from './Slices/EventSlice';
import EventCard from './EventCard';

export default function Event() {
    useEffect(() => {
        AOS.init();
      }, []); 
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);
    const dispatch = useDispatch();
    const EventsData = useSelector((state) => state.event.eventsData);
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
        dispatch(fetchEvents());
    }, [dispatch]);
   
    

    
    return (
        <div>
           <div
              data-aos="zoom-in-down"
              data-aos-duration="2000"
              className="relative h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${event})` }}
>
           <div className="absolute inset-0 bg-black opacity-50 filter blur-sm"></div>
           <div className="relative z-10 flex items-center justify-center h-full">
           <div className="text-center text-white p-8">
               <h1 className='text-3xl sm:text-5xl font-extrabold'>
                    Créez une annonce pour votre événement !
               </h1>
               <p className='text-xl mt-8  pl-8'>
                  <strong>Publiez</strong> les détails de votre événement et trouvez rapidement vos <strong>participants</strong> sur la plateforme leader en Algérie !
               </p>
               <div className='mt-12'>
                   {user &&user.role=="recruiter" ?(
                      <a href="/EventForm">
                          <button className="btn bg-light text-white border border-blue-600 text-sm whitespace-nowrap py-2 px-8 text-center rounded-2xl">
                              Créer une annonce d'événement
                          </button>
                      </a>
                    ): null} 
               </div>
           </div>
        </div>
    </div>
    <div className='bg-slate-100 pb-8 pt-12'>
       <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className="text-center text-4xl font-bold mb-12">Découvrez les Événements à Ne Pas Manquer</h2>
          <EventCard eventData={EventsData} />
       </div>
    </div>
            
</div>
    );
}

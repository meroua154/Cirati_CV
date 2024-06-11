import React, { useState, useEffect } from 'react';
import s6 from "../../assets/Images/s6.png";
import CountUp from 'react-countup';
import { FaBriefcase } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { IoBusiness } from 'react-icons/io5';
import { logo1, logo3, logo4 } from '../../assets/Logo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSelector } from 'react-redux'; 
export default function RecruiterPage() {
    useEffect(() => {
        AOS.init();
      }, []); 
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const [isScrolled, setIsScrolled] = useState(false);

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
      

    const faqs = [
        {
          question: "Comment poster une annonce sur ciraticv ?",
          answer: "React est une bibliothèque JavaScript open-source utilisée pour construire des interfaces utilisateur, en particulier des interfaces utilisateur pour les applications à page unique."
        },
        {
          question: "Est ce payant?",
          answer: "Tailwind CSS est un framework CSS utilisé pour créer des conceptions personnalisées en utilisant des classes utilitaires directement dans le HTML."
        },
        {
          question: "Est ce que CiratiCv est une entreprise de placement agréée ?",
          answer: "Vous pouvez commencer par suivre des tutoriels en ligne, lire la documentation officielle et créer des projets simples pour pratiquer."
        }
      ];
    
      const [selectedQuestion, setSelectedQuestion] = useState(null);
    
      const toggleAnswer = (index) => {
        setSelectedQuestion(index === selectedQuestion ? null : index);
      };

    
    return (
        <div>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className="grid gap-2 grid-cols-1 sm:grid-cols-2 m-auto">
                <div className='mt-36 sm:mr-12'>
                    <h1 className='ml-12 text-3xl sm:text-5xl font-extrabold text-left'>Recrutez mieux et <br />plus vite !</h1> 
                    <p className='text-xl sm:text-left mt-8 ml-12 border-l-4 border-gray-700 pl-8'>
                         <strong>Publiez</strong> vos annonces et trouvez rapidement vos <strong>futurs talents</strong> sur le site d’emploi leader en Algérie !
                    </p>
                    <div className='grid gap-2 grid-cols-1 sm:grid-cols-2 mt-12'>
                    {isAuthenticated && user.role === 'recruiter' ? null : (
                            <>
                                <a href="/register">
                                    <button className="btn bg-light text-white border border-blue-600 text-sm whitespace-nowrap py-2 px-8 ml-12 md:ml-16 text-center rounded-2xl sm:static mr-4 w-auto overflow-hidden">
                                        Essayer gratuitement
                                    </button>
                                </a>
                                <a href="/login">
                                    <button className="btn bg-white text-primary border border-primary text-sm whitespace-nowrap py-2 px-4 sm:mr-12 ml-12 md:ml-2 rounded-2xl sm:static w-auto overflow-hidden">
                                        Se connecter
                                    </button>
                                </a>
                            </>
                        )}
                    </div>
                </div>
                <div className='mt-20'>
                  <img src={s6} alt="" className="w-full hidden sm:block" />
                </div>
            </div>

            <div data-aos="zoom-in-down" data-aos-duration="2000" className="py-16 bg-primary mt-12 md:mt-28 mb-20">
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-white text-4xl font-bold mb-8">Pourquoi CiratiCV ?</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center  py-8 px-4">
                            <FaBriefcase color="white" size={30} className='mb-4'/>
                            <p className='font-bold text-4xl mr-2 text-white'>+<CountUp end={10000} duration={2} separator="," className="text-4xl text-white font-bold mt-2" /></p>
                            <p className="text-white text-lg mt-2">Recrutements / an</p>
                        </div>
                        <div className="flex flex-col items-center justify-center  py-8 px-4">
                             <FaUsers color="white" size={30} className='mb-4'/>
                             <p className='font-bold text-4xl mr-2 text-white'>+<CountUp end={500} duration={2.5} separator="," className="text-4xl text-white font-bold mt-2" /></p>
                             <p className="text-white text-lg mt-2">Candidats</p>
                        </div>
                        <div className="flex flex-col items-center justify-center py-8 px-4">
                             <IoBusiness color="white" size={30} className='mb-4'/>
                             <p className='font-bold text-4xl mr-2 text-white'>+<CountUp end={250} duration={3} separator="," className="text-4xl text-white font-bold mt-2" /></p>
                             <p className="text-white text-lg mt-2">Entreprises</p>
                        </div>
                    </div>
                 </div>
            </div>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className=' bg-slate-50 pt-4 pb-8'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mx-20 my-28'>
                    <h2 className="text-center text-4xl font-bold mb-12">Ce que nos clients disent de nous !</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 px-16">
                        <div className="flex flex-col items-center justify-center border border-inherit rounded-lg hover:bg-light shadow-xl py-8 px-4">
                             <img src={logo1} alt="" style={{ width: '80px' }}/>
                             <p className='text-center text-xs text-slate-600 mt-8 mb-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ipsa ullam deleniti praesentium facere, quam officiis illum nisi maiores. Ab incidunt asperiores commodi porro modi accusantium eveniet hic veritatis rem!</p>
                        </div>
                        <div className="flex flex-col items-center justify-center border border-inherit rounded-lg hover:bg-light shadow-xl py-8 px-4">
                             <img src={logo4} alt="" style={{ width: '80px' }}/>
                             <p className='text-center text-xs text-slate-600 mt-8 mb-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ipsa ullam deleniti praesentium facere, quam officiis illum nisi maiores. Ab incidunt asperiores commodi porro modi accusantium eveniet hic veritatis rem!</p>  
                        </div>
                        <div className="flex flex-col items-center justify-center border border-inherit rounded-lg hover:bg-light shadow-xl py-8 px-4">
                             <img src={logo3} alt="" style={{ width: '80px' }}/>
                             <p className='text-center text-xs text-slate-600 mt-8 mb-8'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est ipsa ullam deleniti praesentium facere, quam officiis illum nisi maiores. Ab incidunt asperiores commodi porro modi accusantium eveniet hic veritatis rem!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className="max-w-3xl mx-auto mt-8">
               <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">Questions fréquentes</h2>
                    {faqs.map((faq, index) => (
                      <div key={index} className="mb-4">
                            <button
                                onClick={() => toggleAnswer(index)}
                                className="flex items-center justify-between w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none"
                            >
                                <span className="font-semibold">{faq.question}</span>
                                <svg
                                   className={`w-4 h-4 ${index === selectedQuestion ? 'transform rotate-90' : ''}`}
                                   xmlns="http://www.w3.org/2000/svg"
                                   viewBox="0 0 20 20"
                                   fill="currentColor"
                                >
                                   <path fillRule="evenodd" d="M6.293 6.707a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 4a1 1 0 011 1v4a1 1 0 01-2 0V5a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                          {index === selectedQuestion && (
                             <p className="mt-2 ml-6 text-gray-600">{faq.answer}</p>
                            )}
                      </div>
                    ))}
            </div>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className='my-24 '>
                <h1 className='text-center text-3xl md:text-4xl font-bold'>Besoin d'en savoir plus ?</h1>
                <div className={`grid gap-2 grid-cols-1 md:grid-cols-2 mt-12 ml-12 mr-8 md:mr-8${isScrolled ? 'md:grid-cols-1' : ''}`}>
                    <div className={`bg-slate-50 p-8 rounded-xl ${isScrolled ? 'relative' : ''}`}>
                        <p className='text-left mt-12 border-l-4 border-gray-700 pl-4'>
                            N’hésitez pas à nous contacter pour tout complément d’information
                        </p>
                        <h2 className='font-bold mt-8'>Téléphone</h2>
                        <p className='mt-2'>+213 560 90 61 16</p>
                        <h2 className='font-bold mt-8'>Adresse</h2>
                        <p className='mt-2'>N°1 Cité Yassmine Draria، 16000</p>
                        <h2 className='font-bold mt-8'>Email</h2>
                        <p className='mt-2'>recruteur@emploitic.com</p>
                    </div>
                    <div className={`bg-slate-50 p-8 rounded-xl ${isScrolled ? 'relative' : ''}`}>
                        <form className="mx-12 mt-12">
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                <input type="text" name="floating_text" id="floating_text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom & Prénom</label>
                            </div>
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                <input type="text" name="floating_text" id="floating_text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Entreprise</label>
                            </div>
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                <input type="text" name="floating_text" id="floating_text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                <label htmlFor="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Telephone</label>
                            </div>
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                <label for="underline_select" class="sr-only">Underline select</label>
                                   <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                                      <option selected>Effectif</option>
                                      <option value="US">0-10</option>
                                      <option value="CA">10-49</option>
                                      <option value="FR">50-99</option>
                                      <option value="DE">100-250</option>
                                   </select>
                            </div>
                            <div className={`relative z-0 w-full mb-5 group ${isScrolled ? 'relative' : ''}`}>
                                 <input type="text" name="repeat_text" id="floating_text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required />
                                 <label for="floating_text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Specifier votre demande</label>
                            </div>
                            {/* Ajoutez les autres champs du formulaire avec des classes similaires */}
                            <button type="submit" className="text-white bg-primary hover:bg-light focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            <h6 className='text-sm text-left font-semibold mt-4'>Vous cherchez un emploi ? <a href="/" className='text-primary'>Cliquez ici</a></h6>
                        </form>
                    </div>
                </div>
            </div>
            <div data-aos="zoom-in-down" data-aos-duration="2000" className='grid gap-2 md:grid-cols-2 m-auto bg-slate-100'>
              <div className='mx-16 my-20'>
                  <h1 className='text-xl font-bold mb-8'>A propos de CiratiCV</h1>
                  <p className='text-left text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate numquam, ducimus eos quasi labore vero nam veniam autem nesciunt impedit sit dolore repellendus deleniti temporibus, voluptates neque repellat, officiis explicabo.</p>
              </div>
            </div>
            
        </div>
    );
}

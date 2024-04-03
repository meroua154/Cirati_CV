
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CompanyMap from './CompanyMap';
import Head from './components/Head';
import Map from './components/Map';
import yassir from "../../assets/Images/yassir.png";
import yass from "../../assets/Images/yass.png";
import Description from './components/Description';
import Offre from './components/Offre';

const Offrejob = () => {
 

  return (
    <div className="bg-gray-100 min-h-screen relative" style={{ paddingTop: '50px' }} >
        <div className=''>
      <Head 
        coverPhoto={yass}
        profilePhoto={yassir}
        companyName="Nom de votre entreprise"
        Location="Alger, Bir Mourad Rais "
        website="https://yassir.com/"
        facebookLink="https://web.facebook.com/Yassir.Algerie/?locale=fr_FR&_rdc=1&_rdr"
        linkedinLink="https://www.linkedin.com/company/yassir/" 
      />
      </div>
        <div class="container mx-auto my-5 p-10  min-h-screen relative mx-20">
          <div class="md:flex no-wrap md:-mx-2 ">
       
            <div class="w-full md:w-3/12 md:mx-2">
              
                <div class="bg-white p-3 border-t-4 border-green-400">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto"
                            src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                            alt=""/>
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">Yassir Corp</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                    <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">Créé en 2017, YASSIR est le premier opérateur ayant développé et lancé une plateforme de mise en relation numérique pour les déplacements personnalisés des citoyens, 
                    en Algérie fondé par des Algériens avec un riche parcours académique et entrepreneurial
                     entre l'Algérie et La Silicon Valley. Avec plus de 100 000 partenaires chauffeurs / 
                     livreurs YASSIR couvre 38 Willayas.</p>
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        
                        <li class="flex items-center py-3">
                            <span>Member since</span>
                            <span class="ml-auto">Nov 07, 2016</span>
                        </li>
                    </ul>
                </div>
              
                <div class="my-4"></div>
     
                
                
            </div>
           
            <div class="w-full md:w-9/12 mx-2 h-64">
          
            <div className="bg-white p-3 shadow-sm rounded-sm flex justify-between items-center">
                            <div className="flex items-center space-x-20 font-semibold text-gray-900 leading-8 text-2xl">
                                <span className="">Testeur D'application web et mobile </span>
                            </div>
                            <button className="bg-green-500 py-2 px-10  rounded-full text-white text-lg hover:bg-green-400">Postuler</button> {/* Updated button classes */}
                            </div>

                <div class="my-1"></div>
                
                           
                <div class="bg-white p-3 shadow-sm rounded-sm">
                   
                   
                    <div class="text-gray-700">
                        <div class="grid md:grid-cols-2 text-sm">
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Lieu de Travail</div>
                                <div class="px-4 py-2">Alger, Algerie</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Secteur D'activiter</div>
                                <div class="px-4 py-2">IT, Informmatique</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Date d'expiration</div>
                                <div class="px-4 py-2">1 juin 2023</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Niveau d'etude (diplome)</div>
                                <div class="px-4 py-2">Master 2</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Niveau de Poste</div>
                                <div class="px-4 py-2">Confirme/Experemente</div>
                            </div>

                            
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Nombre de poste</div>
                                <div class="px-4 py-2">1</div>
                            </div>
                            <div class="grid grid-cols-2">
                                <div class="px-4 py-2 font-semibold">Type de contrat </div>
                                <div class="px-4 py-2">
                                    <a class="">cdi</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className='my-1'></div>
                <div className="bg-white p-3 shadow-sm rounded-sm flex justify-between items-center">
                <div class="text-gray-700">
                    <span>Afin de renfoncer nos équipes du Digital IT nous recrutons un :</span>
                    <br /><br />
    
                    <span className='font-semibold flex justify-center'>Testeur D'application web et mobile</span>
                    <br />
                    <span>
    Description du poste de Testeur d'application web et mobile :<br /><br />
    
    En tant que testeur d'applications web et mobile, vous serez responsable de garantir la qualité et la fiabilité des applications développées pour le web et les appareils mobiles. Votre rôle consistera à effectuer des tests fonctionnels, de performance et de compatibilité sur différentes plateformes et navigateurs. Vous travaillerez en étroite collaboration avec les développeurs pour identifier, signaler et résoudre les défauts et les bogues.<br /><br />
    
    Principales responsabilités :<br />
    - Effectuer des tests manuels et automatisés sur les applications web et mobiles.<br />
    - Identifier et documenter les défauts, les bogues et les problèmes de performance.<br />
    - Collaborer avec les développeurs pour résoudre les problèmes détectés.<br />
    - Assurer la conformité aux normes de qualité et aux spécifications fonctionnelles.<br />
    - Participer à l'amélioration des processus de développement et de test.<br />
    - Maintenir une documentation précise des tests effectués et des résultats obtenus.<br /><br />
    
    Compétences requises :<br />
    - Solides compétences en test logiciel et en assurance qualité.<br />
    - Maîtrise des outils de test et des frameworks de test automatisé.<br />
    - Bonne compréhension des principes de développement web et mobile.<br />
    - Capacité à travailler efficacement en équipe et à communiquer clairement les résultats des tests.<br />
    - Capacité à s'adapter rapidement aux changements et aux nouvelles technologies.<br />
    - Souci du détail et rigueur dans l'exécution des tests.<br /><br />
    
    Si vous êtes passionné par l'assurance qualité des applications web et mobiles, doté d'un esprit analytique et d'une forte attention aux détails, ce poste pourrait vous convenir parfaitement.
</span>


                </div>
                
                </div>

                <div class="my-1"></div>

                <div class="bg-white p-3 shadow-sm rounded-sm">
                   
                   
                <div class="text-gray-700 flex justify-center"> 
                        <div>
                            <span className='flex items-center space-x-20 font-semibold italic text-gray-900 leading-8 text-base'> 
                           Vous êtes peut-être là où le candidat que nous recherchons
                           
                            </span>
                            <span className='flex items-center ml-40 space-x-20 font-semibold italic text-gray-900 leading-8 text-base'>  N’attendez Plus !</span>
                            <br /><br />
                            <a href="mailto:r_messaoud@estin.dz">
                            <button className="bg-green-500 py-2 px-10 rounded-full text-white text-lg hover:bg-green-400">
                                Contact us
                            </button>
                            </a>
                            <button className="bg-green-500 py-2 px-10 ml-40 rounded-full text-white text-lg hover:bg-green-400">Postuler</button>
                                                        
                        </div>
                        </div>



               </div>
               
             
            </div>
        </div>
    </div>
      
    </div>
  );
};

export default Offrejob;

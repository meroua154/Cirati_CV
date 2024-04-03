import React, { useState, useRef } from 'react';
import Multi from "./multi";
import Multione from "./multione";
import options from "./optionsjob";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import hire from "../../assets/Images/hire.jpg"

function MultiStepjobForm() {
    const contractTypeOptions = [
  { value: "temps_plein", label: "Temps plein" },
  { value: "temps_partiel", label: "Temps partiel" },
  { value: "cdd", label: "Contrat à durée déterminée (CDD)" },
  { value: "cdi", label: "Contrat à durée indéterminée (CDI)" },
  { value: "apprentissage", label: "Contrat d'apprentissage" },
  { value: "professionnalisation", label: "Contrat de professionnalisation" },
  { value: "stage", label: "Contrat de stage" },
  { value: "interim", label: "Contrat d'intérim" },
  { value: "freelance", label: "Contrat de freelance" },
  { value: "mission", label: "Contrat de mission" }
];

    const Willaya = [
        { value: "Adrar", label: "Adrar" },
        { value: "Chlef", label: "Chlef" },
        { value: "Laghouat", label: "Laghouat" },
        { value: "Oum El Bouaghi", label: "Oum El Bouaghi" },
        { value: "Batna", label: "Batna" },
        { value: "Béjaïa", label: "Béjaïa" },
        { value: "Biskra", label: "Biskra" },
        { value: "Béchar", label: "Béchar" },
        { value: "Blida", label: "Blida" },
        { value: "Bouira", label: "Bouira" },
        { value: "Tamanrasset", label: "Tamanrasset" },
        { value: "Tébessa", label: "Tébessa" },
        { value: "Tlemcen", label: "Tlemcen" },
        { value: "Tiaret", label: "Tiaret" },
        { value: "Tizi Ouzou", label: "Tizi Ouzou" },
        { value: "Alger", label: "Alger" },
        { value: "Djelfa", label: "Djelfa" },
        { value: "Jijel", label: "Jijel" },
        { value: "Sétif", label: "Sétif" },
        { value: "Saïda", label: "Saïda" },
        { value: "Skikda", label: "Skikda" },
        { value: "Sidi Bel Abbès", label: "Sidi Bel Abbès" },
        { value: "Annaba", label: "Annaba" },
        { value: "Guelma", label: "Guelma" },
        { value: "Constantine", label: "Constantine" },
        { value: "Médéa", label: "Médéa" },
        { value: "Mostaganem", label: "Mostaganem" },
        { value: "M'Sila", label: "M'Sila" },
        { value: "Mascara", label: "Mascara" },
        { value: "Ouargla", label: "Ouargla" },
        { value: "Oran", label: "Oran" },
        { value: "El Bayadh", label: "El Bayadh" },
        { value: "Illizi", label: "Illizi" },
        { value: "Bordj Bou Arréridj", label: "Bordj Bou Arréridj" },
        { value: "Boumerdès", label: "Boumerdès" },
        { value: "El Tarf", label: "El Tarf" },
        { value: "Tindouf", label: "Tindouf" },
        { value: "Tissemsilt", label: "Tissemsilt" },
        { value: "El Oued", label: "El Oued" },
        { value: "Khenchela", label: "Khenchela" },
        { value: "Souk Ahras", label: "Souk Ahras" },
        { value: "Tipaza", label: "Tipaza" },
        { value: "Mila", label: "Mila" },
        { value: "Aïn Defla", label: "Aïn Defla" },
        { value: "Naâma", label: "Naâma" },
        { value: "Aïn Témouchent", label: "Aïn Témouchent" },
        { value: "Ghardaïa", label: "Ghardaïa" },
        { value: "Relizane", label: "Relizane" }
    ];
    const experienceOptions = [
        { value: "less_than_1", label: "Moins de 1 an" },
        { value: "1_to_3", label: "1 - 3 ans" },
        { value: "4_to_7", label: "4 - 7 ans" },
        { value: "more_than_7", label: "Plus de 7 ans" }
    ];
    const jobLevelOptions = [
        { value: "entry_level", label: "Débutant" },
        { value: "junior_level", label: "Junior" },
        { value: "mid_level", label: "Intermédiaire" },
        { value: "senior_level", label: "Senior" },
        { value: "executive_level", label: "Cadre supérieur" }
        // Add more options as needed
    ];
    const educationLevelOptions = [
        { value: "no_formal_education", label: "Pas de formation formelle" },
        { value: "high_school_diploma", label: "Diplôme d'études secondaires" },
        { value: "associate_degree", label: "Diplôme d'associé" },
        { value: "bachelor_degree", label: "Licence" },
        { value: "master_degree", label: "Master" },
        { value: "doctorate_degree", label: "Doctorat" }
        // Add more options as needed
    ];
    
  
    const [step, setStep] = useState(1); // State to manage the current step of the form
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreedToTerms: false
    });
    const [showVerificationMessage, setShowVerificationMessage] = useState(false);
    const inputRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

    const handleResendClick = () => {
        setShowVerificationMessage(true);

        // Hide the message after 1 second
        setTimeout(() => {
            setShowVerificationMessage(false);
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const nextStep = () => {
        setStep(step + 1); // Move to the next step
    };

    const prevStep = () => {
        setStep(step - 1); // Move to the previous step
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); 
    };
    const handleKeyDown = (index, e) => {
        const input = inputRefs.current[index].current;
        
        // Allow only one digit (0-9)
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
            return;
        }
        
        // Clear the existing value before updating with the new one
        input.value = "";
    
        setTimeout(() => {
            input.value = e.key;
    
            // Move focus to the next input if available and the next input is empty
            if (index < inputRefs.current.length - 1 && inputRefs.current[index + 1].current.value === "") {
                inputRefs.current[index + 1].current.focus();
            }
        }, 200); // Adjust the delay time as needed
    };
       
  
    
    
    
    
    return (
        <div className='bg-cover'style={{ backgroundImage: `url(${hire})` }}>
        <Card color="transparent" shadow={true} className='drop-shadow-xl'>
          <div className="flex justify-center items-center mt-32 ">
            <form onSubmit={handleSubmit} className="border border-gray-300 p-4 bg-white rounded  mb-12" style={{ maxWidth: '600px' }}>
                {step === 1 && (
                    <>
                        <Typography variant="h4" color="black">
                            Cree une annonce d'emploi
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                          Etape 1/2 : Rensiegnez les champs suivants pour publier votre offre
                           d'emploie
                        </Typography>
                        <div className="mb-1 flex flex-col gap-4 mt-2">
                            <Typography variant="h6" color="black" className="-mb-3">
                               Titre de poste*
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Ex: Comptable junior"
                                className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg" 
                                labelProps={{ className: "before:content-none after:content-none" }}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <Typography variant="h6" color="black" className="-mb-3">
                               Metier *
                            </Typography>
                           
                            
                             <Multi  jobs={options}  className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none" />
                             <Typography variant="h6" color="black" className="-mb-3">
                               Lieu de travail *
                            </Typography>
                           
                            
                             <Multi  jobs={Willaya}  className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none" />
                             <Typography variant="h6" color="black" className="-mb-3">
                               Annees d'experience *
                            </Typography>
                           
                            
                            <Multione  options={experienceOptions}/>
                             <Typography variant="h6" color="black" className="-mb-3">
                               Niveau de poste *
                            </Typography>
                           
                            
                            <Multione  options={jobLevelOptions}/>
                             <Typography variant="h6" color="black" className="-mb-3">
                               Niveau d'etude *
                            </Typography>
                           
                            
                             <Multione  options={educationLevelOptions}/>
                            
                        </div>
                       
                      
                        
                        <Button className="mt-6 text-white bg-light hover:bg-primary w-full" onClick={nextStep}>Next</Button>
                    </>
                )}


                {/*step === 2 && (
                    <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
                        <div className="flex flex-col space-y-2">
                            <div className="font-bold">
                                Validez votre address email
                            </div>
                            <div className='space-y-0'>
                                <div className="flex flex-row text-sm font-medium">
                                    Saisissez le code de validation envoyé à&nbsp;
                                </div>
                                <span className="font-bold text-sm">ba**@dipainhouse.com</span>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-black-800">
                            Si vous ne trouvez pas le message, vérifier dans votre dossier de spam 
                        </div>
                        <span className="font-bold text-sm text-blue-500"><a href="/annonce">Ce n'est pas mon email</a></span>
                    </div>
                    <div className="flex flex-col space-y-6">
                        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            {[0, 1, 2, 3].map((index) => (
                                <div className="w-16 h-16" key={index}>
                                    <input
                                        ref={inputRefs.current[index]}
                                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                        type="text"
                                        name=""
                                        id=""
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                            <p>Didn't receive code?</p>
                            <button className="flex items-center text-blue-600" onClick={handleResendClick}>Resend</button>
                        </div>
                        {showVerificationMessage && (
                            <div className="flex max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="w-2 bg-green-500"></div>
                                <div className="flex items-center px-2 py-3">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <div className="mx-3">
                                        <h2 className="text-xl font-semibold text-gray-800">Verification</h2>
                                        <p className="text-gray-600">Le code de verification a été renvoyé.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={nextStep}
                                className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Verifier
                            </button>
                        </div>
                    </div>
                </div>
                        )*/}
                         {step ===2 && (
                  <>
                  <Typography variant="h4" color="black">
                      Cree une annonce d'emploi
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Etape 2/2 : Ajouter la description de poste, le type de contrat et le nombre de poste
                  </Typography>
                  <div className="mb-1 flex flex-col gap-4 mt-2">
                     

                       <Typography variant="h6" color="black" className="-mb-3">
                               Nombre de postes *
                            </Typography>
                            <Input
                                size="lg"
                                placeholder="Ex: 2"
                                className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg" 
                                labelProps={{ className: "before:content-none after:content-none" }}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                       <Typography variant="h6" color="black" className="-mb-3">
                       Type de contract *
                            </Typography>
                           
                            
                             <Multione  options={contractTypeOptions}/>
                             <textarea placeholder='Description' rows="6" name='message' className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#007bff]"></textarea>
                      
                  </div>
                 
                
                  <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                onClick={nextStep}
                                className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Next
                            </button>
                        </div>
              </>
                           
                )}

                {step ===3 && (
                  dev
                           
                )}
                {step === 4 && (
                    <>
                        <Typography variant="h4" color="black">
                            Step 2: Terms and Conditions
                        </Typography>
                        <Typography color="gray" classNameName="mt-1 font-normal">
                            Please read and agree to the terms and conditions.
                        </Typography>
                        <div className="mt-4 flex items-center">
                            <Checkbox
                                containerProps={{ className: "-ml-2.5" }}
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                            />
                            <Typography
                                variant="small"
                                color="gray"
                                className="ml-2 font-normal border-b border-gray-300"
                            >
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="font-medium transition-colors hover:text-blue-700"
                                >
                                    Terms and Conditions
                                </a>
                            </Typography>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </form>
          </div>
        </Card>
        </div>
    );
}

export default MultiStepjobForm;

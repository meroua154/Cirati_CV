import React, { useState } from 'react';
import instance from '../../utils/setAuthToken';
import Multi from "./multi";
import Multione from "./multione";
import options from "./optionsjob";
import { useSelector } from "react-redux";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import hire from "../../assets/Images/hire.jpg";
function MultiStepjobForm() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const contractTypeOptions = [
        { value: "Temps plein", label: "Temps plein" },
        { value: "Temps partiel", label: "Temps partiel" },
        { value: "Contrat à durée déterminée (CDD)", label: "Contrat à durée déterminée (CDD)" },
        { value: "Contrat à durée indéterminée (CDI)", label: "Contrat à durée indéterminée (CDI)" },
        { value: "Contrat d'apprentissage", label: "Contrat d'apprentissage" },
        { value: "Contrat de professionnalisation", label: "Contrat de professionnalisation" },
        { value: "Contrat de stage", label: "Contrat de stage" },
        { value: "Contrat d'intérim", label: "Contrat d'intérim" },
        { value: "Contrat de freelance", label: "Contrat de freelance" },
        { value: "Contrat de mission", label: "Contrat de mission" }
    ]; 
    
    const experienceOptions = [
        { value: "Moins de 1 an", label: "Moins de 1 an" },
        { value: "1 - 3 ans", label: "1 - 3 ans" },
        { value: "4 - 7 ans", label: "4 - 7 ans" },
        { value: "Plus de 7 ans", label: "Plus de 7 ans" }
    ];
    
    const jobLevelOptions = [
        { value: "Débutant", label: "Débutant" },
        { value: "Junior", label: "Junior" },
        { value: "Intermédiaire", label: "Intermédiaire" },
        { value: "Senior", label: "Senior" },
        { value: "Cadre supérieur", label: "Cadre supérieur" }
    ];
    
    const educationLevelOptions = [
        { value: "Pas de formation formelle", label: "Pas de formation formelle" },
        { value: "Diplôme d'études secondaires", label: "Diplôme d'études secondaires" },
        { value: "Diplôme d'associé", label: "Diplôme d'associé" },
        { value: "Licence", label: "Licence" },
        { value: "Master", label: "Master" },
        { value: "Doctorat", label: "Doctorat" }
    ];
    

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        secteur: [],
        address: '',
        AnneeExperience: '',
        level: '',
        levelEducation: '',
        Nbposts: '',
        description: '',
        Contratype: '',
        duration: '',
        salary: '',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = type === 'checkbox' ? checked : value;

        if (type === 'date') {
            newValue = e.target.value;
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleMultiChange = (selectedOptions) => {
        const selectedSectors = {};
        selectedOptions.forEach(selectedOption => {
            options.forEach(sector => {
                sector.options.forEach(poste => {
                    if (poste.value === selectedOption.value) {
                        if (selectedSectors.hasOwnProperty(sector.label)) {
                            selectedSectors[sector.label].push(poste.value);
                        } else {
                            selectedSectors[sector.label] = [poste.value];
                        }
                    }
                });
            });
        });
        console.log(selectedSectors)
        setFormData(prevState => ({
            ...prevState,
            secteur: selectedSectors
        }));
    };
    
    
    
    
    

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            if (!isAuthenticated || !user) {
                alert('Veuillez vous connecter pour publier une annonce.');
                return;
            }
            const jobData = {
                ...formData,
                recruiter: user._id,
                recruiterName: user.name,
                recruiterPic: user.profilpic
            };
    
            const response = await instance.post('http://localhost:4000/job/add_job', jobData);
            console.log(response.data);
            alert('Annonce publiée avec succès!');
            setStep(1);
        } catch (error) {
            console.error('Erreur lors de la publication de l\'annonce:', error);
            alert('Erreur lors de la publication de l\'annonce. Veuillez réessayer.');
        }
    };
    

    return (
        <div className='bg-cover' style={{ backgroundImage: `url(${hire})` }}>
            <Card color="transparent" shadow={true} className='drop-shadow-xl'>
                <div className="flex justify-center items-center mt-32 ">
                    <form onSubmit={handleSubmit} className="border border-gray-300 p-4 bg-white rounded  mb-12" style={{ maxWidth: '600px' }}>
                        {step === 1 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 1/4 : Remplissez les champs suivants pour publier votre offre d'emploi
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
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Métier *
                                    </Typography>
                                    <Multi
                                        name="secteur"
                                        jobs={options}
                                        onChange={handleMultiChange}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Lieu de travail *
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Alger"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Années d'expérience *
                                    </Typography>
                                    <Multione
                                        options={experienceOptions}
                                        onChange={(selectedOption) => setFormData(prevState => ({
                                            ...prevState,
                                            AnneeExperience: selectedOption.value
                                        }))}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Niveau de poste *
                                    </Typography>
                                    <Multione
                                        options={jobLevelOptions}
                                        onChange={(selectedOption) => setFormData(prevState => ({
                                            ...prevState,
                                            level: selectedOption.value
                                        }))}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Niveau d'étude *
                                    </Typography>
                                    <Multione
                                        options={educationLevelOptions}
                                        onChange={(selectedOption) => setFormData(prevState => ({
                                            ...prevState,
                                            levelEducation: selectedOption.value
                                        }))}
                                    />
                                </div>

                                <Button className="mt-6 text-white bg-light hover:bg-primary w-full" onClick={() => setStep(step + 1)}>Next</Button>
                            </>
                        )}

                        {/* Autres étapes */}

                        {/* Etape 2 */}
                        {step === 2 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 2/4 : Ajoutez la description du poste, le type de contrat et le nombre de postes
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Description du poste *
                                    </Typography>
                                    <textarea
                                        className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                        placeholder="Décrivez le poste en détail..."
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Type de contrat *
                                    </Typography>
                                    <Multione
                                        options={contractTypeOptions}
                                        onChange={(selectedOption) => setFormData(prevState => ({
                                            ...prevState,
                                            Contratype: selectedOption.value
                                        }))}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Nombre de postes *
                                    </Typography>
                                    <Input
                                        type="number"
                                        size="lg"
                                        placeholder="Ex: 3"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="Nbposts"
                                        value={formData.Nbposts}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Etape 3 */}
                        {step === 3 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 3/4 : Ajoutez la durée en mois, le salaire et la date limite de candidature
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Durée en mois *
                                    </Typography>
                                    <Input
                                        type="number"
                                        size="lg"
                                        placeholder="Ex: 12"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Salaire *
                                    </Typography>
                                    <Input
                                        type="text"
                                        size="lg"
                                        placeholder="Ex: 40000 DA"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleChange}
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Date limite de candidature *
                                    </Typography>
                                    <Input
                                        type="date"
                                        size="lg"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setStep(step + 1)}
                                        className="mt-4 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
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

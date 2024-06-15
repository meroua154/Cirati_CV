import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import cvv from "../../../assets/Images/cvv.jpg";

function FormEmploi() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
   
    const [formData, setFormData] = useState({
        fullName: '',
        jobTitle: '',
        degreeTitle: '',
        desiredPosition: '',
        professionalSummary: '',
        location: '',
        yearsOfExperience: '',
        usefulLinks: {
            LinkedIn: 'https://www.linkedin.com/',
            GitHub: 'https://github.com/',
            Portfolio: 'https://example.com/portfolio',
            CV: 'https://example.com/cv',
        },
        agreedToTerms: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    const handleLinkChange = (name, value) => {
        setFormData((prevState) => ({
            ...prevState,
            usefulLinks: {
                ...prevState.usefulLinks,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log(formData);
        // Example of how to submit data to backend or dispatch an action
        // dispatch(submitFormData(formData));
    };

    const [step, setStep] = useState(1);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className='bg-cover mt-8' style={{ backgroundImage: `url(${cvv})` }}>
            <Card color="transparent" shadow={true} className='drop-shadow-xl'>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="border border-gray-300 p-4 bg-white rounded mb-12 mt-12" style={{ maxWidth: '600px' }}>
                        {step === 1 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une demande d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 1/3 : Remplissez les champs suivants pour publier votre demande d'emploi
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                       Nom complet*
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Moussouni Lounis"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
        
                                    <Typography variant="h6" color="black" className="-mb-3">
                                       Titre professionnel*
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Développeur Web"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        name="jobTitle"
                                        value={formData.jobTitle}
                                        onChange={handleChange}
                                        required
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                       Intitulé du diplôme
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Licence en Informatique"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        name="degreeTitle"
                                        value={formData.degreeTitle}
                                        onChange={handleChange}
                                        required
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Poste souhaité
                                    </Typography>
                                    <Input
                                       size="lg"
                                       placeholder="Ex: Développeur Full-stack"
                                       className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                       name="desiredPosition"
                                       value={formData.desiredPosition}
                                       onChange={handleChange}
                                       required
                                    />

                                    <Typography variant="h6" color="black" className="-mb-3">
                                         Années d'expérience*
                                    </Typography>
                                    <Input
                                        type="number"
                                        size="lg"
                                        placeholder="Ex: 2 ans"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        name="yearsOfExperience"
                                        value={formData.yearsOfExperience}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Button className="mt-6 text-white bg-primary hover:bg-light w-full" onClick={nextStep}>Suivant</Button>
                            </>
                        )}

                        {/* Etape 2 */}
                        {step === 2 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une demande d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 2/3 : Ajoutez les liens utiles
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Liens Utiles *
                                    </Typography>
                                    {Object.entries(formData.usefulLinks).map(([name, link], index) => (
                                        <div key={name} className="flex items-center space-x-2 mt-1">
                                            <Input
                                                size="lg"
                                                placeholder={`Lien pour ${name}`}
                                                className="flex-grow text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                                value={link}
                                                onChange={(e) => handleLinkChange(name, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <Button className="mt-6 text-white bg-primary hover:bg-light w-full" onClick={nextStep}>Suivant</Button>
                                <Button className="mt-2 text-white bg-light hover:bg-gray-700 w-full" onClick={prevStep}>Précédent</Button>
                            </>
                        )}

                        {/* Etape 3 */}
                        {step === 3 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une demande d'emploi
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 3/3 : Termes et conditions
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
                                        J'accepte les{" "}
                                        <a
                                            href="#"
                                            className="font-medium transition-colors hover:text-blue-700"
                                        >
                                            termes et conditions
                                        </a>
                                    </Typography>
                                </div>

                                <div className="flex justify-between mt-6">
                                        <Button
                                            type="button"
                                            onClick={prevStep}
                                            className="mt-4 mr-4 bg-light hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                                        >
                                            Précédent
                                        </Button>
                                        <Button
                                            type="submit"
                                            className="mt-4 bg-primary hover:bg-light text-white font-bold py-2 px-4 rounded text-black"
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </Card>
            </div>
        );
    }
    
    export default FormEmploi;


import React, { useState } from 'react';
import Multi from "./Multi";
import instance from '../../utils/setAuthToken';
import { useSelector } from "react-redux";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import sponsor from "../../assets/Images/sponsor.jpg";



function SponsorForm() {
        const { isAuthenticated, user } = useSelector((state) => state.auth);
        
        // Les options pour les différents champs de sélection
        const sectorOptions = [
            { value: "Sport", label: "Sport" },
            { value: "Caritatif", label: "Caritatif" },
            { value: "Artistique", label: "Artistique" },
            { value: "Technologique", label: "Technologique" },
            { value: "Communautaire", label: "Communautaire" },
            { value: "Culturel", label: "Culturel" },
            { value: "Éducatif", label: "Éducatif" }
        ]; 
        
        const [step, setStep] = useState(1);
        const [formData, setFormData] = useState({
            title: '',
            userId:user._id,
            projectDescription: '',
            projectObjectives: '',
            targetAudience: '',
            budget: '',
            sponsorBenefits: '',
            partnershipDuration: '',
            primaryContactName: '',
            primaryContactEmail: '',
            primaryContactPhone: '',
            sector: [],
            projectLocation: '',
            existingMediaPromotions: '',
            existingPartnerships: '',
            agreedToTerms: false,
        });
    
        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        };
    
        const handleMultiChange = (selectedOptions) => {

            const values = selectedOptions.map(option => option.value);
            setFormData(prevState => ({
                ...prevState,
                sector: values
            }));
        };
        

        const prevStep = () => {
            setStep(step - 1);
        };
    
        const validateStep = () => {
            switch (step) {
                case 1:
                    return formData.title && formData.projectDescription && formData.projectObjectives && formData.targetAudience && formData.budget;
                case 2:
                    return formData.sponsorBenefits && formData.partnershipDuration && formData.primaryContactName && formData.primaryContactEmail && formData.primaryContactPhone;
                case 3:
                    return formData.sector && 
                    formData.projectLocation && formData.existingMediaPromotions && formData.existingPartnerships;
                case 4:
                    return formData.agreedToTerms;
                default:
                    return false;
            }
        };
        const nextStep = () => {
            if (validateStep()) {
                setStep(step + 1);
            } else {
                alert('Veuillez remplir tous les champs requis avant de passer à l\'étape suivante.');
            }
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
            if (!isAuthenticated || !user) {
                alert('Veuillez vous connecter pour publier une annonce.');
                return;
            }
            const response = await instance.post('/sponsor', formData);
            console.log(response.data);
            alert('Annonce publiée avec succès!');
            setStep(1);
        } catch (error) {
            console.error('Erreur lors de la publication de l\'annonce:', error);
            alert('Erreur lors de la publication de l\'annonce. Veuillez réessayer.');
        }
        };
    

    return (
        <div className='bg-cover mt-8' style={{ backgroundImage: `url(${sponsor})` }}>
            <Card color="transparent" shadow={true} className='drop-shadow-xl'>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="border border-gray-300 p-4 bg-white rounded  mb-12 mt-12" style={{ maxWidth: '600px' }}>
                        {step === 1 && (
                            <>
                                <Typography variant="h4" color="black">
                                  Créez une annonce pour rechercher un sponsoring
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 1/4 : Veuillez remplir les champs suivants pour publier votre demande de sponsoring.
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Titre du projet
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Programme de Formation pour les Jeunes Entrepreneurs"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                     <Typography variant="h4" color="black">
                                       Description du projet
                                     </Typography>
                                     <textarea
                                        className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                        placeholder="Décrivez le projet en détail..."
                                        name="projectDescription"
                                        value={formData.projectDescription}
                                        onChange={handleChange}
                                        required
                                     ></textarea>

                                    <Typography variant="h4" color="black">
                                      Objectifs du projet
                                    </Typography>
                                    <textarea
                                      className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                      placeholder="Quels sont les objectifs à atteindre?"
                                      name="projectObjectives"
                                      value={formData.projectObjectives}
                                      onChange={handleChange}
                                      required
                                    ></textarea>


                                    

                                    <Typography variant="h4" color="black">
                                      Public cible
                                    </Typography>
                                    <Input
                                      size="lg"
                                      placeholder="Ex: Jeunes de 18 à 25 ans"
                                      className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                      labelProps={{ className: "before:content-none after:content-none" }}
                                      name="targetAudience"
                                      value={formData.targetAudience}
                                      onChange={handleChange}
                                      required
                                    />

                                    <Typography variant="h4" color="black">
                                      Budget
                                    </Typography>
                                    <Input
                                      size="lg"
                                      placeholder="Ex: 700000 DA"
                                      className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                      labelProps={{ className: "before:content-none after:content-none" }}
                                      name="budget"
                                      value={formData.budget}
                                      onChange={handleChange}
                                      required
                                    />

                                   
                                </div>

                                <Button className="mt-6 text-white bg-primary hover:bg-light w-full" onClick={nextStep}>Suivant</Button>
                            </>
                        )}

                        {/* Autres étapes */}

                        {/* Etape 2 */}
                        {step === 2 && (
                            <>
                                <Typography variant="h4" color="black">
                                   Créez une annonce pour rechercher un sponsoring
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 2/4 : Ajoutez les avantages pour les sponsors, la durée du partenariat et les informations de contact
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Avantages pour les sponsors
                                    </Typography>
                                    <textarea
                                      className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                      placeholder="Quels avantages offre ce projet aux sponsors?"
                                      name="sponsorBenefits"
                                      value={formData.sponsorBenefits}
                                      onChange={handleChange}
                                      required
                                    ></textarea>

                                    <Typography variant="h4" color="black">
                                      Durée du partenariat
                                    </Typography>
                                    <Input
                                      size="lg"
                                      placeholder="Ex: 1 an"
                                      className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                      labelProps={{ className: "before:content-none after:content-none" }}
                                      name="partnershipDuration"
                                      value={formData.partnershipDuration}
                                      onChange={handleChange}
                                      required
                                    />

                                    <Typography variant="h4" color="black">
                                      Contact principal
                                    </Typography>
                                    <Input
                                      size="lg"
                                      placeholder="Nom du contact"
                                      className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                      labelProps={{ className: "before:content-none after:content-none" }}
                                      name="primaryContactName"
                                      value={formData.primaryContactName}
                                      onChange={handleChange}
                                      required
                                    />

                                    <Input
                                      size="lg"
                                      type="email"
                                      placeholder="E-mail du contact"
                                      className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                      labelProps={{ className: "before:content-none after:content-none" }}
                                      name="primaryContactEmail"
                                      value={formData.primaryContactEmail}
                                      onChange={handleChange}
                                      required
                                    />

                                    <Input
                                       size="lg"
                                       type="tel"
                                       placeholder="Numéro de téléphone du contact"
                                       className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                       labelProps={{ className: "before:content-none after:content-none" }}
                                       name="primaryContactPhone"
                                       value={formData.primaryContactPhone}
                                       onChange={handleChange}
                                       pattern="^\d{10}$"
                                       maxLength={10}
                                       title="Le numéro de téléphone doit contenir 10 chiffres"
                                       required
                                    />



                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Précédent
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        className="mt-4 bg-primary hover:bg-light text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Etape 3 */}
                        {step === 3 && (
                            <>
                                <Typography variant="h4" color="black">
                                   Créez une annonce pour rechercher un sponsoring
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Etape 3/4 :  Ajoutez le secteur du projet, le lieu, les médias et promotions existants, et les partenariats existants
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                <Typography variant="h4" color="black">
                                    Secteur du projet
                                </Typography>
                                <Multi
                                    name="sector"
                                    jobs={sectorOptions}
                                    onChange={handleMultiChange}
                                    required
                                />

                                <Typography variant="h4" color="black">
                                    Lieu du projet
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Ex: Alger, Annaba"
                                    className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                    labelProps={{ className: "before:content-none after:content-none" }}
                                    name="projectLocation"
                                    value={formData.projectLocation}
                                    onChange={handleChange}
                                    required
                                />

                                <Typography variant="h4" color="black">
                                    Médias et promotions partenariaux existants
                                </Typography>
                                <textarea
                                    className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                    placeholder="Détaillez les médias et promotions existants liés à ce projet"
                                    name="existingMediaPromotions"
                                    value={formData.existingMediaPromotions}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                 <Typography variant="h4" color="black">
                                    Partenariats existants
                                </Typography>
                                <textarea
                                    className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                    placeholder="Listez les partenariats existants avec d'autres entités ou entreprises"
                                    name="existingPartnerships"
                                    value={formData.existingPartnerships}
                                    onChange={handleChange}
                                    required
                                ></textarea>

                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                       Précédent
                                    </button>
                                    <button
                                        onClick={nextStep}
                                        className="mt-4 bg-primary hover:bg-light text-white font-bold py-2 px-4 rounded text-black"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            </>
                        )}

{step === 4 && (
                    <>
                        <Typography variant="h4" color="black">
                           Étape 2 : Termes et Conditions
                        </Typography>
                        <Typography color="gray" classNameName="mt-1 font-normal">
                           Veuillez lire et accepter les termes et conditions.
                        </Typography>
                        <div className="mt-4 flex items-center">
                            <Checkbox
                                containerProps={{ className: "-ml-2.5" }}
                                name="agreedToTerms"
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
                                required
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
                                    Termes et Conditions
                                </a>
                            </Typography>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={prevStep}
                                className="mt-4 mr-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-black"
                            >
                                Précédent
                            </button>
                            <button
                                type="submit"
                                className="mt-4 bg-primary hover:bg-light text-white font-bold py-2 px-4 rounded text-black"
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

export default SponsorForm;

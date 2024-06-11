import React, { useState } from 'react';
import Multi from "./Multi"; // Assurez-vous que ce composant est correctement importé ou remplacez-le si nécessaire

import { useSelector } from "react-redux";
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import event from "../../assets/Images/event.jpg";

function EventForm() {
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

    const eventTypeOptions = [
        { value: "Conférence", label: "Conférence" },
        { value: "Atelier", label: "Atelier" },
        { value: "Séminaire", label: "Séminaire" },
        { value: "Webinaire", label: "Webinaire" },
        { value: "Concert", label: "Concert" },
        { value: "Exposition", label: "Exposition" },
        { value: "Autre", label: "Autre" }
    ];

    const [etape, setEtape] = useState(1);
    const [donneesFormulaire, setDonneesFormulaire] = useState({
        titre: '',
        description: '',
        date: '',
        heure: '',
        lieu: '',
        typeEvenement: '',
        organisateur: '',
        emailContact: '',
        telephoneContact: '',
        secteur: '',
        promotionMedia: '',
        partenariatsExistants: '',
        accepteTermes: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setDonneesFormulaire(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMultiChange = (selectedOption) => {
        setDonneesFormulaire(prevState => ({
            ...prevState,
            secteur: selectedOption
        }));
    };

    const handleEventTypeChange = (selectedOption) => {
        setDonneesFormulaire(prevState => ({
            ...prevState,
            typeEvenement: selectedOption
        }));
    };

    const etapePrecedente = () => {
        setEtape(etape - 1);
    };

    const validerEtape = () => {
        switch (etape) {
            case 1:
                return donneesFormulaire.titre && donneesFormulaire.description && donneesFormulaire.date && donneesFormulaire.heure && donneesFormulaire.lieu && donneesFormulaire.typeEvenement;
            case 2:
                return donneesFormulaire.organisateur && donneesFormulaire.emailContact && donneesFormulaire.telephoneContact;
            case 3:
                return donneesFormulaire.secteur && donneesFormulaire.promotionMedia && donneesFormulaire.partenariatsExistants;
            case 4:
                return donneesFormulaire.accepteTermes;
            default:
                return false;
        }
    };

    const etapeSuivante = () => {
        if (validerEtape()) {
            setEtape(etape + 1);
        } else {
            alert('Veuillez remplir tous les champs requis avant de passer à l\'étape suivante.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Gestion de la soumission du formulaire
    };

    return (
        <div className='bg-cover mt-8' style={{ backgroundImage: `url(${event})` }}>
            <Card color="transparent" shadow={true} className='drop-shadow-xl'>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="border border-gray-300 p-4 bg-white rounded  mb-12 mt-12" style={{ maxWidth: '600px' }}>
                        {etape === 1 && (
                            <>
                                <Typography variant="h4" color="black">
                                  Créez une annonce pour votre événement
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Étape 1/4 : Veuillez remplir les champs suivants pour publier votre annonce d'événement.
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h6" color="black" className="-mb-3">
                                        Titre de l'événement
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Conférence sur l'IA"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="titre"
                                        value={donneesFormulaire.titre}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Description de l'événement
                                    </Typography>
                                    <textarea
                                        className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                        placeholder="Décrivez l'événement en détail..."
                                        name="description"
                                        value={donneesFormulaire.description}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    <Typography variant="h4" color="black">
                                        Date de l'événement
                                    </Typography>
                                    <Input
                                        size="lg"
                                        type="date"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="date"
                                        value={donneesFormulaire.date}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Heure de l'événement
                                    </Typography>
                                    <Input
                                        size="lg"
                                        type="time"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="heure"
                                        value={donneesFormulaire.heure}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Lieu de l'événement
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Ex: Paris, France"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="lieu"
                                        value={donneesFormulaire.lieu}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Type de l'événement
                                    </Typography>
                                    <Multi
                                        name="typeEvenement"
                                        options={eventTypeOptions}
                                        onChange={handleEventTypeChange}
                                        required
                                    />
                                </div>

                                <Button className="mt-6 text-white bg-primary hover:bg-light w-full" onClick={etapeSuivante}>Suivant</Button>
                            </>
                        )}

                        {/* Étape 2 */}
                        {etape === 2 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce pour votre événement
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Étape 2/4 : Ajoutez les informations de contact de l'organisateur
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h4" color="black">
                                        Nom de l'organisateur
                                    </Typography>
                                    <Input
                                        size="lg"
                                        placeholder="Nom de l'organisateur"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="organisateur"
                                        value={donneesFormulaire.organisateur}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        E-mail de contact
                                    </Typography>
                                    <Input
                                        size="lg"
                                        type="email"
                                        placeholder="email@exemple.com"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="emailContact"
                                        value={donneesFormulaire.emailContact}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Téléphone de contact
                                    </Typography>
                                    <Input
                                        size="lg"
                                        type="tel"
                                        placeholder="0123456789"
                                        className="flex text-sm text-gray-500 border border-gray-900 rounded shadow-sm border-solid border-1 transition-all duration-300 outline-none focus:outline-none rounded-lg"
                                        labelProps={{ className: "before:content-none after:content-none" }}
                                        name="telephoneContact"
                                        value={donneesFormulaire.telephoneContact}
                                        pattern="^\d{10}$"
                                        maxLength={10}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Button className="text-white bg-primary hover:bg-light" onClick={etapePrecedente}>Précédent</Button>
                                    <Button className="text-white bg-primary hover:bg-light" onClick={etapeSuivante}>Suivant</Button>
                                </div>
                            </>
                        )}

                        {/* Étape 3 */}
                        {etape === 3 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce pour votre événement
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Étape 3/4 : Détails supplémentaires
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Typography variant="h4" color="black">
                                        Secteur de l'événement
                                    </Typography>
                                    <Multi
                                        name="secteur"
                                        options={sectorOptions}
                                        onChange={handleMultiChange}
                                        required
                                    />
                                    <Typography variant="h4" color="black">
                                        Promotion média
                                    </Typography>
                                    <textarea
                                        className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                        placeholder="Détails de la promotion média..."
                                        name="promotionMedia"
                                        value={donneesFormulaire.promotionMedia}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                    <Typography variant="h4" color="black">
                                        Partenariats existants
                                    </Typography>
                                    <textarea
                                        className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none h-24"
                                        placeholder="Détails des partenariats existants..."
                                        name="partenariatsExistants"
                                        value={donneesFormulaire.partenariatsExistants}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Button className="text-white bg-primary hover:bg-light" onClick={etapePrecedente}>Précédent</Button>
                                    <Button className="text-white bg-primary hover:bg-light" onClick={etapeSuivante}>Suivant</Button>
                                </div>
                            </>
                        )}

                        {/* Étape 4 */}
                        {etape === 4 && (
                            <>
                                <Typography variant="h4" color="black">
                                    Créez une annonce pour votre événement
                                </Typography>
                                <Typography color="gray" className="mt-1 font-normal">
                                    Étape 4/4 : Termes et conditions
                                </Typography>
                                <div className="mb-1 flex flex-col gap-4 mt-2">
                                    <Checkbox
                                        label="J'accepte les termes et conditions"
                                        name="accepteTermes"
                                        checked={donneesFormulaire.accepteTermes}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between mt-6">
                                    <Button className="text-white bg-primary hover:bg-light" onClick={etapePrecedente}>Précédent</Button>
                                    <Button className="text-white bg-primary hover:bg-light" type="submit">Soumettre</Button>
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </Card>
        </div>
    );
}

export default EventForm;

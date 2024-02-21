import axios from 'axios';

const baseURL = 'http://localhost:4000';

export const getRecruteurs = async () => {
  try {
    const response = await axios.get(`${baseURL}/user/recruiter`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des recruteurs:', error);
    throw error; 
  }
};

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Matchingjob from '../../components/matchjob';

export default function Fullcv() {
  const [applicantsData, setApplicantsData] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/user/applicants')
      .then(response => {
        setApplicantsData(response.data);
        setFilteredApplicants(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (searchData) => {
    const filtered = applicantsData.filter(applicant => {
      const statut = applicant.preferences.statut ? applicant.preferences.statut.toLowerCase() : '';
      const metier = applicant.preferences.metier ? applicant.preferences.metier.toLowerCase() : '';
      return (
        (searchData.statut === 'all' || statut.includes(searchData.statut.toLowerCase())) &&
        (searchData.metier === '' || metier.includes(searchData.metier.toLowerCase()))
      );
    });
    setFilteredApplicants(filtered);
  };

  const resetFilters = () => {
    setFilteredApplicants(applicantsData);
  };

  return (
    <div>
      <Search onSearch={handleSearch} resetFilters={resetFilters} applicantsData={applicantsData} />
      <div><Matchingjob applicants={filteredApplicants} /></div>
    </div>
  );
}

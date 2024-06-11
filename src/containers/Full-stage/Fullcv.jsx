<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicants, setFilteredApplicants, resetFilters } from './slices/applicantsSlice';
=======
import React, { useState, useEffect } from 'react';
import instance from '../../utils/setAuthToken';
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
import Search from './components/Search';
import Matchingjob from '../../components/matchjob';

export default function Fullcv() {
<<<<<<< HEAD
  const dispatch = useDispatch();
  const applicantsData = useSelector((state) => state.applicants.applicantsData);
  const filteredApplicants = useSelector((state) => state.applicants.filteredApplicants);

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);
=======
  const [applicantsData, setApplicantsData] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);

  useEffect(() => {
    instance.get('http://localhost:4000/user/applicants')
      .then(response => {
        setApplicantsData(response.data);
        setFilteredApplicants(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22

  const handleSearch = (searchData) => {
    const filtered = applicantsData.filter(applicant => {
      const statut = applicant.preferences.statut ? applicant.preferences.statut.toLowerCase() : '';
      const metier = applicant.preferences.metier ? applicant.preferences.metier.toLowerCase() : '';
      return (
        (searchData.statut === 'all' || statut.includes(searchData.statut.toLowerCase())) &&
        (searchData.metier === '' || metier.includes(searchData.metier.toLowerCase()))
      );
    });
<<<<<<< HEAD
    dispatch(setFilteredApplicants(filtered));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
=======
    setFilteredApplicants(filtered);
  };

  const resetFilters = () => {
    setFilteredApplicants(applicantsData);
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
  };

  return (
    <div>
<<<<<<< HEAD
      <Search onSearch={handleSearch} resetFilters={handleResetFilters} applicantsData={applicantsData} />
=======
      <Search onSearch={handleSearch} resetFilters={resetFilters} applicantsData={applicantsData} />
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
      <div><Matchingjob applicants={filteredApplicants} /></div>
    </div>
  );
}

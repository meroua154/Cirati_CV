import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicants, setFilteredApplicants, resetFilters } from './slices/applicantsSlice';
import Search from './components/Search';
import Matchingjob from '../../components/matchjob';

export default function Fullcv() {
  const dispatch = useDispatch();
  const applicantsData = useSelector((state) => state.applicants.applicantsData);
  const filteredApplicants = useSelector((state) => state.applicants.filteredApplicants);

  useEffect(() => {
    dispatch(fetchApplicants());
  }, [dispatch]);

  const handleSearch = (searchData) => {
    const filtered = applicantsData.filter(applicant => {
      const statut = applicant.preferences.statut ? applicant.preferences.statut.toLowerCase() : '';
      const metier = applicant.preferences.metier ? applicant.preferences.metier.toLowerCase() : '';
      return (
        (searchData.statut === 'all' || statut.includes(searchData.statut.toLowerCase())) &&
        (searchData.metier === '' || metier.includes(searchData.metier.toLowerCase()))
      );
    });
    dispatch(setFilteredApplicants(filtered));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div>
      <Search onSearch={handleSearch} resetFilters={handleResetFilters} applicantsData={applicantsData} />
      <div><Matchingjob applicants={filteredApplicants} /></div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import instance from '../../utils/setAuthToken';
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import RecommendedJobs from "../../components/Recommended-jobs";
import Top_company from "../../components/topcompany";
import Matchigstage from '../../components/Matchingcv';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Fulljob() {
  useEffect(() => {
    AOS.init();
  }, []); 


  const [JOBS, SETJOBS] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
 
  useEffect(() => {
    instance.get('http://localhost:4000/job/get_jobs')
      .then(response => {
        SETJOBS(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const filteredJobs = JOBS.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.address.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div>
      <div data-aos="zoom-in-down" data-aos-duration="2000"><Hero setSearchTerm={setSearchTerm} setLocation={setLocation} /></div>
      <div><Matchigstage jobs={searchTerm || location ? filteredJobs : JOBS} /></div>
      <div><RecommendedJobs /></div>
      <div><Top_company /></div>
    </div>
  );
}

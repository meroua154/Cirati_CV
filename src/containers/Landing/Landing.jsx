import React, { useState, useEffect } from "react";
import Search from "../Landing/components/Search";
import Value from "../Landing/components/Value";
import Jobs from "../Landing/components/Jobs";
import axios from 'axios';

const Landing = () => {
  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/job/get_jobs')
      .then(response => {
        setJobsData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSearch = (searchData) => {
    if(jobsData){
      const filtered = jobsData.filter(job =>
        (job.title && job.title.toLowerCase().includes(searchData.title.toLowerCase())) &&
        (job.recruiterName && job.recruiterName.toLowerCase().includes(searchData.company.toLowerCase())) &&
        (job.address && job.address.toLowerCase().includes(searchData.location.toLowerCase()))
      );
      setFilteredJobs(filtered);
    }
  }
  
  

  return (
    <div>
      <Search onSearch={handleSearch} JobsData={jobsData} />

       <Jobs JobsData={filteredJobs.length > 0 ? filteredJobs : jobsData} />
       <Value />
    </div>
  );
};

export default Landing;

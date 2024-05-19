


import React, { useState, useEffect } from "react";
import Search from "../Landing/components/Search";
import Value from "../Landing/components/Value";
import Jobs from "../Landing/components/Jobs";

import RecommendedJobs from "../../components/Recommended-jobs";
import Top_company from "../../components/topcompany"
import instance from "../../utils/setAuthToken";

import AOS from 'aos';
import 'aos/dist/aos.css';



const Landing = () => {
  useEffect(() => {
    AOS.init();
  }, []); 

  const [jobsData, setJobsData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  
  useEffect(() => {
    instance.get('/job/derniersjobs')
      .then(response => {
        setJobsData(response.data);
        setFilteredJobs(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const handleSearch = (searchData) => {
    let filtered = jobsData.filter(job =>
      
      (job.title.toLowerCase().includes(searchData.title.toLowerCase())) &&
      (job.recruiterName.toLowerCase().includes(searchData.recruiterName.toLowerCase())) &&
      (job.address.toLowerCase().includes(searchData.address.toLowerCase()))
    );
    if (searchData.sortby !== "all") {
      if (searchData.sortby === "Less than 10000") {
        filtered = filtered.filter(job => job.salary <= 10000);
      } else if (searchData.sortby === "Between 10000 and 40000") {
        filtered = filtered.filter(job => job.salary >= 10000 && job.salary <= 40000);
      } else if (searchData.sortby === "Between 40000 and 80000") {
        filtered = filtered.filter(job => job.salary >= 40000 && job.salary <= 80000);
      } else if (searchData.sortby === "Between 80000 and 120000") {
        filtered = filtered.filter(job => job.salary >= 80000 && job.salary <= 120000);
        console.log( filtered)
      } else if (searchData.sortby === "More than 120000") {
        filtered = filtered.filter(job => job.salary >= 120000);
      }
  }
    if (searchData.type !== "all") {
      filtered = filtered.filter(job => job.type === searchData.type);
    }

    if (searchData.level !== "all") {
      filtered = filtered.filter(job => job.level === searchData.level);
    }
    if (searchData.level == "all" ||searchData.type == "all"||searchData.sortby == "all") {
      resetFilters()
    }
    setFilteredJobs(filtered);
  }

  const resetFilters = () => {
    setFilteredJobs(jobsData);
  }

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="">
      <Search onSearch={handleSearch} resetFilters={resetFilters}  jobsData ={jobsData}/>
      <Jobs JobsData={filteredJobs} />
      <RecommendedJobs/>
      <Top_company/>
      <Value />
    </div>
  );
  }

export default Landing;

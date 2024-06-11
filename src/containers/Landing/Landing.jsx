<<<<<<< HEAD
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setFilteredJobs, resetFilters } from './slices/jobsSlice';
import Search from "../Landing/components/Search";
import Value from "../Landing/components/Value";
import Jobs from "../Landing/components/Jobs";
import RecommendedJobs from "../../components/Recommended-jobs";
import Top_company from "../../components/topcompany";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { setAuthToken } from "../../utils/setAuthToken";
=======



import React, { useState, useEffect } from "react";
import Search from "../Landing/components/Search";
import Value from "../Landing/components/Value";
import Jobs from "../Landing/components/Jobs";

import RecommendedJobs from "../../components/Recommended-jobs";
import Top_company from "../../components/topcompany"
import instance from "../../utils/setAuthToken";

import AOS from 'aos';
import 'aos/dist/aos.css';


>>>>>>> 93846b62112895e41eb7296ad95831804a037d22

const Landing = () => {
  useEffect(() => {
    AOS.init();
<<<<<<< HEAD
  }, []);

  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.jobs.jobsData);
  const filteredJobs = useSelector((state) => state.jobs.filteredJobs);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
      dispatch(fetchJobs());
    }
  }, [dispatch]);

  const handleSearch = (searchData) => {
    let filtered = jobsData.filter(job =>
=======
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
      
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
      (job.title.toLowerCase().includes(searchData.title.toLowerCase())) &&
      (job.recruiterName.toLowerCase().includes(searchData.recruiterName.toLowerCase())) &&
      (job.address.toLowerCase().includes(searchData.address.toLowerCase()))
    );
<<<<<<< HEAD

=======
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
    if (searchData.sortby !== "all") {
      if (searchData.sortby === "Less than 10000") {
        filtered = filtered.filter(job => job.salary <= 10000);
      } else if (searchData.sortby === "Between 10000 and 40000") {
        filtered = filtered.filter(job => job.salary >= 10000 && job.salary <= 40000);
      } else if (searchData.sortby === "Between 40000 and 80000") {
        filtered = filtered.filter(job => job.salary >= 40000 && job.salary <= 80000);
      } else if (searchData.sortby === "Between 80000 and 120000") {
        filtered = filtered.filter(job => job.salary >= 80000 && job.salary <= 120000);
<<<<<<< HEAD
      } else if (searchData.sortby === "More than 120000") {
        filtered = filtered.filter(job => job.salary >= 120000);
      }
    }

=======
        console.log( filtered)
      } else if (searchData.sortby === "More than 120000") {
        filtered = filtered.filter(job => job.salary >= 120000);
      }
  }
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22
    if (searchData.type !== "all") {
      filtered = filtered.filter(job => job.type === searchData.type);
    }

    if (searchData.level !== "all") {
      filtered = filtered.filter(job => job.level === searchData.level);
    }
<<<<<<< HEAD

    dispatch(setFilteredJobs(filtered));
  };

  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="">
      <Search onSearch={handleSearch} resetFilters={() => dispatch(resetFilters())} jobsData={jobsData} />
      <Jobs JobsData={filteredJobs} />
      <RecommendedJobs />
      <Top_company />
      <Value />
    </div>
  );
};
=======
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
>>>>>>> 93846b62112895e41eb7296ad95831804a037d22

export default Landing;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs, setFilteredJobs, resetFilters } from './slices/jobsSlice';
import Search from "../Landing/components/Search";
import Value from "../Landing/components/Value";
import Jobs from "../Landing/components/Jobs";
import RecommendedJobs from "../../components/Recommended-jobs";
import Top_company from "../../components/topcompany";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { setAuthToken } from "../../utils/setAuthToken";

const Landing = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.jobs.jobsData);
  const filteredJobs = useSelector((state) => state.jobs.filteredJobs);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthToken(token);
    }
    dispatch(fetchAllJobs());
  }, [dispatch]);

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

export default Landing;

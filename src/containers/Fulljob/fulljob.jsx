import React, { useState, useEffect } from 'react';
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero"
import RecommendedJobs from "../../components/Recommended-jobs"
import Top_company from "../../components/topcompany"
import Matchigstage from '../../components/Matchingcv';
import axios from 'axios';

export default function Fulljob() {
    const [JOBS, SETJOBS] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:4000/job/get_jobs')
        .then(response => {
            SETJOBS(response.data); 
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
    console.log(JOBS)
return (
    
<div>
    <div><Hero/></div>
    <div>< Matchigstage jobs={JOBS} /></div>
    <div><RecommendedJobs/></div>
    <div>< Top_company/></div>
</div>



)
}

import React, { useState, useEffect } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineHeart } from "react-icons/hi";

import ITImage from "/it.png";
import StockImage from "/stock.png";
import ComplianceImage from "/compliant.png";
import TravelImage from "/travel.png";
import ArchitectImage from "/architect.png";
import instance from "../utils/setAuthToken";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function RecommendedJobs() {
  const [Secteurs, SetSecteurs] = useState([]);
  useEffect(() => {
    AOS.init();
  }, []); 

  useEffect(() => {
    instance.get('/job/secteurs')
      .then(response => {
        SetSecteurs(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const Categories = ({ image, title, opening }) => {
    return (
      <div className="bg-white rounded-[10px] py-8 px-6 flex items-center justify-between lg:text-lg">
        <span className="flex items-center gap-x-4">
          <img src={image} alt="" width={30} /> <p>{title}</p>
        </span>
        <p className="font-bold">{opening} Opening</p>
      </div>
    );
  };

  const Recommended = ({
    time,
    type,
    title,
    amount,
    country,
    job,
    bgColor,
    color,
  }) => {
    return (
      <div className="w-full rounded-[5px] shadow" style={{ borderLeft: `6px solid ${color}`, maxHeightheight: '200px' }}>
        <div className="bg-white w-full p-8 rounded-t-[10px]">
          <span className="flex items-start justify-between">
            <span className="flex-1 md:flex items-start lg:gap-x-8 gap-x-4 lg:text-lg text-lg">
              <button className="p-4 rounded-md border-none outline-none md:mb-0 mb-4" style={{ backgroundColor: bgColor }}>
                <GrAnnounce size={30} style={{ color: color }} />
              </button>
              <p>Type {type}</p> <p>Time: {time} years ago</p>
            </span>
            <HiOutlineHeart className="text-lg" />
          </span>
          <div className="md:pl-24">
            <p className="text-lg font-bold md:mt-0 mt-4">{title}</p>
            <p className="text-lg pt-4">Euro {amount} / yearly</p>
          </div>
        </div>
        <div className="py-8 px-6 flex-1 md:flex justify-between rounded-b-[10px] border border-solid border-[#e2e4e7]" style={{ backgroundColor: bgColor }}>
          <div className="flex-1 md:flex items-center gap-x-8 text-lg">
            <span className="flex items-center gap-x-3">
              <IoLocationOutline className="text-lg" style={{ color: color }} />
              <p className="text-lg font-semibold">{country}</p>|
            </span>
            <span className="flex items-center gap-x-3 lg:py-0 py-4">
              <p className="text-lg font-semibold">{job}</p>
            </span>
          </div>
          <button className="rounded-lg bg-white border border-solid border-[#e2e4e7] text-lg text-black font-bold px-8 py-3 outline-none shadow hoverBtn">
            Apply Now
          </button>
        </div>
      </div>
    );
  };
    
  return (
    <div data-aos="zoom-in-down" data-aos-duration="2000" className="bg-[#f5f6fc]">
      <div className="container mx-auto px-6 py-24">
        <div className="md:flex items-center justify-between">
          <h2 className="xl:text-3xl lg:text-3xl text-2xl pl-12 font-bold">
            Recommended jobs
          </h2>
          <span className="md:flex  gap-x-4">
            <button className="rounded-lg md:mt-8 mt-8 md:mb-8 mb-4 bg-primary ml-12 text-lg text-white font-medium px-8 py-3 outline-none border-none hoverBtn">
              Latest Job
            </button>
            <button className="rounded-lg md:mt-8 mt-2 md:mb-8 mb-8 bg-transparent  md:ml-4 ml-2 border border-solid border-[#e2e4e7] text-lg text-black font-medium px-8 py-3 outline-none shadow hoverBtn">
              Premium Job
            </button>
          </span>
        </div>
        <p className="text-lg mb-6 font-light pl-12">Explore suggested job searches</p>
        <div className="xl:flex gap-x-8 mt-16 px-12">
          <div className="xl:w-1/3">
            <div className="bg-white rounded-[10px] py-8 pl-6 mb-4">
              <h2 className="text-2xl font-semibold">Job Categories</h2>
            </div>
            <div className="flex flex-col gap-y-4">
              {Secteurs.length > 0 && 
                Secteurs.map((secteur, index) => (
                  <Categories
                    key={index}
                    title={secteur.title}
                    opening={secteur.opening}
                    image={
                      index < 5
                        ? index === 0 ? ITImage :
                          index === 1 ? StockImage :
                          index === 2 ? ComplianceImage :
                          index === 3 ? TravelImage :
                          ArchitectImage
                        : index % 5 === 0 ? ITImage :
                          index % 5 === 1 ? StockImage :
                          index % 5 === 2 ? ComplianceImage :
                          index % 5 === 3 ? TravelImage :
                          ArchitectImage
                    }
                  />
                ))
              }
              <button className="rounded-lg my-4 bg-primary text-lg text-white font-bold px-8 py-3 outline-none border-none hoverBtn">
                Latest Job
              </button>
            </div>
          </div>
          <div className="xl:w-2/3 flex flex-col gap-y-3 xl:mt-0 mt-4">
            <Recommended
              time="2024"
              type="Stage"
              title="Manager"
              amount="2000-3000"
              country="Algerie"
              job="Web Developer"
              bgColor="#f5f5f5"
              color="#4b4efc"
            />
            <Recommended
              time="2024"
              type="Full-time"
              title="Data Analyst"
              amount="2500-3500"
              country="United States"
              job="Data Scientist"
              bgColor="#fdebd0"
              color="#e74c3c"
            />
            {/* Autres jobs recommandés ici */}
          </div>
        </div>
      </div>
    </div>
  );
}

import Carousel from "react-multi-carousel";
import { HiStar } from "react-icons/hi";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from 'react';

const Jobs = ({ type, img, title, color, bg_color }) => {
  return (
    <div className="shadow lg:w-[90%] mt-12"> {/* Adjusted width for desktaop */}
      <div className="bg-white rounded-t-md px-6 py-8 flex flex-col items-center">
        <span className="flex items-center justify-between w-full">
          <button
            className="rounded-full bg-transparent text-lg text-black px-8 py-2 outline-none border-none hoverBtn"
            style={{ border: `3px solid ${color}` }}
          >
            {type}
          </button>
          <HiStar className="text-3xl" />
        </span>
        <img src={img} alt="" className="w-28 h-28 rounded-full my-8" />
      </div>
      <div
        className="rounded-b-md px-6 py-8"
        style={{ backgroundColor: bg_color }}
      >
        <p className="text-2xl font-semibold">{title}</p>
        <p className="py-2 text-lg">803 46th St Brooklyn, NY</p>
        <div className="pb-4 flex items-center gap-2">
          {[...Array(5)].map((_, index) => {
            return <HiStar key={index} className="text-[#FFCC02] text-2xl" />;
          })}
        </div>
        <div className="p-2 border border-solid border-[#e2e4e7] rounded-md flex justify-between text-sm">
          <p>Salary</p>
          <p style={{ color: `${color}` }}>Rs. 3,457.00</p>
        </div>
      </div>
    </div>
  );
};

export default function Matchigstage() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth > 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="bg-[#fafbfc]">
      <div className="container mx-auto px-6 py-24 grid gap-12">
        <h2 className="text-3xl font-semibold">Matching Jobs</h2>
        <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}> {/* Adjusted grid layout based on device */}
          <Jobs
            bg_color="#f4f4ff"
            color="#4b4efc"
            img="/google.png"
            title="Product Design"
            type="Internship"
          />
          <Jobs
            bg_color="#fffbf2"
            color="#fec220"
            img="/abp.jfif"
            title="Product Mockup"
            type="Internship"
          />
          <Jobs
            bg_color="#fbf2f6"
            color="#c72b66"
            img="/google.png"
            title="Web Maintenance"
            type="Full Time"
          />
          <Jobs
            bg_color="#e8f3ea"
            color="#349c30"
            img="/aws.jfif"
            title="PHP Developer"
            type="Full Time"
          />
          <Jobs
            bg_color="#fbf2f6"
            color="#c72b66"
            img="/realistic.jfif"
            title="Web Maintenance"
            type="Full Time"
          />
          <Jobs
            bg_color="#e8f3ea"
            color="#349c30"
            img="/siriusnet.jfif"
            title="PHP Developer"
            type="Full Time"
          />
          <Jobs
            bg_color="#f5f6fc"
            color="#4b4efc"
            img="/versacee.png"
            title="Software Engineer"
            type="Internship"
          />
          <Jobs
            bg_color="#fef4f6"
            color="#b91d73"
            img="/kimland.png"
            title="Frontend Developer"
            type="Part Time"
          />
          <Jobs
            bg_color="#f2f2f2"
            color="#333333"
            img="/dell.png"
            title="iOS Developer"
            type="Full Time"
          />
          <Jobs
            bg_color="#f8fafb"
            color="#17b978"
            img="/microsoft.png"
            title="UI/UX Designer"
            type="Contract"
          />
          <Jobs
            bg_color="#eef8fa"
            color="#0d6efd"
            img="/channel.png"
            title="Cloud Engineer"
            type="Remote"
          />
        </div>
      </div>
    </div>
  );
}

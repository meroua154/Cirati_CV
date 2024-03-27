import { IoLocationOutline } from "react-icons/io5";
import { GrAnnounce } from "react-icons/gr";
import { HiOutlineHeart } from "react-icons/hi";


export default function RecommendedJobs() {
    const Categories = ({ image, title, opening }) => {
        return (
            <div className="bg-white rounded-[10px] py-8 px-6 flex items-center justify-between lg:text-2xl">
                <span className="flex items-center gap-x-4">
                    <img src={image} alt="" width={30} /> <p>{title}</p>
                </span>
                <p>{opening} Opening</p>
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
                        <span className="flex-1 md:flex items-start lg:gap-x-8 gap-x-4 lg:text-2xl text-lg">
                            <button className="p-4 rounded-md border-none outline-none md:mb-0 mb-4" style={{ backgroundColor: bgColor }}>
                                <GrAnnounce size={30} style={{ color: color }} />
                            </button>
                            <p>Type {type}</p> <p>Time: {time} years ago</p>
                        </span>
                        <HiOutlineHeart className="text-2xl" />
                    </span>
                    <div className="md:pl-24">
                        <p className="text-2xl font-semibold md:mt-0 mt-4">{title}</p>
                        <p className="text-xl pt-4">Euro {amount} / yearly</p>
                    </div>
                </div>
                <div className="py-8 px-6 flex-1 md:flex justify-between rounded-b-[10px] border border-solid border-[#e2e4e7]" style={{ backgroundColor: bgColor }}>
                    <div className="flex-1 md:flex items-center gap-x-8 text-2xl">
                        <span className="flex items-center gap-x-3">
                            <IoLocationOutline className="text-2xl" style={{ color: color }} />
                            <p className="text-xl font-light">{country}</p>|
                        </span>
                        <span className="flex items-center gap-x-3 lg:py-0 py-4">
                           
                            
                            <p className="text-xl font-light">{job}</p>
                        </span>
                    </div>
                    <button className="rounded-full bg-white border border-solid border-[#e2e4e7] text-lg text-black font-bold px-8 py-3 outline-none shadow hoverBtn">
                        Apply Now
                    </button>
                </div>
            </div>
        );
    };
    
    return (
      <div className="bg-[#f5f6fc]">
        <div className="container mx-auto px-6 py-24">
          <div className="md:flex items-center justify-between">
            <h2 className="xl:text-5xl lg:text-3xl text-2xl font-semibold">
              Recommended jobs
            </h2>
            <span className="md:flex gap-x-4">
              <button className="rounded-full my-4 bg-primary text-lg text-white font-bold px-8 py-3 outline-none border-none hoverBtn">
                Latest Job
              </button>
              <button className="rounded-full bg-transparent border border-solid border-[#e2e4e7] text-lg text-black font-bold px-8 py-3 outline-none shadow hoverBtn">
                Premium Job
              </button>
            </span>
          </div>
          <p className="text-2xl mt-4 font-light">Explore suggested job searches</p>
          <div className="xl:flex gap-x-8 mt-16">
            <div className="xl:w-2/5">
              <div className="bg-white rounded-[10px] py-8 pl-6 mb-4">
                <h2 className="text-4xl font-semibold">Job Categories</h2>
              </div>
              <div className="flex flex-col gap-y-4">
                <Categories image="/it.png" opening="3" title="IT" />
                <Categories image="/stock.png" opening="1" title="Finance" />
                <Categories image="/compliant.png" opening="3" title="Compliance" />
                <Categories image="/travel.png" opening="2" title="Travel" />
                <Categories image="/architect.png" opening="2" title="Architecture" />
                <button className="rounded-full my-4 bg-primary text-lg text-white font-bold px-8 py-3 outline-none border-none hoverBtn">
                Latest Job
              </button>
              </div>
            </div>
            <div className="xl:w-2/4 flex flex-col gap-y-3 xl:mt-0 mt-4">
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
                {/*  <Recommended
            time="2024"
            type="Remote"
            title="UX Designer"
            amount="2000-3000"
            country="Canada"
            job="UI/UX Designer"
            bgColor="#f5eef8"
            color="#9b59b6"
        />
     <Recommended
   time="2024" 
   type= "Freelance" 
   title= "Graphic Designer" 
   amount= "1500-2000" 
   country= "Spain" 
   job= "Visual Artist" 
   bgColor= "#f2dede" 
   color= "#d9534f" 
    />*/}
<Recommended time= "2024" type= "Temporary" title= "HR Manager" amount= "2800-3500" country= "Japan" job= "Human Resources Specialist" bgColor= "#dff0d8" color= "#5cb85c" />

            </div>
          </div>
        </div>
      </div>
    );
}


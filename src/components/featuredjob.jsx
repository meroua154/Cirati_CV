import { HiGlobe, HiPencilSquare } from "react-icons/hi";
import { BiChart } from "react-icons/bi";
import { GiEarthAmerica, GiHamburger } from "react-icons/gi";
import { FaLaptopCode, FaSearchDollar, FaPaintBrush } from "react-icons/fa";
import { RiDatabase2Line } from "react-icons/ri";
import { BsFillBrushFill } from "react-icons/bs";

export default function Featured_jobs() {
  const Offers = ({
    icon1 = <BiChart size={40} />,
    title = "Title",
    position = "Position",
    location = "Location",
    type = "Type",
    company = "Company",
    icon2 = <HiPencilSquare size={30} />,
    bg1 = "#f4fefe",
    color = "#1ae4e8",
    bg2 = "black",
  }) => {
    return (
      <div className="bg-white rounded-[10px] px-6 py-8 flex flex-col justify-center gap-12 shadow transition-shadow hover:bg-light">
        <div className="flex items-center gap-x-4">
          <button
            className="p-2 rounded-full border-none outline-none text-4xl"
            style={{ backgroundColor: bg1, color: color }}
          >
            {icon1}
          </button>
          <div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-lg">20 Opening</p>
          </div>
        </div>
        <div>
          <p className="text-3xl font-semibold">{position}</p>
          <span className="flex flex-wrap gap-x-4 items-center justify-between text-xl pt-4">
            <p className="flex items-center gap-x-2">
              <HiGlobe className="text-2xl" /> {location}
            </p>
            <p className="text-[#93979d]">{type}</p>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>
            <p className="text-[#93979d] text-lg">June 8, 2022 by</p>
            <p className="text-xl font-medium">{company}</p>
          </span>
          <button className="rounded-[10px] p-2 text-white border-none outline-none" style={{ backgroundColor: bg2 }}>
            {icon2}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#fcfaf6]">
      <div className="container mx-auto px-6 py-24">
        <div className="md:flex items-center justify-between">
          <h2 className="xl:text-5xl lg:text-3xl text-2xl font-semibold">
            Featured Job Offers
          </h2>
          <button className="rounded-full md:my-0 my-4 bg-primary text-lg text-white font-bold px-8 py-3 outline-none border-none hoverBtn">
            All Job Offers
          </button>
        </div>
        <p className="text-2xl mt-4 font-light">
          Know your worth and find the job that qualifies your life
        </p>
        <div className="mt-12 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
          <Offers
            bg1="#f4fefe"
            bg2="black"
            color="#1ae4e8"
            company="Gramware"
            location="San Diego, CA"
            position="Financial Analyst"
            title="Finance"
            type="fulltime"
          />
          <Offers
            bg1="#f9f9f9"
            bg2="#333"
            color="#ff5733"
            company="TechCo"
            icon1={<FaLaptopCode size={40} />}
            location="New York, NY"
            position="Software Engineer"
            title="Tech"
            type="fulltime"
          />
          <Offers
            bg1="#fcfcfc"
            bg2="#222"
            color="#e74c3c"
            company="Globe Corp"
            icon1={<GiEarthAmerica size={40} />}
            icon2={<GiHamburger size={30} />}
            location="Los Angeles, CA"
            position="Real Estate Agent"
            title="Real Estate"
            type="fulltime"
          />
          <Offers
            bg1="#f5f5f5"
            bg2="#555"
            color="#2ecc71"
            company="DataTech"
            icon1={<RiDatabase2Line size={40} />}
            icon2={<FaSearchDollar size={30} />}
            location="Seattle, WA"
            position="Data Analyst"
            title="Data Science"
            type="fulltime"
          />
          <Offers
            bg1="#f0f0f0"
            bg2="#666"
            color="#9b59b6"
            company="DesignWorks"
            icon1={<BsFillBrushFill size={40} />}
            icon2={<FaPaintBrush size={30} />}
            location="Chicago, IL"
            position="Graphic Designer"
            title="Design"
            type="fulltime"
          />
        </div>
      </div>
    </div>
  );
}

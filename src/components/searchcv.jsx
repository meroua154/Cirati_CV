import { HiSearch } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
/* eslint-disable react/no-unescaped-entities */
export default function Hero() {
  return (
    <div className="bg-[#fafbfc] pt-24">
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-6">
        <h1 className="xl:text-7xl lg:text-5xl sm:text-3xl text-2xl xl:leading-normal lg:leading-normal font-bold text-center">
           Trouver votre{" "}
          <span className="bg-primary text-white whitespace-pre">
           emploi de rêve
          </span>{" "}
          à <br />  New Castle
        </h1>
        <p className="text-2xl lg:w-1/2 text-center leading-10 my-8">
        Quand vous recherchez un emploi, il y a quelques actions à entreprendre pour optimiser votre recherche
        </p>
        <div className="flex items-center border-2 border-solid border-primary rounded-full h-16 lg:w-2/5 w-full py-2 relative mt-4">
          <input
            type="text"
            placeholder="Intitulé du poste ou mot-clé"
            className="bg-transparent h-full w-full border-none outline-none absolute px-20 xl:text-2xl text-base"
          />
         <button className="bg-primary rounded-full text-white w-12 h-12 absolute left-2 border-none flex items-center justify-center">
  <HiSearch className="text-2xl" />
</button>

          <button className="flex items-center bg-[#f3f3f4] absolute right-2 rounded-full lg:px-4 px-2 h-[90%] xl:text-xl text-sm font-normal gap-x-2 border-none">
            <IoLocationOutline className="text-black lg:text-2xl" /> n'importe quelle localisation
          </button>
        </div>
      </div>
    </div>
  );
}

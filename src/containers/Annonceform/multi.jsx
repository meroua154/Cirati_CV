import { useState } from "react";
import Select from "react-tailwindcss-select";


const Multi = ({ jobs }) => {
    const [selectedJobs, setSelectedJobs] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setSelectedJobs(value);
    };

    return (
        <div className="bg-gray-200"> {/* Wrap Select component with a div and apply background color */}
            <Select
                label='red'
                value={selectedJobs}
                onChange={handleChange}
                options={jobs}
                isMultiple={true}
                className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none"
                formatGroupLabel={data => (
                    <div className={`py-2 text-xs flex items-center justify-between bg-gray`}>
                        <span className="font-bold">{data.label}</span>
                        <span className="bg-gray-200 h-5 h-5 p-1.5 flex items-center justify-center rounded-full">
                            {data.options.length}
                        </span>
                    </div>
                )}
            />
        </div>
    );
};

export default Multi;

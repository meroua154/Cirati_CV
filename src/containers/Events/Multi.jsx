import React, { useState } from "react";
import Select from "react-tailwindcss-select";

const Multi = ({ options, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = value => {
        setSelectedOptions(value);
        onChange(value);
    };

    return (
        <Select
            value={selectedOptions}
            onChange={handleChange}
            options={options}
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
    );
};

export default Multi;

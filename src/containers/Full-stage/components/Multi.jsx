import React, { useState } from "react";
import Select from "react-tailwindcss-select";

const Multi = ({ sectors, onChange }) => {
    const [selectedSectors, setSelectedSectors] = useState([]);

    const handleChange = value => {
        setSelectedSectors(value);
        onChange(value);
    };

    return (
        <div className="bg-gray-200">
            <Select
                label="Sélectionner les secteurs"
                value={selectedSectors}
                onChange={handleChange}
                options={sectors}
                isMultiple={true}
                className="flex text-sm text-gray-500 border border-gray-100 rounded shadow-sm border-solid border-1 transition-all duration-300 focus:outline-none"
                formatGroupLabel={data => (
                    <div className="py-2 text-xs flex items-center justify-between bg-gray-200">
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

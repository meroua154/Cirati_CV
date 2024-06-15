import { useState } from "react";
import Select from "react-tailwindcss-select";

const Multione = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = option => {
        setSelectedOption(option);
        onChange(option);
    };

    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
            classNames={{
                menu: "absolute top-0 z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
                listItem: ({ isSelected }) => (
                    `block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded ${
                        isSelected
                            ? `text-white bg-blue-500`
                            : `text-gray-500 hover:bg-blue-100 hover:text-blue-500`
                    }`
                )
            }}
        />
    );
};

export default Multione;

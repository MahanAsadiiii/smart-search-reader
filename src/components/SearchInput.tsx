import { useEffect, useState } from "react";
import { dictionary } from "../static/sampletext";


type Props = {
    value: string;
    onChange: (value: string) => void;
};



const SearchInput = ({ value, onChange }: Props) => {
    const [modal, setModal] = useState(false)

    const suggestions = dictionary.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
    );


    useEffect(() => {
        if (value && suggestions.length > 0) {
            setModal(true);
        } else {
            setModal(false);
        }
    }, [value, suggestions]);

    return (
        <div className='relative'>
            <input type="text" placeholder="Search" value={value} onChange={(e) => onChange(e.target.value)} className="bg-white text-black rounded-md p-2 " />
            {modal && (
                <ul className="absolute bg-white text-black border mt-0.5 w-full shadow max-h-32 overflow-y-scroll z-10 left-0">
                    {suggestions.map((sug, i) => (
                        <li
                            key={i}
                            className="px-4 py-1 cursor-pointer hover:bg-gray-100"
                            onClick={() => onChange(sug)}
                        >
                            {sug}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default SearchInput
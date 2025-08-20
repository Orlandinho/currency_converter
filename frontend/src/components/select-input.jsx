import { ChevronDownIcon } from '@heroicons/react/16/solid'
import {useState} from "react";

export default function SelectInput({name, label, items}) {
    const [selected, setSelected] = useState("");

    const handleChange = (e) => {
        setSelected(e.target.value);
    }
    return (
        <>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label ?? 'Title'}
            </label>
            <div className="mt-2 grid grid-cols-1">
                <select
                    id={name}
                    name={name}
                    value={selected}
                    onChange={handleChange}
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6"
                >
                    {items.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
            </div>
        </>
    )
}

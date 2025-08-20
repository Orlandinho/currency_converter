import {useState} from "react";

export default function NumberInput({name, label, initialValue }) {
    const [ onlyNumbers, setOnlyNumbers ] = useState('')

    const handleChange = (e) => {
        let input = e.target.value;

        // Replace commas with dots
        input = input.replace(/,/g, ".");

        // Allow only digits, optional dot, and max one dot
        if (/^[0-9]*\.?[0-9]*$/.test(input) || input === "") {
            setOnlyNumbers(input);
        }
    }
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label ?? 'Title'}
            </label>
            <div className="mt-2">
                <input
                    id={ name }
                    name={ name }
                    type="text"
                    value={ onlyNumbers }
                    defaultValue={ initialValue ?? 1 }
                    onChange={ handleChange }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
        </div>
    )
}

import React from 'react';

interface CustomInputProps {
    label: string,
    inputValue?: string,
    onChange: (input: string) => void,
}

const CustomInput: React.FC<CustomInputProps> = ({ label, inputValue, onChange }) => {
    return (
        <div className='w-full h-[4rem] max-h-[20%] mb-2 relative'>
            <div className='left-0 absolute mb-2 font-bold text-2xl'>{label}:</div>
            <div className='w-full border-b-2 border-black bottom-0 absolute z-10'></div>
            <input value={inputValue} className='outline-none w-full text-xl bottom-0 left-0 absolute' onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
};

export default CustomInput;
import React from 'react';

interface CreateButtonProps {
    handleClick: () => void
}

const CreateButton: React.FC<CreateButtonProps> = ({ handleClick }) => {
    return (
        <div 
            className='absolute z-20 right-0 mr-4 mt-4 w-40 h-10 cursor-pointer flex justify-center items-center border-black border-2 text-center shadow-full text-xl font-bold bg-white'
            onClick={handleClick}    
        >
            Create
        </div>
    );
};

export default CreateButton;
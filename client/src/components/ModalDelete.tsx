import React from 'react';
import useHandleApi from '../hooks/useHandleApi';
import { ISuperhero } from '../models/ISuperhero';
import exclamation_circle from '../public/svgs/exclamation_circle.svg';

interface ModalDeleteProps {
    handleNoClick: () => void,
    superhero: ISuperhero,
}

const ModalDelete: React.FC<ModalDeleteProps> = ({handleNoClick, superhero}) => {
    const { handleDelete } = useHandleApi();
    const handleDeleteButton = () => {
        handleDelete(superhero);
        handleNoClick();
    }

    return (
        <div className='flex flex-col w-full h-[25vh] bg-white'>
            <div className='flex flex-row w-full justify-center mt-2'>
                <img className='border-b-2 ' src={exclamation_circle} />
                <div className='pl-2 text-3xl border-b-2 font-bold'>Are you sure?</div>
            </div>
            <div className='flex flex-row items-center justify-center mt-auto text-2xl mb-2'>
                <div className='m-auto cursor-pointer w-[35%] hover:bg-red-100 rounded text-center' onClick={handleDeleteButton}>Yes, delete</div>
                <div className='m-auto cursor-pointer w-[35%] hover:bg-gray-100 rounded text-center' onClick={handleNoClick}>No</div>
            </div>
        </div>
    );
};

export default ModalDelete;
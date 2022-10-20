import React from 'react';
import useHandleApi from '../hooks/useHandleApi';
import { ISuperhero } from '../models/ISuperhero';
import { superheroAPI } from '../services/SuperheroService';
import trash from '../public/svgs/trash.svg'
import edit from '../public/svgs/edit.svg'
import chevronUpSmall from '../public/svgs/chevronUpSmall.svg'
import chevronDownSmall from '../public/svgs/chevronDownSmall.svg'
import ModalWindow from './ModalWindow';
import ModalDelete from './ModalDelete';
import { Collapse } from 'react-bootstrap';

interface SuperheroCardProps {
    superhero: ISuperhero,
    setDeleteIsOpen: () => void,
    setEditIsOpen: () => void,
    setCurrentSuperhero: (superhero: ISuperhero) => void,
}

const SuperheroCard: React.FC<SuperheroCardProps> = ({
    superhero,
    setDeleteIsOpen,
    setEditIsOpen,
    setCurrentSuperhero,
}) => {
    const [collapseOpen, setCollapseOpen] = React.useState(false);

    const handleDelete = () => {
        setDeleteIsOpen();
        setCurrentSuperhero(superhero);
    }

    const handleEdit = () => {
        setEditIsOpen();
        setCurrentSuperhero(superhero);
    }

    return (
        <div className='flex flex-col relative h-1/10 w-full lg:w-1/2 bg-gray-100 drop-shadow-2xl p-12 lg:my-12 my-6 hover:-translate-y-1 hover:scale-[102%] duration-300 transition ease-in-out'>
            <div className='text-5xl font-bold mb-1'>{superhero.nickname}</div>
            <img src={superhero.Images[0]} />
            <div className='flex flex-row cursor-pointer text-3xl mt-2' onClick={() => setCollapseOpen(!collapseOpen)}>
                <img src={collapseOpen ? chevronDownSmall : chevronUpSmall} className='w-8'/>
                <div>More</div>
            </div>
            <Collapse in={collapseOpen}>
                <div>
                    {superhero.Images.slice(1, superhero.Images.length - 1).map((image) => {
                        return <img src={image}/>
                    })}
                    <div className='text-3xl font-bold'>Real name: {superhero.real_name}</div>
                    <div className='text-2xl font-bold italic'>"{superhero.catch_phrase}"</div>
                    <div className='text-3xl font-bold'>Superpowers:</div>
                    <div className='text-2xl'>{superhero.superpowers}</div>
                    <div className='text-3xl font-bold'>Origin:</div>
                    <div className='text-2xl mb-2'>{superhero.origin_description}</div>
                </div>
            </Collapse>
            <div className='absolute right-2 bottom-2 flex flex-row'>
                <img src={trash} className="cursor-pointer w-12 hover:cursor-pointer" onClick={handleDelete}/>
                <img src={edit} className="cursor-pointer w-12 hover:cursor-pointer" onClick={handleEdit}/>
            </div>
        </div>
    )
};

export default SuperheroCard;
import React from 'react';
import { Modal } from 'react-bootstrap';
import { defaultSuperhero } from '../consts/consts';
import useHandleApi from '../hooks/useHandleApi';
import { ISuperhero } from '../models/ISuperhero';
import { superheroAPI } from '../services/SuperheroService';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import ModalWindow from './ModalWindow';
import SuperheroCard from './SuperheroCard';

const SuperheroList = () => {
    const {data: superheroes, error, isLoading} = superheroAPI.useGetSuperheroesQuery('');
    const [updateIsSuccessful, setUpdateIsSuccessful] = React.useState(false);

    const [deleteIsOpen, setDeleteIsOpen] = React.useState(false);
    const [editIsOpen, setEditIsOpen] = React.useState(false);
    const [currentSuperhero, setCurrentSuperhero] = React.useState<ISuperhero>(defaultSuperhero);

    React.useEffect(() => {
        console.log(superheroes)
    }, [superheroes])
    return (
        <div className='flex flex-col items-center overflow-y-scroll h-full no-scrollbar'>
            {superheroes && superheroes.map((superhero) => {
                return (
                    <SuperheroCard 
                        superhero={superhero}
                        setCurrentSuperhero={(superhero: ISuperhero) => setCurrentSuperhero(superhero)}
                        setDeleteIsOpen={() => setDeleteIsOpen(true)}
                        setEditIsOpen={() => setEditIsOpen(true)}
                    />
                )
            })}
            <ModalWindow isOpen={deleteIsOpen} size="small" onBackgroundClick={() => setDeleteIsOpen(false)}>
                <ModalDelete superhero={currentSuperhero} handleNoClick={() => setDeleteIsOpen(false)}/>
            </ModalWindow>

            <ModalWindow isOpen={editIsOpen} size="large" onBackgroundClick={() => setEditIsOpen(false)}>
                <ModalEdit superhero={currentSuperhero} onEdited={() => {
                        setEditIsOpen(false);
                        setUpdateIsSuccessful(true);
                    }}/>
            </ModalWindow>
            
            <Modal show={updateIsSuccessful} onHide={() => setUpdateIsSuccessful(false)}>
                <Modal.Body className='text-center'>
                    Superhero was updated successfully
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SuperheroList;
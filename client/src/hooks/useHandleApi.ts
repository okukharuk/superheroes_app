import React from 'react';
import { ISuperhero } from '../models/ISuperhero';
import { superheroAPI } from '../services/SuperheroService';

const useHandleApi = () => {
    const [createSuperhero, {}] = superheroAPI.useCreateSuperheroMutation();
    const [updateSuperhero, {}] = superheroAPI.useUpdateSuperheroMutation();
    const [deleteSuperhero, {}] = superheroAPI.useDeleteSuperheroMutation();
    const handleCreate = async(superhero: ISuperhero) => {
        await createSuperhero(superhero)
    }
    const handleDelete = (superhero: ISuperhero) => {
        deleteSuperhero(superhero)
    }
    const handleUpdate = (superhero: ISuperhero) => {
        updateSuperhero(superhero)
    }
    return {handleCreate, handleDelete, handleUpdate}
};

export default useHandleApi;
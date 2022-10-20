import React from 'react';
import CustomInput from './CustomInput';
import useHandleApi from '../hooks/useHandleApi';
import ImageInput from './ImageInput';
import { ISuperhero } from '../models/ISuperhero';
import exclamation_circle from '../public/svgs/exclamation_circle.svg';

interface ModalEditProps {
    onEdited: () => void,
    superhero: ISuperhero,
}

const ModalEdit: React.FC<ModalEditProps> = ({onEdited, superhero}) => {
    const [nickname, setNickname] = React.useState(superhero.nickname);
    const [realName, setRealName] = React.useState(superhero.real_name);
    const [originDescription, setOriginDescription] = React.useState(superhero.origin_description);
    const [superpowers, setSuperpowers] = React.useState(superhero.superpowers);
    const [catchPhrase, setCatchPhrase] = React.useState(superhero.catch_phrase);
    const [uploadedImages, setUploadedImages] = React.useState<string[]>(superhero.Images);
    const [isValid, setIsValid] = React.useState(true);
    const { handleUpdate } = useHandleApi();

    const handleEditButton = () => {
        const updatedSuperhero: ISuperhero = {
            nickname: nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers: superpowers,
            catch_phrase: catchPhrase,
            Images: uploadedImages,
        }
        setIsValid(true);
        const isWrong = (Object.keys(updatedSuperhero) as (keyof typeof updatedSuperhero)[]).some((key) => {return updatedSuperhero[key]?.length == 0});
        setIsValid(!isWrong);
        setTimeout(() => setIsValid(true), 2000);
        if(!isWrong) {
            onEdited();
            handleUpdate(updatedSuperhero);
        }
    }
    return (
        <div className='flex flex-col items-center h-auto min-w-[75vw] min-h-[92vh] max-w-[100vw] bg-white p-8 rounded'>
            <div className='text-3xl mb-2 max-h-[10%]'>Update Superhero</div>
            <div className='flex flex-col min-h-fit w-full'>
                <CustomInput inputValue={nickname} label='Nickname' onChange={(input) => setNickname(input)}/>
                <CustomInput inputValue={realName} label='Real Name' onChange={(input) => setRealName(input)}/>
                <CustomInput inputValue={originDescription} label='Origin Description' onChange={(input) => setOriginDescription(input)}/>
                <CustomInput inputValue={superpowers} label='Superpowers' onChange={(input) => setSuperpowers(input)}/>
                <CustomInput inputValue={catchPhrase} label='Catch Phrase' onChange={(input) => setCatchPhrase(input)}/>
            </div>
            <ImageInput images={uploadedImages} setImages={(images) => setUploadedImages(images)}/>
            {!isValid
            ? 
            <div className='flex flex-row'>
                <img src={exclamation_circle}/>
                <div className='text-red-600 text-xl'>Input is incorrect</div>
            </div>
            : null}
            <div className='w-1/4 max-h-[10%] text-3xl cursor-pointer mt-auto text-center' onClick={handleEditButton}>Update!</div>
        </div>
    );
};

export default ModalEdit;
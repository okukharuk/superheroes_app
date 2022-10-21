import React from 'react';
import CustomInput from './CustomInput';
import useHandleApi from '../hooks/useHandleApi';
import ImageInput from './ImageInput';
import { ISuperhero } from '../models/ISuperhero';
import exclamation_circle from '../public/svgs/exclamation_circle.svg';

interface ModalCreateProps {
    onCreated: () => void,
}

const ModalCreate: React.FC<ModalCreateProps> = ({onCreated}) => {
    const [nickname, setNickname] = React.useState('');
    const [realName, setRealName] = React.useState('');
    const [originDescription, setOriginDescription] = React.useState('');
    const [superpowers, setSuperpowers] = React.useState('');
    const [catchPhrase, setCatchPhrase] = React.useState('');
    const [uploadedImages, setUploadedImages] = React.useState<string[]>([]);
    const [isValid, setIsValid] = React.useState(true);
    const { handleCreate } = useHandleApi();

    const handleCreateButton = () => {
        const newSuperhero = {
            nickname: nickname,
            real_name: realName,
            origin_description: originDescription,
            superpowers: superpowers,
            catch_phrase: catchPhrase,
            Images: uploadedImages,
        }
        setIsValid(true);
        const isWrong = (Object.keys(newSuperhero) as (keyof typeof newSuperhero)[]).some((key) => {return newSuperhero[key]?.length == 0});
        setIsValid(!isWrong);
        setTimeout(() => setIsValid(true), 2000);
        if(!isWrong) {
            onCreated();
            handleCreate(newSuperhero);
        }
    }
    return (
        <div className='flex flex-col items-center h-auto min-w-[75vw] min-h-[92vh] max-w-[100vw] bg-white p-8 rounded'>
            <div className='text-3xl mb-2 max-h-[10%]'>Create New Superhero</div>
            <div className='flex flex-col min-h-fit w-full'>
                <CustomInput label='Nickname' onChange={(input) => setNickname(input)}/>
                <CustomInput label='Real Name' onChange={(input) => setRealName(input)}/>
                <CustomInput label='Origin Description' onChange={(input) => setOriginDescription(input)}/>
                <CustomInput label='Superpowers' onChange={(input) => setSuperpowers(input)}/>
                <CustomInput label='Catch Phrase' onChange={(input) => setCatchPhrase(input)}/>
            </div>
            <ImageInput images={uploadedImages} setImages={(images) => setUploadedImages(images)}/>
            {!isValid
            ? 
            <div className='flex flex-row'>
                <img src={exclamation_circle}/>
                <div className='text-red-600 text-xl'>Input is incorrect</div>
            </div>
            : null}
            <div className='w-1/4 max-h-[10%] text-3xl cursor-pointer mt-auto text-center' onClick={handleCreateButton}>Create!</div>
        </div>
    );
};

export default ModalCreate;
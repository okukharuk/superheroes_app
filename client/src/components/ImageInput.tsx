import React from 'react';

interface ImageInputProps {
    images: string[],
    setImages: (images: string[]) => void,
}

const ImageInput: React.FC<ImageInputProps> = ({images, setImages}) => {
    const [imageInputValue, setImageInputValue] = React.useState('');

    const handlePaste = (url: string) => {
        setImageInputValue('');
        if (images.length >= 5) return
        setImages([...images, url])
    }

    const handleChangeMain = (mainIndex: number) => {
        const mainArr = JSON.parse(JSON.stringify(images));
        [mainArr[0], mainArr[mainIndex]] = [mainArr[mainIndex], mainArr[0]];
        setImages(mainArr);
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='text-xl font-bold mb-2'>Paste your Superhero Images URL: (5 - max)</div>
            <input 
                onPaste={(e) => handlePaste(e.clipboardData.getData('text'))} 
                type='text' 
                className='border-b-2 border-black outline-none mb-2 w-[25%]' 
                onChange={(e) => setImageInputValue(e.target.value)}
                value={imageInputValue}
            />
            <div className='flex flex-row'>
                {images.map((image, i) => {
                    return (
                        <div className='flex flex-col max-w-14 md:max-w-32 lg:max-w-48 mr-2 overflow-visible'>
                            <img 
                                src={image} 
                                className={'z-10 hover:z-20 hover:-translate-y-[100%] hover:scale-[300%] duration-300 transition ease-in-out max-w-full rounded cursor-pointer max-h-[4rem] object-contain ' 
                                    + (i == 0 ? 'outline outline-2 hover:outline-1 outline-black outline-offset-2' : '')}
                                onClick={() => (i !== 0) && handleChangeMain(i)}
                                />
                            <div className='cursor-pointer text-center' onClick={() => setImages(images.filter((image, index) => index !== i))}>Remove</div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ImageInput;
import React from 'react';
import { Modal } from 'react-bootstrap';
import CreateButton from '../components/CreateButton';
import ModalCreate from '../components/ModalCreate';
import ModalWindow from '../components/ModalWindow';
import SuperheroList from '../components/SuperheroList';

const HomePage = () => {
    const [createIsOpen, setCreateIsOpen] = React.useState(false);
    const [createIsSuccessful, setCreateIsSuccessful] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setCreateIsSuccessful(false);
        }, 2500)
    }, [createIsSuccessful])

    return (
        <div className='font-marvel w-screen h-screen'>
            <CreateButton handleClick={() => setCreateIsOpen(true)}/>
            <SuperheroList />
            <ModalWindow isOpen={createIsOpen} size="large" onBackgroundClick={() => setCreateIsOpen(false)}>
                <ModalCreate onCreated={() => {
                        setCreateIsOpen(false);
                        setCreateIsSuccessful(true);
                    }}/>
            </ModalWindow> 
            <Modal show={createIsSuccessful} onHide={() => setCreateIsSuccessful(false)}>
                <Modal.Body className='text-center'>
                    New superhero was created successfully
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HomePage;
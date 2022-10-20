import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalWindowProps {
    onBackgroundClick: () => void,
    isOpen: boolean,
    size: string,
    children: React.ReactNode,
}

const ModalWindow: React.FC<ModalWindowProps> = ({
    onBackgroundClick,
    isOpen,
    size,
    children,
}) => {
    return (
        <Modal show={isOpen} onHide={onBackgroundClick} dialogClassName={'font-marvel flex items-center justify-center ' + (size == 'large' ? 'min-w-[80vw]' : '')} >
            {children}
        </Modal>
    );
};

export default ModalWindow;
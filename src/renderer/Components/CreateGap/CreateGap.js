import Button from '../Button/Button';
import { PlusLg, Hash } from 'react-bootstrap-icons';
import { useState } from 'react';
import './creategap.css';

export default function CreateGap({createTask, createHeading}) {

    const [used, setUsed] = useState(false);

    return (
        <div className={`create-gap row justify-content-center align-items-center${used? ' used' : ''}`}>
            <div className='create-gap-buttons d-flex justify-content-center'>
                <Button onClick={() => {
                    createTask();
                    setUsed(true);
                    setTimeout(() => setUsed(false), 500);
                }}><PlusLg /></Button>
                <Button onClick={() => {
                    createHeading();
                    setUsed(true);
                    setTimeout(() => setUsed(false), 500);
                }}><Hash size={20} /></Button>
            </div>
        </div>
    )
}
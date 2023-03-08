import Button from '../Button/Button';
import { PlusLg, Hash } from 'react-bootstrap-icons';
import './creategap.css';

export default function CreateGap({createTask, createHeading}) {

    return (
        <div className='create-gap row justify-content-center align-items-center'>
            <div className='create-gap-buttons d-flex justify-content-center'>
                <Button onClick={createTask}><PlusLg /></Button>
                <Button onClick={createHeading}><Hash size={20} /></Button>
            </div>
        </div>
    )
}
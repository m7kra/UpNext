import Button from '../Button/Button';
import ContentEditable from 'react-contenteditable';
import { CheckLg, XLg, Pencil } from 'react-bootstrap-icons';
import { useState } from 'react';

import './heading.css';

export default function Heading({heading, modify, remove}) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(heading.content);

    if (!editing) return (
        <div className='heading row'>
            <div className='col-10 d-flex align-items-center'>
                <ContentEditable tagName='h2' html={value} disabled={true} />
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => setEditing(true)}><Pencil /></Button>
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    );
    
    return (
        <div className='heading heading-edit row'>
            <div className='col-10 d-flex align-items-center'>
                <ContentEditable tagName='h2' html={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => {
                    modify({...heading, content: value});
                    setEditing(false);
                }}><CheckLg /></Button>
            </div>
            <div className='heading-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}
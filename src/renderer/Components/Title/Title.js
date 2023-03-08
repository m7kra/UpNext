import Button from '../Button/Button';
import ContentEditable from 'react-contenteditable';
import { CheckLg, XLg, Pencil } from 'react-bootstrap-icons';
import { useState } from 'react';

import './title.css';

export default function Title({title, modify, remove}) {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(title.content);

    if (!editing) return (
        <div className='title row'>
            <div className='col-10 d-flex align-items-center'>
                <ContentEditable tagName='h1' html={value} disabled={true} />
            </div>
            <div className='title-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => setEditing(true)}><Pencil /></Button>
            </div>
            <div className='title-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    );
    
    return (
        <div className='title title-edit row'>
            <div className='col-10 d-flex align-items-center'>
                <ContentEditable tagName='h1' html={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className='title-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => {
                    modify({...title, content: value});
                    setEditing(false);
                }}><CheckLg /></Button>
            </div>
            <div className='title-utils col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}
import Button from '../Button/Button';
import { Circle, CircleFill, XLg, Pencil, CheckLg, Calendar } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import ContentEditable from 'react-contenteditable';
import { useState, useMemo } from 'react';

import './task.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function Task({task, modify, remove}) {
    const [editing, setEditing] = useState();
    const [value, setValue] = useState();
    const [complete, setComplete] = useState();
    const [deadline, setDeadline] = useState();

    useMemo(() => {
        setEditing(false);
        setValue(task.content);
        setComplete(task.complete);
        const tmp = task.deadline? task.deadline.split('/') : null;
        setDeadline(tmp? new Date(tmp[2], tmp[1] - 1, tmp[0]) : null);
    }, [task]);

    const deadlineString = deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null;

    if (!editing) return (
        <div className={'task row' + (task.complete? ' complete' : '')}>
                <div className='col-1 d-flex align-items-center justify-content-center'>
                    <Button onClick={() => {
                        modify({...task, complete: !complete});
                        setComplete(!complete);
                    }}>
                        {complete? <CircleFill /> : <Circle />}
                    </Button>
                </div>
                <div className='task-body col-9'>
                    { deadline? 
                        <div className='task-deadline'>
                            <p className='task-deadline'>{deadlineString}</p>
                        </div> : null
                    }
                    
                    <ContentEditable tagName='p' html={value} disabled={true} />
                </div>
                <div className='col-1 d-flex align-items-center justify-content-center'>
                    <Button onClick={() => setEditing(true)}><Pencil /></Button>
                </div>
                <div className='d-flex col-1 align-items-center justify-content-center'>
                    <Button onClick={() => remove()}><XLg /></Button>
                </div>
        </div>
    );
    
    return (
        <div className={'task row' + (task.complete? ' complete' : '')}>
            <div className='col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => {
                    modify({...task, complete: !complete});
                    setComplete(!complete);
                }}>
                    {complete? <CircleFill /> : <Circle />}
                </Button>
            </div>
            <div className='task-body col-9'>
                <div className='d-flex task-deadline'>
                    { deadline? <p className='me-2'>{deadlineString}</p> : null }
                    <DatePicker selected={deadline} onChange={setDeadline} customInput={<Calendar />} />
                </div>
                <ContentEditable tagName='p' html={value} onChange={e => setValue(e.target.value)} />
            </div>
            <div className='col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={() => {
                    setEditing(false)
                    console.log(value);
                    modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null})
                }}><CheckLg /></Button>
            </div>
            <div className='d-flex col-1 align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}
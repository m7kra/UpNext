import Button from '../Button/Button';
import { Circle, CircleFill, XLg, X, Pencil, CheckLg, Calendar } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';
import ContentEditable from 'react-contenteditable';
import { useState, useMemo } from 'react';
import Select from 'react-select';

import './task.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function Task({task, modify, remove}) {
    const [value, setValue] = useState();
    const [complete, setComplete] = useState();
    const [deadline, setDeadline] = useState();
    const [priority, setPriority] = useState();

    useMemo(() => {
        setValue(task.content);
        setComplete(task.complete);
        const tmp = task.deadline? task.deadline.split('/') : null;
        setDeadline(tmp? new Date(tmp[2], tmp[1] - 1, tmp[0]) : null);
        setPriority(task.priority);
    }, [task]);

    function toggleComplete() {
        setComplete(!complete);
        modify({...task, complete: !complete});
    }

    function saveDeadline(deadline) {
        setDeadline(deadline);
        modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null});
    }

    function savePriority(priority) {
        setPriority(priority);
        modify({...task, priority: priority});
    }

    function save() {
        modify({...task, content: value, complete: complete, deadline: deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null});
    }

    const deadlineString = deadline? deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear() : null;
    const priorityOption = priorityOptions.find(option => option.value === priority);

    return (
        <div className={'task row ' + (task.complete? 'complete ' : '') + task.priority} onBlur={save}>
            <div className='col-1 d-flex align-items-center justify-content-center'>
                <Button onClick={toggleComplete}>
                    {complete? <CircleFill /> : <Circle />}
                </Button>
            </div>
            <div className='task-body col-8'>
                <div className={`d-flex task-deadline${deadline? ' exists' : ''}`}>
                    <DatePicker selected={deadline} onChange={saveDeadline} customInput={
                        deadline? <p className='me-2'>{deadlineString}</p> : <Calendar />
                    } />
                    {deadline? <Button onClick={() => saveDeadline(null)} type='nodecor'><X /></Button> : null}
                </div>
                <ContentEditable tagName='p' html={value} onChange={e => setValue(e.target.value)} spellCheck={false} />
            </div>
            <div className='task-priority col-2 d-flex align-items-center justify-content-center'>
                <Select
                    value={priorityOption}
                    onChange={(e) => savePriority(e.value)}
                    options={priorityOptions}
                    styles={selectStyles}
                    theme={selectTheme}
                    isSearchable={false}
                />
            </div>
            <div className='d-flex col-1 align-items-center justify-content-center'>
                <Button onClick={() => remove()}><XLg /></Button>
            </div>
        </div>
    )
}

const priorityOptions = [
    {value: 'low', label: 'Low'},
    {value: 'medium', label: 'Medium'},
    {value: 'high', label: 'High'}
];

const selectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--color)' : 'var(--color-05)',
    })
};

const selectTheme = theme => ({
    ...theme,
    borderRadius: 'var(--border-radius)',
    colors: {
        ...theme.colors,
        neutral0: 'var(--bg-color)',
        neutral5: 'var(--color-005)',
        neutral10: 'var(--color-01)',
        neutral20: 'var(--color-02)',
        neutral30: 'var(--color-03)',
        neutral40: 'var(--color-04)',
        neutral50: 'var(--color-05)',
        neutral60: 'var(--color-07)',
        neutral70: 'var(--color-08)',
        neutral80: 'var(--color-09)',
        neutral90: 'var(--color)',
        primary: 'var(--color-02)',
        primary25: 'var(--color-005)',
        primary50: 'var(--color-01)',
    }
});
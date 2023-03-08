import Parser from 'renderer/Parser/Parser';
import Events from 'renderer/Events/Events';
import { useState, useMemo } from 'react';
import Title from '../Title/Title';
import Heading from '../Heading/Heading';
import Task from '../Task/Task';
import CreateGap from '../CreateGap/CreateGap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './main.css';

/**
 * Displays a generic banner.
 */
export default function Main() {

    const [tokens, setTokens] = useState([]);
    useMemo(() => {
        Events.fire('openFile', (content) => setTokens(Parser.parse(content)))
    }, []);
    const [dragging, setDragging] = useState(false);

    function createTask(index) {
        const newTokens = [...tokens];
        newTokens.splice(index, 0, { type: 'task', content: 'New Task', complete: false});
        setTokens(newTokens);
        save(newTokens);
    }

    function createHeading(index) {
        const newTokens = [...tokens];
        newTokens.splice(index, 0, { type: 'heading', content: 'New Heading'});
        setTokens(newTokens);
        save(newTokens);
    }

    function modify(index, token) {
        console.log(token);
        const newTokens = [...tokens];
        newTokens[index] = token;
        setTokens(newTokens);
        save(newTokens);
    }

    function remove(index) {
        const newTokens = [...tokens];
        newTokens.splice(index, 1);
        setTokens(newTokens);
        save(newTokens);
    }

    function reorder(from, to) {
        const newTokens = [...tokens];
        const [removed] = newTokens.splice(from, 1);
        newTokens.splice(to, 0, removed);
        setTokens(newTokens);
        save(newTokens);
    }

    function save(tokens) {
        console.log(tokens);
        Events.fire('saveFile', Parser.stringify(tokens));
    }

    const taskList = [];
    for (const token of tokens) {
        const index = taskList.length / 2;
        let element;
        if (token.type == 'title') element = <Title title={token} modify={(token) => modify(index, token)} key={taskList.length} />;
        if (token.type == 'heading') element = <Heading heading={token} modify={(token) => modify(index, token)} remove={() => remove(index)} key={taskList.length} />;
        if (token.type == 'task') element = <Task task={token} modify={(token) => modify(index, token)} remove={() => remove(index)} key={taskList.length} />;
        taskList.push(<Draggable draggableId={taskList.length.toString()} index={index} key={taskList.length} isDragDisabled={token.type == 'title'} >{provided => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                {element}
            </div>
        )}</Draggable>);
        taskList.push(<CreateGap createTask={() => createTask(index + 1)} createHeading={() => createHeading(index + 1)} key={taskList.length} />);
    }

    return (
        <div id='main'>
            <div className='spacer-100' />
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className={`col-10 task-list${dragging? ' dragging' : ''}`}>
                        <DragDropContext onDragStart={() => setDragging(true)} onDragEnd={result => {
                            if (!result.destination) return;
                            reorder(result.source.index, result.destination.index);
                            setDragging(false);
                        }}>
                            <Droppable droppableId='main'>
                                {provided => (
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {taskList}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
            <div className='spacer-500' />
        </div>
    );
}
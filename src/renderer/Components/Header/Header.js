import Button from '../Button/Button';
import { ArrowLeftShort, GearFill, Square, XLg, Folder, FileArrowUp } from 'react-bootstrap-icons';

import Events from 'renderer/Events/Events';
import logo from '../../../../assets/icon.png';
import './header.css'

/**
 * Displays the app's header bar, with app navigation utilities and window
 * buttons. Specifically, people should be able to access `settings` and open a
 * file if `view == main` and go back to the main view otherwise. The normal
 * three window control buttons must be displayed.
 */
export default function Header({ view }) {

    // Header has a button which is used as a shortcut for a setting change
    async function searchFile() {
        Events.fire('searchFile', path => {
            if (!path) return;
            const newSettings = {...window.settings};
            newSettings.filePath.value = path;
            Events.fire('saveSettings', newSettings);
        });
    }

    let navigationButtons;
    if (view == 'main') {
        navigationButtons = [
            { onClick: () => null, content: <Logo size={52}/> },
            { onClick: () => Events.fire('setView', 'settings'), content: <GearFill />, shortcuts: ['ctrl+s'] },
            { onClick: () => searchFile(), content: <Folder />, shortcuts: ['ctrl+o'] },
            { onClick: () => Events.fire('exportFile'), content: <FileArrowUp />, shortcuts: ['ctrl+e'] },
        ]
    } else {
        navigationButtons = [{ onClick: () => Events.fire('setView', 'main'), content: <ArrowLeftShort size={30} />, shortcuts: ['escape', 'alt+arrowleft'] }]
    }
    navigationButtons = navigationButtons.map((button, index) => {
        return <Button onClick={button.onClick} key={index} shortcuts={button.shortcuts}>{button.content}</Button>
    });
        
    let windowButtons = [
        {onClick: () => Events.fire('windowButton', 'minimize'), content: <Line size={16} />},
        {onClick: () => Events.fire('windowButton', 'maximize'), content: <Square size={14} />},
        {onClick: () => Events.fire('windowButton', 'close'), content: <XLg />},
    ]
    windowButtons = windowButtons.map((button, index) => {
        return <Button onClick={button.onClick} key={index}>{button.content}</Button>
    });

    return (
        <div className='header d-flex hide-if-not-active w-100'>
            <div className='w-50'>
                <div id='control-button-container' style={{'--container-width': `${navigationButtons.length * 60}px`}}>
                    {navigationButtons}
                </div>
            </div>
            <div className='w-50 d-flex flex-column align-items-end'>
                <div className='d-flex'>
                    {windowButtons}
                </div>
            </div>
        </div>
    )
}

// The app's logo
function Logo({size = 32}) {
    return (
        <div style={{width: `${size}px`, aspectRatio: '1/1', backgroundSize: 'cover', backgroundImage: `url(${logo})`}}></div>
    );
}

// Defines a line used for the minimize button
function Line({size = 32}) {
    return (
        <svg width={size} height={size} fill="currentColor" stroke='currentColor' viewBox="0 0 16 16" strokeWidth='1'>
            <line x1="0" y1="16" x2="16" y2="16" />
        </svg>
    )
}
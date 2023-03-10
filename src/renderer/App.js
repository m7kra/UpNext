import Main from './Components/Main/Main';
import Settings from './Components/Settings/Settings';
import Header from './Components/Header/Header';
import { ContextMenu } from './Components/ContextMenu/ContextMenu';
import SplashScreen from './Components/SplashScreen/SplashScreen';
import Tutorial from './Components/Tutorial/Tutorial';
import Logger from './Components/Logger/Logger';

import Controller from './Controller/Controller';
import { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/spacers.scss';
import './App.css';

/**
 * This is the main component. It stores a series of states and renders two
 * other components (`Main` and `Settings`) according to `view`. It also renders
 * a bunch of other components used throughout the app: a `Header`, a
 * `ContextMenu`, a spinner if `loading` and a `Tutorial` if
 * `settings.firstTime`.
 */
export default function App() {

    const [view, setView] = useState('main');

    // Variable that stores current settings
    const [settings, setSettings] = useState({});
    window.settings = settings;

    const [logs, setLogs] = useState([]);
    function addLog(log) {
        setLogs([...logs, log]);
    }
    function removeLog(index) {
        logs.splice(index, 1);
        setLogs([...logs]);
    }

    // Controlls whether a spinner should be shown
    const [loading, setLoading] = useState(false);

    const controller = useMemo(
        () => new Controller(setView, setSettings, setLoading, addLog),
        []
    );
    const loadingDiv = loading? (
        <div id='loading-div' className='center-children'>
            <div className='spinner-grow text-info'/>
        </div>
    ) : null;

    // Splash screen should only be loaded on the first call
    const [splashScreen, setSplashScreen] = useState(true);
    const splashScreenRendered = splashScreen? <SplashScreen setSplashScreen={setSplashScreen} /> : null;

    return (
        <div id='app' className={settings.theme? settings.theme.value : 'dark'}>
            <Header view={view} />
            {view == 'main'?
                <Main /> :
                <Settings settings={settings} displayTutorial={() => setSettings({...settings, firstTime: {...settings.firstTime, value: true}})} />
            }
            <ContextMenu />
            <Logger logs={logs} removeLog={removeLog}/>
            {loadingDiv}
            {settings.firstTime?.value? <Tutorial dismissTutorial={() => setSettings({...settings, firstTime: {...settings.firstTime, value: false}})}/> : null}
            {splashScreenRendered}
        </div>
    );
}
import Events from 'renderer/Events/Events';

export default class Controller {
    constructor(setView, setSettings, setLoading, addLog) {
        this.setView = setView;
        this.setSettings = setSettings;
        this.setLoading = setLoading;
        this.log = addLog;

        // Apply settings
        ipcRenderer.invoke('getSettings').then(settings => {            
            // implementSettings is not called directly to ensure that firstTime
            // is saved as false
            this.saveSettings(settings);
        });

        // `Controller` should set up event listeners for `setView`,
        // `saveSettings`, `resetSettings`, `windowButton`, `resetSettings` and
        // `log`. In addition, `log` should also be listened on `ipcRenderer`.
        Events.on('openFile', (callback) => ipcRenderer.invoke('openFile').then(content => callback(content)));
        Events.on('saveFile', (content) => ipcRenderer.invoke('saveFile', content));
        Events.on('searchFile', (callback) => ipcRenderer.invoke('searchFile').then(file => callback(file)));
        Events.on('setView', this.setView.bind(this));
        Events.on('saveSettings', this.saveSettings.bind(this));
        Events.on('resetSettings', this.resetSettings.bind(this));
        Events.on('windowButton', this.windowButton.bind(this));
        Events.on('log', this.log.bind(this));
        ipcRenderer.on('log', (e, message) => this.log(message));

        // Check for updates
        ipcRenderer.invoke('checkForUpdates').then(update => {
            if (update) this.log({type: 'success', message: 'An update is available!'});
        });
    }

    /**
     * Sets the provided settings and makes the necessary changes to the app.
     */
    saveSettings(settings) {
        this.implementSettings(settings);

        // First time is always saved as false
        ipcRenderer.invoke('setSettings', {...settings, firstTime: false});
    }

    /**
     * Adapts the app to the current `settings`.
     */
    implementSettings(settings) {   
        webFrame.setZoomFactor(parseFloat(settings.zoomFactor.value));

        // Remove custom css if there is any (prevents accumulating multiple css
        // elements if user has changed it various times)
        document.querySelector('#custom-css')?.remove();

        // Add custom css to page 
        const styleElement = document.createElement('style');
        styleElement.innerText = settings.customCSS.value;
        styleElement.id = 'custom-css';
        document.head.appendChild(styleElement);

        this.setSettings(settings);
    }

    /**
     * Restores settings to their original value.
     */
    async resetSettings() {
        await ipcRenderer.invoke('resetSettings');
        const settings = await ipcRenderer.invoke('getSettings');
        this.implementSettings(settings);
    }

    /**
     * Calls the main process' `windowButton` handler 
     */
    windowButton(button) {
        ipcRenderer.invoke('windowButton', button);
    }
}
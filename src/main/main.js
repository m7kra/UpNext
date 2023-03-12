import createWindow from './utils';
import Settings from './Settings/Settings';
import { app, ipcMain, dialog, shell } from 'electron';
import { platform } from 'os';
import versionCheck from 'github-version-checker';
import fs from 'fs';
import path from 'path';

let mainWindow;

const defaultFilePath = path.join(app.getPath('userData'), 'todo.md');

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then( async () => {
    mainWindow = await createWindow();
    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (mainWindow === null) createWindow();
    });
}).catch(console.log);

/**
 * Opens the current todo list file. If none is defined, uses
 * `[userData]/todo.md` as the default file.
 */
async function openFile() {
    const settings = await Settings.get();
    const file = settings.filePath.value;

    if (file && fs.existsSync(file)) return fs.readFileSync(file).toString();
    if (fs.existsSync(defaultFilePath)) return fs.readFileSync(defaultFilePath).toString();
    return '';
}

/**
 * Saves the current todo list file. If none is defined, uses
 * `[userData]/todo.md` as the default file.
 */
async function saveFile(content) {
    const settings = await Settings.get();
    const file = settings.filePath.value;

    if (file) fs.writeFile(file, content, () => {});
    else fs.writeFile(defaultFilePath, content, () => {});
}

/**
 * Opens a file dialog which allow the user to select a markdown file to be used
 * as the todo list.
 */
async function searchFile() {
    let file = dialog.showOpenDialogSync(mainWindow, {
        title: 'Select a file',
        filters: [
            { name: 'Markdown', extensions: ['md', 'markdown'] }
        ],
        properties: ['openFile'],
    });

    if (file) return file[0];
    const settings = await Settings.get();
    path = settings.filePath.value;
    if (path) return path;
    return '';
}

/**
 * Exports the current todo list to a specified location.
 */
async function exportFile() {
    const content = await openFile();
    const file = dialog.showSaveDialogSync(mainWindow, {
        title: 'Export to file',
        filters: [
            { name: 'Markdown', extensions: ['md', 'markdown'] }
        ],
        properties: ['createDirectory'],
    });
    
    if (file) fs.writeFile(file, content, () => null);
}

/**
 * Opens the current todo list file in the default file manager.
 */
function showFile(path) {
    if (path) shell.showItemInFolder(path);
    else shell.showItemInFolder(defaultFilePath);
}

/**
 * Resizes and closes the window according to the button pressed.
 * @param {string} button 
 */
function windowButton(button) {
    switch (button) {
        case 'maximize':
            if (mainWindow.isMaximized()) mainWindow.unmaximize();
            else mainWindow.maximize();
            break;
        case 'minimize':
            mainWindow.minimize();
            break
        case 'close':
            mainWindow.close();
            break;
    }
}


let blockID;

/**
 * Checks for existing updates on Github releases, returning true if there are any.
 */
async function checkForUpdates() {
    try {
        return await versionCheck({
            repo: 'UpNext',
            owner: 'm7kra',
            currentVersion: app.getVersion(),
        });
    } catch {
        // Probably failed due to internet connection
        return false;
    }
}

ipcMain.handle('openFile', () => openFile());
ipcMain.handle('saveFile', (e, content) => saveFile(content));
ipcMain.handle('searchFile', () => searchFile());
ipcMain.handle('exportFile', () => exportFile());
ipcMain.handle('showFile', (e, path) => showFile(path));
ipcMain.handle('windowButton', (e, button) => windowButton(button));
ipcMain.handle('getSettings', Settings.get);
ipcMain.handle('setSettings', (e, settings) => Settings.set(settings));
ipcMain.handle('resetSettings', () => Settings.reset());
ipcMain.handle('checkForUpdates', () => checkForUpdates());

// Handle exceptions
process.on('uncaughtException', (err) => {
    const error = {
        type: 'error',
        title: 'An error occured',
        message: 'Try to restart UpNext and, if the error persists, please contact me at https://github.com/m7kra/UpNext/issues or luiswbarbosa@gmail.com, with the following error: ' + err.message
    };
    dialog.showMessageBoxSync(error);
    app.exit(1);
});
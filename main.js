/**
 * this script that runs in the Main process controls the lifecycle of the application, displays the graphical iser interface and it's elements, performs native operating system interactions, and creates Renderer processes within web pages. An Electron application can have only one Main process.
 * 
 */
// Import the app and BrowserWindow modulespof the electron package to be able to manage your application's lifecycle events, as well as create and control 
//browser windows
 const { app, BrowserWindow, Menu, ipcMain } = require('electron');
 const url = require("url");
 const path = require("path");
// define a a function that creates a new browser window with node integration enables, loads index.html file into this window
let mainWindow;
let addWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('closed', () => {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});


 // new listener that tries to quit the applcaition when it no longer has any open windows. This listener is a no-op on macOS due to the operating system's window management behavior
 app.on('window-all-closed', () => {
     if(process.platform !== 'darwin') {
         app.quit();
     }
 });

// Shine window neeh
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true
        }
    });

    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    // Garbage Collection handle
    addWindow.on('close', () => {
        addWindow = null;
    })
}
// Catch item add
ipcMain.on("img:change", (e, item) => {
    mainWindow.webContents.send("img:change", item);
    addWindow.close();
});

 // Create menu template
 const mainMenuTemplate = [
     {
         label: 'File',
         submenu: [
             {
                 label: 'Зураг солих',
                 click() {
                     createAddWindow();
                 }
             },
             {
                 label: 'Тохиргоо хийх'
             },
             {
                 label: 'Гарах',
                 accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                 click() {
                     app.quit();
                 }
             }
         ]
     }
 ];


 // Add developer tools item if not in production
 if(process.env.NODE_ENV !== 'production') {
     mainMenuTemplate.push({
         label: 'Хөгжүүлэгчийн багажнууд',
         submenu: [
             {
                 label: 'Toggle DevTools',
                 accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                 click(item, focusedWindow) {
                     focusedWindow.toggleDevTools();
                 }
             },
             {
                 role: 'reload'
             }
         ]
     })
 }
import { app, BrowserWindow } from "electron";
import path from "path";
import DatabaseManager from './db_functions'; 
import { error } from "console";
import { eventNames } from "process";

const dbManager = new DatabaseManager();


app.on("ready",()=>{

    let preload = path.join(__dirname, '/preload/preload.js');

    console.log(preload)
    let Window = new BrowserWindow({
        width: 1600,
        height: 900,
        center: true,
        resizable: true,
        movable : true,
        minimizable : true,
        maximizable : true,
        closable : true,
        title: "Application",
        webPreferences: {
            preload: preload
        }

    });

    Window.loadURL("http://localhost:7473/index.html");
    Window.webContents.openDevTools();

    
    // Both of the basic opertions works properly
    // runQuery:

    //  This way it works properly but we can get back a answer like in the case of getData because it prints directly on the consolo
    //  so the best way would be to handle in the same way with promises

    //dbManager.runQuery("INSERT INTO NewTable (name, age) VALUES (?, ?);", ["Ven", null]);

    // getData:
    // In the case of getting data it needs to be handled a bit different since we're using promise, we need to handle
    // both cases with .then (get the data stored in rows) and .catch (catch the error in case it exists)
    /*
    dbManager.getData("SELECT * FROM NewTable WHERE name = ?", ["Lia"])
    .then(rows => {
        console.log("Resultados:", rows); 
    })
    .catch(err => {
        console.error("Error al obtener los datos:", err);
    });
    */

    Window.on("ready-to-show", ()=>{

    })



    // Functions that will be sent through the IPC


    Window.webContents.ipc.on("start",()=>{
        Window.webContents.send("DBData", "a lot of data");
    })

    // This sets up communication, sWhen this event is triggered from the renderer,
    // it executes the query and sends back a reply with the result.
    // The structure would be (Name_event, ( event, parameters ..))

    Window.webContents.ipc.on("runQuery", (event, query: string, params: any[] = []) => {
        
        //When it's called it execute the query
        dbManager.runQuery(query, params)

        //From here u handle the response, whetever if it's a success or a error
        .then((message) => {
            event.reply("queryResult",{success: true, message});
        })

        .catch(err => {
            event.reply("queryResult", {success : false, error: err.message});
        });
    });

            
    
    Window.webContents.ipc.on("getData",(event, query: string, params: any[] = []) =>{

        dbManager.getData(query, params)

        .then(rows => {
            event.reply("getDataResult",{success : true, rows});
        })

        .catch(err =>{
            event.reply("getDataResult", { success : false, error: err.nessage});
        })

    });


});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") { 
        dbManager.close();
        // app.quit();
    }
});


//Hello World
import {Events} from "../types";
import { contextBridge, ipcRenderer } from "electron";

console.log("Preload succesfully loaded.");

const Listeners:  {
    [Property in keyof Events]?: Events[Property][];
} = {};

function emit<TEventName extends keyof Events>(event : TEventName, ...args : Parameters<Events[TEventName]>){
    //console.log(this, event, ...args);
    //console.log(Listeners, event);
    if (Listeners.hasOwnProperty(event)){
        for (let i = 0; i < Listeners[event].length; i++){
            let func = Listeners[event][i] as Events[TEventName] as any;
            console.log(func);
            func(...args);
        }
    }
}


ipcRenderer.on("DBData", (ev, dbData : string)=>{
    //console.log("sending DBData")
    emit("DBData", dbData);
});

/*
ipcRenderer.on("queryResult", (ev, result : string) => {
    emit("queryResult", result);
});
*/


const preload = {
    on<TEventName extends keyof Events>(event : TEventName, func : Events[TEventName]) : void {
        if (!Listeners.hasOwnProperty(event)){
            Listeners[event] = [];
        }
        Listeners[event].push(func);
    },
    start(){
        //console.log("passing start to window");
        ipcRenderer.send("start");
    },
    runQuery(query:string, params: any[] = []){

        ipcRenderer.send("runQuery",query,params);
        
    }
}

export type Preload = typeof preload;
contextBridge.exposeInMainWorld('preload', preload);


"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
console.log("Preload succesfully loaded.");
var Listeners = {};
function emit(event) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    //console.log(this, event, ...args);
    //console.log(Listeners, event);
    if (Listeners.hasOwnProperty(event)) {
        for (var i = 0; i < Listeners[event].length; i++) {
            var func = Listeners[event][i];
            console.log(func);
            func.apply(void 0, args);
        }
    }
}
electron_1.ipcRenderer.on("DBData", function (ev, dbData) {
    //console.log("sending DBData")
    emit("DBData", dbData);
});
/*
ipcRenderer.on("queryResult", (ev, result : string) => {
    emit("queryResult", result);
});
*/
var preload = {
    on: function (event, func) {
        if (!Listeners.hasOwnProperty(event)) {
            Listeners[event] = [];
        }
        Listeners[event].push(func);
    },
    start: function () {
        //console.log("passing start to window");
        electron_1.ipcRenderer.send("start");
    },
    runQuery: function (query, params) {
        if (params === void 0) { params = []; }
        electron_1.ipcRenderer.send("runQuery", query, params);
    }
};
electron_1.contextBridge.exposeInMainWorld('preload', preload);

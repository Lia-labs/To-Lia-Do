import "./index.scss";

//console.log(window.preload);
window.preload.on("DBData", (data : string)=>{
    console.log("receiving DBData");
    console.log(data);
});

//window.preload.on("runQuery",)

window.preload.start();
window.preload.runQuery("INSERT INTO NewTable (name, age) VALUES (?, ?);", ["Alejandro", 13]);
console.log("It's theorically done");

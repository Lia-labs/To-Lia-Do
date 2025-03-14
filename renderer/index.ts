import "./index.scss";

//console.log(window.preload);
window.preload.on("DBData", (data : string)=>{
    console.log("receiving DBData");
    console.log(data);
});

//window.preload.on("runQuery",)

window.preload.start();
/*let result= await window.preload.runQuery("INSERT INTO NewTable (name, age) VALUES (?, ?);", ["Jane", null]);
console.log(result);*/
let result= await window.preload.getData("SELECT * FROM NewTable WHERE name = ?", ["Jane"]);
console.log(result);
console.log("It's theorically done");

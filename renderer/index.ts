import "./index.scss";

const table = document.getElementById("table");

//console.log(window.preload);
window.preload.on("DBData", (data : string)=>{
    console.log("receiving DBData");
    console.log(data);
});

//window.preload.on("runQuery",)

window.preload.start();

/*let result= await window.preload.runQuery("INSERT INTO NewTable (name, age) VALUES (?, ?);", ["Jane", null]);
console.log(result);*/

let consult= await window.preload.getData("SELECT * FROM NewTable");
//console.log(consult);
//console.log(consult["result"][3]["name"]);


Object.entries(consult["result"]).forEach(([user, details]) => {

    let row = "<tr>";

    //console.log(user, details);

    Object.entries(details).forEach(([key, value]) => {
      row += `<td> ${value} </td>`;
      //console.log(`<td> ${value} </td>`);
    });

    row += "</tr>";

    table.innerHTML += row;
  });


console.log("It's theorically done");

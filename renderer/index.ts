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








let base_consult= await window.preload.getData("SELECT * FROM Tasks");
//console.log(consult);
//console.log(consult["result"][3]["name"]);



// Create a line on the table for each item of the array result
// Accessing the array for each couple of user:data 
// As a example  consult ={ status: complete, results : {0: data1, 1: data2}}
//      Object.entries(consult).forEach(([user, details]) => status:complete; results : data
//     





Object.entries(base_consult["result"]).forEach(([user, details]) => {

    let row = "<tr><td><button> </button></td>";

    //console.log(user, details);

    let tasknamedata;
    let typedata;
    let lim_timedata;
    let statusdata;

    Object.entries(details).forEach(([key, value]) => {

    

    if (key === "TaskName"){
       tasknamedata = `<td> ${value} </td>`;
    }
    if (key === "Type"){
      typedata = `<td> ${value} </td>`;
    }
    if (key === "lim_time"){
      lim_timedata = `<td> ${value} </td>`;
    }
    if (key === "Status"){
      statusdata = `<td> ${value} </td>`;
    }

      //console.log(`<td> ${key} ${value} </td>`);

    });

    row += tasknamedata; row += typedata; row +=lim_timedata; row += statusdata;
    row += "</tr>";

    table.innerHTML += row;
  });


console.log("It's theorically done");


const date = new Date().toJSON();
console.log(date);
import sqlite3 from 'sqlite3';
import path from "path";
import { app } from "electron";

export default class DatabaseManager {

    //Create a instance where to connect to the db ??
    //It's private so it can only accessed from the own class
    private db: sqlite3.Database;

    
    //Constructor is executed automatically when the class is called
    constructor() { 
        

        //By default it was creating the db on the dist folder

        const dbname = "test.db";
        const dbPath = path.join(process.cwd(), "main", dbname);
        //console.log(dbPath); 


        //This. allows to use the functions of the class ??
        //err detects if there's been a error while the connection
        this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
            if (err) {
                console.error('Error connecting to the database:', err.message);
            } else {
                console.log('Connected to the database');
            }
        });
    }
    // Public allows to access the function, in other words it's not private or protected. Would be as not writting nothign as a default in Python.
    // Allows to do sql consults without return, the point is not getting data
        //Query: The conuslt itself "INSERT INTO users (name, age) VALUES (?, ?);"
        //Param: the values that would go inside of Values . Ex: ["Lia",24]


    //  This way it works properly but we can get back a answer like in the case of getData because it prints directly on the consolo
    //  so the best way would be to handle in the same way with promises

    /*
    public runQuery(query: string, params: any[] = []): void {
        this.db.run(query, params, (err: Error | null) => {

            if (err) {  //In case it gets a error
                console.error('Error executing query:', err.message);

            } else {    //All worked properly
                console.log('Query executed successfully');
            }
        });
    }
    */

    // To use the promise, is defined as the answer of the function thanks to the "Promise<string>"

    public runQuery(query: string, params: any[] = []): Promise<string> {

        return new Promise((resolve, reject) => {

            this.db.run(query, params, (err: Error | null) => {

                if (err) {
                    reject(err); // Send the error

                } else {
                    resolve("Query completed successfully"); // Confirmation that the quary was completed
                }
            });
        });
    }
    



    // Allows to get data from a sql consult, it have the same format than the previous function
    //A Promise in TypeScript is an object that represents an operation that hasn't completed yet but is expected in the future

    public getData(query: string, params: any[] = []): Promise<any[]> {
    
    
        //In case of error reject is executed, otherwhise resolve would be executed
        return new Promise((resolve, reject) => {

            //The response get stored on rows
            this.db.all(query, params, (err: Error | null, rows: any[]) => {


                if (err) {
                    reject(`Error getting data: ${err.message}`);


                } else {
                    resolve(rows);
                }
            });
        });
    }

    public close(): void {
        this.db.close((err: Error | null) => {
            if (err) {
                console.error('Error closing database:', err.message);
            } else {
                console.log('Database closed');
            }
        });
    }
}




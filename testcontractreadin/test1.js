// const fs = require("fs");
// const { abi } = require("./abi");

// // abi = fs.readFileSync("./blockdata.json", "utf8");
// // pabi = JSON.parse(abi);
// while (true) {
//   while (true) {
//     console.log("2nd loop");
//     return;
//   }
// }
// console.log(abi[0]);
const fs = require('fs');

// Data to append
const myVariable = ['item1', 'item2', 'item3'];

// File path and name
const filePath = './my-list.csv';

// Append data to CSV file
fs.appendFileSync(filePath, myVariable.join(',') + '\n');

// // const fs = require("fs");
// // const { abi } = require("./abi");

// // // abi = fs.readFileSync("./blockdata.json", "utf8");
// // // pabi = JSON.parse(abi);
// // while (true) {
// //   while (true) {
// //     console.log("2nd loop");
// //     return;
// //   }
// // }
// // console.log(abi[0]);
// const fs = require('fs');

// // Data to append
// const myVariable = ['item1', 'item2', 'item3'];

// // File path and name
// const filePath = './my-list.csv';

// // Append data to CSV file
// fs.appendFileSync(filePath, myVariable.join(',') + '\n');
// console.log(typeof(process.argv[2]));

const { exec } = require('child_process');



for (i=6;i<873;i++){

n=i*10000
console.log("Childprocess ",i-5," started");
exec(`node test.js ${n} ${n+2}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

}
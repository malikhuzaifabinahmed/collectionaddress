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

// const { exec } = require('child_process');



// for (i=6;i<873;i++){

// n=i*10000
// console.log("Childprocess ",i-5," started");
// exec(`node test.js ${n} ${n+2}`, (err, stdout, stderr) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(stdout);
//   });

// }

const { spawn } = require('child_process');

const batchSize = 50;
const maxProcesses = 873;
let currentProcesses = 4;

async function executeChildProcess() {
    if (currentProcesses >= maxProcesses) {
      console.log("reached max process");
        return;
    }
    n =(currentProcesses+1) *10000;
    console.log(n);
    const childProcess = spawn('node', ['test.js',`${n}`,`${n+9999}`]);
    console.log(`Started child process ${currentProcesses + 1}`);
   
    currentProcesses++;

    if (currentProcesses % batchSize === 0) {
        
        await new Promise((resolve) => {
          childProcess.on('exit', () => {
              console.log(`Finished the batch child process ${currentProcesses + 1}`);
              resolve();
          });
      }); 
     
    }

    await executeChildProcess();
}

(async () => {
    while (currentProcesses < maxProcesses) {
        await executeChildProcess();
    }
})();
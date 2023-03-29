const fs = require ('fs')
setTimeout(() => {
    
}, 10000);

fs.appendFileSync("./tess.txt",process.argv[2])
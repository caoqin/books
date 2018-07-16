/* eslint-disable no-console */
const fs = require('fs');

const readStream = fs.createReadStream("11.jpg");
const writeStream = fs.createWriteStream("file/11_pipe.jpg");
readStream.pipe(writeStream);
readStream.on("error", function () {
    console.log("readStream error")
}).on("end", function () {
    console.log("readStream end")
}).on("close", function () {
    console.log("readStream close")
}).on("readable", () => {
    console.log("data readable")
}).on("data", function (chunck) {
    console.log(Buffer.isBuffer(chunck));
})

writeStream.on("error", function () {
    console.log("writeStream error")
}).on("end", function () {
    console.log("writeStream end")
}).on("close", function () {
    console.log("writeStream close")
}).on("readable", () => {
    console.log("writeStream readable")
})
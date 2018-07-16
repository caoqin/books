/* eslint-disable no-console */
const fs = require('fs');
var source = fs.readFileSync("logo.png");
fs.writeFileSync('file/stream_logo.png', source);

// const readStream = fs.createReadStream("buffer.js");
const readStream = fs.createReadStream("11.jpg");
const writeStream = fs.createWriteStream("file/11_copy.jpg");
// let count = 0;
// readStream.on("data", chrunk => {
//     count++;
//     console.log("data emit");
//     console.log(Buffer.isBuffer(chrunk));
//     // console.log(chrunk.toString("utf8"));
//     readStream.pause();
//     console.log("data pause");
//     setTimeout(function () {
//         console.log("data pause end");
//         readStream.resume();
//     },1000);
// }).on("readable", (r) => {
//     console.log("data readable", r)
// }).on('end', (e) => {
//     console.log('data end', e)
// }).on('close', (e) => {
//     console.log('data close===', count);
//     console.log('data close', e)
// }).on('error', (e) => {
//     console.log('data error', e)
// })

readStream.on("data", function (chunck) {
    console.log("data");
    if (writeStream.write(chunck) === false) {
        readStream.pause();
    }
});
readStream.on("end",function () {
    console.log('data end');
    writeStream.end();
})

writeStream.on("drain",function () {
    console.log("drain");
    readStream.resume();
})
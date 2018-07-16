/* eslint-disable no-console */
let buf = new Buffer(10);
buf.write("hello world");
// console.log(Buffer.isBuffer(buf));
// console.log(buf.toString());

const fs = require('fs');

fs.readFile("logo.png", function (err, origin_buffer) {
    console.log(Buffer.isBuffer(origin_buffer));
    fs.writeFile("logo_buffer.png", origin_buffer, function (err) {
        if(err)console.log(err)
    })
    let base64Image = origin_buffer.toString("base64");
    // console.log(base64Image);
    let decodedImage = new Buffer(base64Image, 'base64');
    console.log(origin_buffer.compare(decodedImage));
    console.log(Buffer.compare(origin_buffer, decodedImage));
    fs.writeFile("logo_decoded.png", decodedImage, function (err) {
        if(err)console.log(err)
    })
})
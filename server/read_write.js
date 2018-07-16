/* eslint-disable no-console */
const readable = require('stream').Readable;
const writable = require('stream').Writable;

const readStrean = new readable();
const writeStrean = new writable();

readStrean.push("i");
readStrean.push("mooc");
readStrean.push("hello !");
readStrean.push(null);

writeStrean._write = function (chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
}
readStrean.pipe(writeStrean);
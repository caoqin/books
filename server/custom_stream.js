/* eslint-disable no-console */
const stream = require('stream');
const util = require('util');

function ReadStream() {
    stream.Readable.call(this);
}
function WritStream() {
    stream.Writable.call(this);
}

function TransformStream() {
    stream.Transform.call(this)
}

util.inherits(ReadStream,stream.Readable);
util.inherits(WritStream,stream.Writable);
util.inherits(TransformStream,stream.Transform);

ReadStream.prototype._read = function () {
    this.push("i");
    this.push("mooc");
    this.push("hello !");
    this.push(null);
}

WritStream.prototype._write = function (chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
}

TransformStream.prototype._transform = function (chunk, encoding, callback) {
    this.push(chunk)
    callback();
}

TransformStream.prototype._flush = function (cb) {
    this.push("game _flush");
    cb();
}

const rs = new ReadStream();
const ws = new WritStream();
const ts = new TransformStream();

rs.pipe(ts).pipe(ws);
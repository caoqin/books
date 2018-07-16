const http = require('http')
const fs = require('fs')
const request = require('request')

http.createServer((req, res) => {

    //method 1
    // fs.readFile('11.jpg', (err, data) => {
    //     if (err) return res.end("file not existed");
    //     res.writeHead(200, {'Context-Type': 'text/html'})
    //     res.end(data);
    // })

    // method 2
    // fs.createReadStream('11.jpg').pipe(res);

    //method 3
    request("http://f.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f72df2ebef7e0e0cf3d6cad6aa.jpg").pipe(res);

}).listen(8090);
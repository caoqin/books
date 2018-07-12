var https = require("https");
var fs = require("fs");
var querystring = require("querystring");

var option = {
    key: fs.readFileSync('ssh_key.pem'),
    cert: fs.readFileSync('ssh_cert.pem')
}

const Servers = https.createServer(option, (req, res) => {
    res.writeHead(200);
    res.end("hello https");
})

Servers.listen(8090,()=>{
    console.log('Server running ...');
})
// Servers.listen(8090, '0.0.0.0', () => {
//     console.log('Server running ...');
// })
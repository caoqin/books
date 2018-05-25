const cheerio = require("cheerio");
const http = require('http');
const url = require('url');

const hostname = '0.0.0.0';
const port = 1618;
const userPath = "http://www.23us.so";

// 加载网页
function download(url, callback) {
    http.get(url, function (res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
    }).on("error", function () {
        callback(null);
    });
}

// 解析网页
function loadHtml(id, callback) {
    download(userPath + id, function (data) {
        if (data) {
            const dataJson = {
                ctrols: [],
                title: '',
                txt: ''
            }
            var $ = cheerio.load(data, {decodeEntities: false});
            dataJson.title = $("h1").text();
            $("#footlink").children().each(function (i, e) {
                dataJson.ctrols.push({
                    name: $(e).text(),
                    link: $(e).attr("href"),
                })
            });
            let html = $("#contents").html() || '';
            if (!html) {
                $("#at").find('a').each(function (i, e) {
                    html+=`<p class="title" onclick="window.map.httpData('${$(e).attr("href").replace("http://www.23us.so","")}')" >${$(e).text()}</p>`
                });
            }
            dataJson.txt = html;
            callback(dataJson);
        } else {
            console.log("error");
        }
    });
}

// 网络请求
const Servers = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    const id = url.parse(req.url, true).pathname;
    loadHtml(id, function (html) {
        res.end(JSON.stringify(html));
    });
});

Servers.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
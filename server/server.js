/* eslint-disable no-console */
const cheerio = require("cheerio");
const http = require('http');
const https = require('https');
const url = require('url');
const Promise = require('es6-promise');
const hostname = '0.0.0.0';
const port = 1618;
// const userPath = "http://www.23us.so";
const userPath = "https://www.23us.so";


// 加载网页promise版
function downloadAsyc(url) {
    return new Promise((resolve, reject) => {
        console.log("wait ....");
        http.get(url, function (res) {
            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                resolve(data);
            });
        }).on("error", function () {
            reject(null);
        });
    });
}

// 加载网页
function download(url, callback) {
    https.get(url, function (res) {
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
                    html += `<p class="title" onclick="window.map.httpData('${$(e).attr("href").replace(userPath, "")}')" >${$(e).text()}</p>`
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
    console.log("server:",id);
    loadHtml(id, function (html) {
        res.end(JSON.stringify(html));
    });
});

Servers.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
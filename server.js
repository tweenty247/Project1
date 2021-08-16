const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log('Request made');
    console.log(req.url.split('/')[2]);

    //set header content type
    res.setHeader('content-Type', 'text/html');
    let path = './views/';
    var myName = req.url.split('/')[2];

    switch (req.url) {
        case '/welcome':
            res.write(`
            <ul>
                <a href="/welcome">Home</a>
                <a href="/welcome/${ myName }">${ myName }</a>
            </ul>`)
            path += 'index.html';
            break;
        case `/welcome/${ myName }`:
            // path += 'name.html';
            res.write(`<h2> hey ${ myName }, thanks for calling a parameterized route in my api first application</h2>`)
            res.write(`
            <ul>
                <a href="/welcome">Home</a>
                <a href="/welcome/${ myName }">${ myName }</a>
            </ul>`)
            break;
        default:
            path += '404.html';
            break
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            // console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });

});

server.listen('8000', 'localhost', () => {
    console.log('Listening for requests on port 8000');
});
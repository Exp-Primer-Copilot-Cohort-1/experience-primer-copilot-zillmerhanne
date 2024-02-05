// Create web server


// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var path = url.parse(request.url).pathname;
    switch (path) {
        case '/':
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write('Hello World');
            response.end();
            break;
        case '/socket':
            fs.readFile(__dirname + path + '/index.html', function (error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write('opps this doesn\'t exist - 404');
                } else {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.write(data, 'utf8');
                }
                response.end();
            });
            break;
        default:
            response.writeHead(404);
            response.write('opps this doesn\'t exist - 404');
            response.end();
            break;
    }
});

// Listen on port 8000, IP defaults to
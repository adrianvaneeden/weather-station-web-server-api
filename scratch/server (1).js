const http = require('http');

const todos = [
    { id: 1, text: 'To do One' },
    { id: 2, text: 'To do Two' },
    { id: 3, text: 'To do Three' },
];

const server = http.createServer((req, res) => {
    const { method, url } = req;
    // const { headers, url, method } = req;
    // console.log(req);
    // console.log(headers, url, method);
    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('X-Powered-By', 'node.js');


    // console.log(req.headers);

    // console.log('----------------');

    let body = [];

    req
        .on('data', chunk => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();

            let status = 404;
            const response = {
                success: false,
                data: null,
                error: null
            };

            if (method === 'GET' && url === '/todos') {
                status = 200;
                response.success = true;
                response.data = todos;
            } else if (method === 'POST' && url === '/todos') {
                const { id, text } = JSON.parse(body);

                if (!id || !text) {
                    status = 400;
                    response.error = 'Please include \'id\' and \'text\'';
                } else {
                    todos.push({ id, text });
                    status = 201;
                    response.success = true;
                    response.data = todos;
                }
            }

            res.writeHead(status, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'node.js'
            });

            res.end(
                JSON.stringify(response)
            );
        });

    // res.write('<h1>Hello this is the header</h1>');
    // res.write('<h2>This is another heading</h2>');
    // res.end(JSON.stringify({
    //     success: true,
    //     data: todos
    // }));
});

const PORT = 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



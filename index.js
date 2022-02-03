const http = require('http')

const PORT = 4000;

const server = http.createServer()

const friends = [
    {
        id: '0',
        name: 'Will Smith'
    },
    {
        id: '1',
        name: 'Brad Pitt'
    },
    {
        id: '2',
        name: 'Jenifer Lopes'
    },
]

const sendHtml = (res) => {
    res.write('<html>')
    res.write('<body>')
    res.write('<ul>')
    res.write('<li>Hello guys how are you?</li>')
    res.write('<li>I am fine!</li>')
    res.write('<li>Cool!</li>')
    res.write('</ul>')
    res.write('</body>')
    res.write('</html>')
}

const makeJSON = (value) => JSON.stringify(value)

const isGetMethod = (req) => req.method === "GET";
const isPostMethod = (req) => req.method === "POST";

server.on('request', (req, res) => {
    const items = req.url.split('/')
    res.statusCode = 200;
    console.log(items)

    if (isPostMethod(req) && items[1] === 'friends') {
        req.on('data', (data) => {
            const friend = data.toString();
            console.log(friend);
            friends.push(JSON.parse(friend));
            console.log('done with req.on')
        })
        req.pipe(res);
    } else if (isGetMethod(req) && items[1] === 'messages') {
        res.setHeader( 'Content-Type', 'text/html')
        sendHtml(res)
        res.end();
    } else if (isGetMethod(req) && items[1] === 'friends') {
        if (items.length === 3) {
            res.end(makeJSON(friends[items[2]]));
        } else {
            res.end(makeJSON(friends));
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
})

server.listen(PORT, () => {
    console.log(`listening port ${PORT}`)
});
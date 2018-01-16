const http = require("http");
const url = require('url');
const server = http.createServer();

server.listen(3000, () => {
  console.log('The HTTP server is lestening at Port 3000.');
});


let messages = [
  { 'id': 1, 'user': 'norman pickeslworth', 'message': 'feed me' },
  { 'id': 2, 'user': 'maisie pickeslworth', 'message': 'norman is an idiot' },
  { 'id': 3, 'user': 'posey pickeslworth', 'message': 'corgis rock' }
];

server.on('request', (request, response) => {
  if (request.method === 'GET') {
    getAllMessages(response);
  }
  else if (request.method === 'POST') {
    let newMessage = { 'id': new Date() };
    request.on('data', (data) => {
      console.log(JSON.parse(data))
      newMessage = Object.assign(newMessage, JSON.parse(data));
      console.log(newMessage)
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

getAllMessages = (response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write(JSON.stringify(messages));
  response.end();
}

addMessage = (newMessage, response) => {
   response.writeHead(200, {'Content-Type': 'text/plain'});
   messages = [...messages, newMessage]
  response.write(JSON.stringify(newMessage));
  response.end();
}

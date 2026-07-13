const http = require('http'); 
const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url==='/balance'){
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end('{"account": "flin4ek", "money": 5000}')
  }
  else if (request.method === 'GET'){
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('hello bro')
  }
  else if(request.method === 'POST' && request.url==='/transfer'){
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Ошибка: нет данных для перевода')
  }
  else if(request.method === 'GET' && request.url==='/api'){
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end('{"message": "API работает"}')
  }
  else{
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not Found')
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
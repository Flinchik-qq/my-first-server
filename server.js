import 'dotenv/config';
import http from 'http';
import path from 'path';
import url from 'url';
const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url==='/balance'){
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end('{"account": "flin4ek", "money": 5000}')
  }
  else if (request.method === 'GET' && request.url==='/'){
    response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('hello denchick btw')
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
const { PORT = 8080 } = process.env;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, 'public', 'index.html');
console.log("Полный железобетонный путь:", htmlPath);
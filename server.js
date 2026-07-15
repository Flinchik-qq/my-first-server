import 'dotenv/config';
import http from 'http';
import path from 'path';
import url from 'url';
import fs from 'fs/promises';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlPath = path.join(__dirname, 'public', 'index.html');
const secretPath = path.join(__dirname, 'secret.txt');
const logPath = path.join(__dirname, 'history.txt');
const server = http.createServer(async (request, response) => {
  if (request.method === 'GET' && request.url==='/balance'){
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    response.end('{"account": "flin4ek", "money": 5000}')
  }
  else if (request.method === 'GET' && request.url === '/') {
    try {
      const htmlContent = await fs.readFile(htmlPath, 'utf-8');
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(htmlContent);
    } catch (error) {
      console.error(error);
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Internal Server Error: не удалось прочитать файл');
    }
  }
  else if(request.method === 'GET' && request.url === '/hack'){
    try{
      await fs.writeFile(secretPath,"Your data has been stolen")
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Операция выполнена')
    }
    catch (error){
      console.error(error)
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Ошибка записи')
    }
  }
  else if(request.method === 'GET' && request.url === '/log'){
    try{
      await fs.appendFile(logPath,"Кто-то зашел на сервер!\n")
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Лог записан')
    }
    catch (error){
      console.error(error)
      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      response.end('Ошибка записи')
    }
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
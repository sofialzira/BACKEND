import http from "http";
import dotenv from "dotenv"; 

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) =>  {
    res.writeHead(200, { 'Content-Type': 'application/json'});

    console.log(req.url)
    if (req.url === '/users') {
        res.end(JSON.stringify([{ name: 'John Doe' }, { name: 'Alex Doe' }]));
      }
    
      if (req.url === '/products') {
        res.end(JSON.stringify([{ name: 'iPhone 15' }, { name: 'Samsung Galaxy S21' }]));
      }

});


 server.listen(PORT, () => {
     console.log(`server in runnung on port ${PORT}`);
 });
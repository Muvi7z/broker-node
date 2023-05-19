const http = require('http');
const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log('Server request');
});

server.listen(PORT, 'localhost', (err) => {
  err ? console.log(err) : console.log(`listening port ${PORT}`);
});


const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

server.use(router)

let port = 3000;
server.listen(port, () => {
  console.log(`Mock Server is running, port(${port})`)
})

/*

fetch('http://localhost:3000/posts', {
  method: 'POST', // or 'PUT'
  body: JSON.stringify({
    title: "abc"
  }), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

*/
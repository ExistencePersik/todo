const fs = require('fs')

const dir = './src'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

const initialDb = './server/initialDb.json'
const db = dir + '/db.json'

if (
  !fs.existsSync(db) &&
  fs.existsSync(initialDb)
){
  fs.copyFileSync(initialDb, db)
}

if (fs.existsSync(db)){
  const jsonServer = require('json-server')
  const server = jsonServer.create()
  const router = jsonServer.router(db)
  const middlewares = jsonServer.defaults()
  const port = 5000

  server.use(middlewares)
  server.use(router)

  server.listen(port)
}

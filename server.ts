const express = require('express')
const cors = require('cors')
const fs = require('fs')
const fsPromises = require('fs/promises')
const reorder = require('./src/utils/reorder')

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
  const app = express()

  app.use(express.json())
  app.use(cors())

  app.post('/todos', async (req, res) => {

    const existTodos = await getTodosData()

    const todoData = {
      id: Date.now().toString(),
      ...req.body
    }

    if (todoData.title === null) {
      return res.status(401).json({error: true, message: 'The input field should not be empty'})
    }

    const findExist = existTodos.find((todo) => todo.id === todoData.id)
    if (findExist) {
      return res.status(409).json({error: true, message: 'Task with this id already exists'})
    }

    existTodos.push(todoData)

    await saveTodosData(existTodos)
    res.status(201).json(todoData)
  })

  app.post('/todos/update_order', async (req, res) => {
    const existTodos = await getTodosData()
    const {dragId, dropIndex} = req.body

    const result = reorder(existTodos, dragId, dropIndex)

    if (existTodos === result) {
      return res.status(409).json({error: true, message: 'The order has not changed'})
    }

    await saveTodosData(result)
    res.status(201).json({message: 'List has been reordered'})
  })

  app.get('/todos', async (req, res) => {
    const todos = await getTodosData()
    res.status(200).json(todos)
  })

  app.patch('/todos/:id', async (req, res) => {
    const { id } = req.params

    const todoData = {
      id: id,
      ...req.body
    }

    const existTodos = await getTodosData()
    const index = existTodos.findIndex((todo) => todo.id === id)

    if (index !== -1) {
      existTodos[index] = todoData
    } else {
      res.status(404).json({message: 'Error. ID does not exist'})
    }

    await saveTodosData(existTodos)
    res.status(204).json({message: 'Task has been updated'})
  })

  app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params

    const existTodos = await getTodosData()

    const findExist = existTodos.find((todo) => todo.id === id)
    if (!findExist) {
      return res.status(404).json({error: true, message: 'Task with this id already exists'})
    }

    const filterTodo = existTodos.filter((todo) => todo.id !== id )

    await saveTodosData(filterTodo)
    res.status(204).json({message: 'Task has been removed'})
  })

  const saveTodosData = async (data) => {
    const stringifyData = JSON.stringify(data)
    try {
      await fsPromises.writeFile(db, stringifyData)
    } catch (err) {
      console.log(err)
    }
  }

  const getTodosData = async () => {
    try {
      const jsonData = await fsPromises.readFile(db, { encoding: 'utf8' })
      console.log(jsonData)
      return JSON.parse(jsonData)
    } catch (err) {
      console.log(err)
    }
  }

  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`)
  })
}

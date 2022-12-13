const express = require('express')
const cors = require('cors')
const fs = require('fs')
const fsPromises = require('fs/promises')
const reorder = require('./src/utils/reorder')

const initialDb = './initialDb.json'
const db = './db.json'

if (
  !fs.existsSync(db) &&
  fs.existsSync(initialDb)
){
  fs.copyFileSync(initialDb, db)
}

const app = express()

app.use(express.json())
app.use(cors())

app.post('/todos', async (req, res) => {

  const existingTodos = await getTodosData()

  const todoData = {
    id: Date.now().toString(),
    ...req.body
  }

  if (todoData.title && todoData.title.length === 0) {
    return res.status(401).json({error: true, message: 'The added todo should not be empty'})
  }

  const findExist = existingTodos.find((todo) => todo.id === todoData.id)
  if (findExist) {
    return res.status(409).json({error: true, message: 'Task with this id already exists'})
  }

  existingTodos.push(todoData)

  try {
    await saveTodosData(existingTodos)
  } catch (err) {
    res.status(500).json({error: true, message: err.message})
  }
  res.status(201).json(todoData)
})

app.post('/todos/update_order', async (req, res) => {
  const existingTodos = await getTodosData()
  const {dragId, dropIndex} = req.body

  const result = reorder(existingTodos, dragId, dropIndex)

  if (existingTodos === result) {
    return res.status(409).json({error: true, message: 'The order has not changed'})
  }

  try {
    await saveTodosData(result)
  } catch (err) {
    res.status(500).json({error: true, message: err.message})
  }
  res.status(201).json({message: 'List has been reordered'})
})

app.get('/todos', async (req, res) => {
  try {
    const todos = await getTodosData()
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json({error: true, message: err.message})
  }
})

app.patch('/todos/:id', async (req, res) => {
  const { id } = req.params

  const todoData = {
    id: id,
    ...req.body
  }

  const existingTodos = await getTodosData()
  const index = existingTodos.findIndex((todo) => todo.id === id)

  if (index !== -1) {
    existingTodos[index] = todoData
  } else {
    res.status(404).json({message: 'Error. ID does not exist'})
  }

  try {
    await saveTodosData(existingTodos)
  } catch (err) {
    res.status(500).json({error: true, message: err.message})
  }
  res.status(204).json({message: 'Task has been updated'})
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params

  const existingTodos = await getTodosData()

  const findExist = existingTodos.find((todo) => todo.id === id)
  if (!findExist) {
    return res.status(404).json({error: true, message: 'Task with this id already exists'})
  }

  const filterTodo = existingTodos.filter((todo) => todo.id !== id )

  try {
    await saveTodosData(filterTodo)
  } catch (err) {
    res.status(500).json({error: true, message: err.message})
  }
  res.status(204).json({message: 'Task has been removed'})
})

const saveTodosData = async (data) => {
  const stringifyData = JSON.stringify(data)
  try {
		await fsPromises.writeFile(db, stringifyData)
  } catch (err) {
    console.error('Internal Server Error')
  }
}

const getTodosData = async () => {
  try {
    const jsonData = await fsPromises.readFile(db, { encoding: 'utf8' })
    console.log(jsonData)
    return JSON.parse(jsonData)
  } catch (err) {
    console.error('Internal Server Error')
  }
}

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server runs on port ${PORT}`)
})

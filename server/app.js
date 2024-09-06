const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require ('./Model/todoModel')

const app = express()

app
    .use(cors())
    .use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/test')

app.post('/add', (req, res) => {
    const task = req.body.task
    TodoModel.create({ 
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

}) 

app.get('/get', (req, res) => {
    TodoModel.find()
            .then(result => res.json(result))
            .catch(err => res.json(err)) 
})

app.put('/update/:id', async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        const todoUpdated = await TodoModel.findByIdAndUpdate(
            req.params.id,
            {done: !todo.done},
            {new : true}
        )
        res.json(todoUpdated)
    }catch(err){
        console.error(err)
    }
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    TodoModel.findByIdAndDelete(id)
            .then(result => res.json(result))
            .catch(err => console.log(err))
})
app.listen(3001, () => console.log('server running'))

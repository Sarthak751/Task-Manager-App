const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();
const Task = require('./models/tasks');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/tasks', async(req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks/new', async(req,res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
})

app.delete('/tasks/delete/:id', async(req,res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.json(task);
})

app.put('/tasks/complete/:id', async(req,res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
})

const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to the database!");
    app.listen(port, console.log(`Server is listening on port ${port}...`));
    })
    .catch((error) => console.log(error));

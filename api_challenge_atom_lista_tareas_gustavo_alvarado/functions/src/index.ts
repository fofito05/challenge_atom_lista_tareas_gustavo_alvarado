import * as functions from 'firebase-functions';
import express from 'express';
import { addUser, deleteUser, updateUser, getAllUsers, findUser } from "./controller/userscontroller";
import { getAllTasks, addTask, deleteTask, updateTask, getAllTasksUser } from "./controller/taskscontroller";

const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Hey there!')
}
);


//router users
app.post('/users', addUser);

app.get("/users", getAllUsers);

app.patch("/users/:userId", updateUser);

app.delete("/users/:userId", deleteUser);

app.get("/users/:userId", findUser);

//router tareas
app.get("/tasks", getAllTasks);

app.post('/tasks', addTask);

app.delete("/tasks/:taskId", deleteTask);

app.put("/tasks/:taskId", updateTask);

app.get("/tasks/:usuario_tarea", getAllTasksUser);

exports.app = functions.https.onRequest(app);

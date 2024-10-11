"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = __importStar(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const userscontroller_1 = require("./controller/userscontroller");
const taskscontroller_1 = require("./controller/taskscontroller");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.get('/', (req, res) => {
    res.status(200).send('Hey there!');
});
//router users
app.post('/users', userscontroller_1.addUser);
app.get("/users", userscontroller_1.getAllUsers);
app.patch("/users/:userId", userscontroller_1.updateUser);
app.delete("/users/:userId", userscontroller_1.deleteUser);
app.get("/users/:userId", userscontroller_1.findUser);
//router tareas
app.get("/tasks", taskscontroller_1.getAllTasks);
app.post('/tasks', taskscontroller_1.addTask);
app.delete("/tasks/:taskId", taskscontroller_1.deleteTask);
app.put("/tasks/:taskId", taskscontroller_1.updateTask);
app.get("/tasks/:usuario_tarea", taskscontroller_1.getAllTasksUser);
exports.app = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map
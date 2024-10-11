"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTasksUser = exports.updateTask = exports.deleteTask = exports.addTask = exports.getAllTasks = void 0;
const firebase_1 = require("../config/firebase");
const firestore_1 = require("firebase-admin/firestore");
const addTask = async (req, res) => {
    const { titulo_tarea, descripcion_tarea, estado_completado_tarea, usuario_tarea } = req.body;
    try {
        const fecha = new Date();
        const fecha_creacion_tarea = firestore_1.Timestamp.fromDate(new Date(fecha));
        console.log(fecha_creacion_tarea);
        const task = firebase_1.db.collection('tareas').doc();
        const taskObject = {
            id: task.id,
            titulo_tarea,
            descripcion_tarea,
            fecha_creacion_tarea,
            estado_completado_tarea,
            usuario_tarea
        };
        console.log(taskObject);
        await task.set(taskObject);
        res.status(200).send({
            status: 'Correcto',
            message: "Tarea creado satisfactoriamente.",
            data: taskObject
        });
    }
    catch (error) {
        res.status(500).json("Error al crear tarea");
    }
};
exports.addTask = addTask;
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = firebase_1.db.collection('tareas').doc(taskId);
        await task.delete();
        res.status(200).send({
            status: "Correcto",
            message: "Tarea elminada satisfactoriamente."
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.deleteTask = deleteTask;
const updateTask = async (req, res) => {
    const { body: { id, titulo_tarea, descripcion_tarea, estado_completado_tarea, fecha_creacion_tarea, usuario_tarea }, params: { taskId } } = req;
    try {
        console.log(taskId);
        console.log("este es el estado " + estado_completado_tarea);
        const task = firebase_1.db.collection("tareas").doc(taskId);
        const currentData = (await task.get()).data() || {};
        console.log(currentData);
        const taskObject = {
            titulo_tarea: titulo_tarea || currentData.titulo_tarea,
            descripcion_tarea: descripcion_tarea || currentData.descripcion_tarea,
            estado_completado_tarea: estado_completado_tarea,
            fecha_creacion_tarea: fecha_creacion_tarea || currentData.fecha_creacion_tarea,
            usuario_tarea: usuario_tarea || currentData.usuario_tarea,
            id: id || currentData.id
        };
        console.log(taskObject);
        await task.set(taskObject);
        res.status(200).send({
            status: "Correcto",
            message: "Tarea actualizada satisfactoriamente.",
            data: taskObject,
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateTask = updateTask;
const getAllTasks = async (req, res) => {
    try {
        const allTasks = [];
        const tasksT = [];
        const querySnapshot = await firebase_1.db.collection("tareas").get();
        querySnapshot.forEach((doc) => allTasks.push(doc.data()));
        allTasks.forEach((task) => {
            const fireBaseTime = new Date(task.fecha_creacion_tarea.seconds * 1000 + task.fecha_creacion_tarea.nanoseconds / 1000000);
            const date = fireBaseTime.toISOString();
            console.log(date);
            const titulo_tarea_temp = task.titulo_tarea;
            const descripcion_tarea_temp = task.descripcion_tarea;
            const estado_completado_tarea_temp = task.estado_completado_tarea;
            const usuario_tarea_temp = task.usuario_tarea;
            const id_temp = task.id;
            const newTask = {
                titulo_tarea: titulo_tarea_temp,
                descripcion_tarea: descripcion_tarea_temp,
                estado_completado_tarea: estado_completado_tarea_temp,
                fecha_creacion_tarea: date,
                usuario_tarea: usuario_tarea_temp,
                id: id_temp
            };
            tasksT.push(newTask);
        });
        res.status(200).send(tasksT);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllTasks = getAllTasks;
const getAllTasksUser = async (req, res) => {
    const { usuario_tarea } = req.params;
    try {
        const allTasks = [];
        const tasksT = [];
        const querySnapshot = firebase_1.db.collection("tareas");
        const currentData = await querySnapshot.where('usuario_tarea', '==', usuario_tarea).orderBy("fecha_creacion_tarea", "desc").get();
        if (!currentData.empty) {
            currentData.forEach((doc) => allTasks.push(doc.data()));
            //allTasks.sort()
            allTasks.forEach((task) => {
                const fireBaseTime = new Date(task.fecha_creacion_tarea.seconds * 1000 + task.fecha_creacion_tarea.nanoseconds / 1000000);
                //const date = fireBaseTime.toISOString();
                const date = fireBaseTime.toISOString();
                //console.log(date);
                const titulo_tarea_temp = task.titulo_tarea;
                const descripcion_tarea_temp = task.descripcion_tarea;
                const estado_completado_tarea_temp = task.estado_completado_tarea;
                const usuario_tarea_temp = task.usuario_tarea;
                const id_temp = task.id;
                const newTask = {
                    titulo_tarea: titulo_tarea_temp,
                    descripcion_tarea: descripcion_tarea_temp,
                    estado_completado_tarea: estado_completado_tarea_temp,
                    fecha_creacion_tarea: date,
                    usuario_tarea: usuario_tarea_temp,
                    id: id_temp
                };
                tasksT.push(newTask);
            });
            res.status(200).send({
                status: "Correcto",
                message: "Se encontraron tareas para el usuario.",
                id: "1",
                data: tasksT
            });
        }
        else {
            res.status(200).send({
                status: "Error",
                message: "No se encontraron tareas para el usuario.",
                id: "2"
            });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.getAllTasksUser = getAllTasksUser;
//# sourceMappingURL=taskscontroller.js.map